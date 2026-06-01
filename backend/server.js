const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function verifyToken(req, res, next) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token found",
    });
  }

  const token =
    authHeader.split(" ")[1];

  jwt.verify(
    token,
      process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      }

      req.user = decoded;
      next();
    }
  );
}

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error");
  } else {
    console.log("MySQL Connected");
  }
});

app.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role_id
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users
      (
        name,
        email,
        password,
        phone,
        role_id,
        status_id
      )
      VALUES (?, ?, ?, ?, ?, 1)
    `;

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        phone || "",
        role_id
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message
          });
        }

        const userId = result.insertId;

        if (role_id === 3) {
          db.query(
            "INSERT INTO customers(user_id) VALUES(?)",
            [userId]
          );
        }

        res.json({
          success: true,
          message: "Registration Successful"
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});



app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email not found",
      });
    }

    const user = result[0];

    let passwordMatched = false;

    if (
      user.password.startsWith("$2a$") ||
      user.password.startsWith("$2b$") ||
      user.password.startsWith("$2y$")
    ) {
      passwordMatched = await bcrypt.compare(
        password,
        user.password
      );
    } else {
      passwordMatched =
        password === user.password;

      if (passwordMatched) {
        const newHash =
          await bcrypt.hash(
            password,
            10
          );

        db.query(
          "UPDATE users SET password=? WHERE id=?",
          [newHash, user.id]
        );
      }
    }

    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    if (
      (role === "customer" &&
        user.role_id !== 3) ||
      (role === "seller" &&
        user.role_id !== 2)
    ) {
      return res.status(403).json({
        success: false,
        message: "Wrong role selected",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    if (user.role_id === 3) {
      db.query(
        `
        SELECT id
        FROM customers
        WHERE user_id = ?
        `,
        [user.id],
        (err2, customerResult) => {
          if (err2) {
            return res.status(500).json({
              success: false,
              error: err2.message,
            });
          }

          res.json({
            success: true,
            token,
            user: {
              id: user.id,
              customer_id:
                customerResult[0]?.id ||
                null,
              name: user.name,
              email: user.email,
              role_id:
                user.role_id,
            },
          });
        }
      );
    } else if (
      user.role_id === 2
    ) {
      db.query(
        `
        SELECT id
        FROM sellers
        WHERE user_id = ?
        `,
        [user.id],
        (err2, sellerResult) => {
          if (err2) {
            return res.status(500).json({
              success: false,
              error: err2.message,
            });
          }

          res.json({
            success: true,
            token,
            user: {
              id: user.id,
              seller_id:
                sellerResult[0]?.id ||
                null,
              name: user.name,
              email: user.email,
              role_id:
                user.role_id,
            },
          });
        }
      );
    } else {
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role_id:
            user.role_id,
        },
      });
    }
  });
});



app.get("/sellerdetail/:sellerId", (req, res) => {
  const sellerId = req.params.sellerId;

  const sellerSql = `
    SELECT
      s.*,
      u.name,
      u.email,
      u.phone
    FROM sellers s
    JOIN users u
      ON s.user_id = u.id
    WHERE s.id = ?
  `;

  const reviewSql = `
    SELECT
      r.*,
      p.name AS product_name
    FROM reviews r
    JOIN products p
      ON r.product_id = p.id
    WHERE p.seller_id = ?
  `;

  const ordersSql = `
    SELECT *
    FROM order_items
    WHERE seller_id = ?
  `;

  const totalOrderSql = `
    SELECT COUNT(*) AS total
    FROM order_items
    WHERE seller_id = ?
  `;

  const productsSql = `
    SELECT
      p.*,
      COALESCE(i.stock,0) AS stock,
      COALESCE(i.reserved_stock,0) AS reserved_stock,
      i.warehouse_location,
      i.updated_at
    FROM products p
    LEFT JOIN inventory i
      ON p.id = i.product_id
    WHERE p.seller_id = ?
  `;

  const revenueSql = `
    SELECT
      COALESCE(SUM(subtotal),0) AS total
    FROM order_items
    WHERE seller_id = ?
  `;

const topProductsSql = `
SELECT
  p.id,
  p.name,
  p.price,
  MAX(COALESCE(i.stock,0)) AS stock,
  COUNT(oi.id) AS sales
FROM products p
LEFT JOIN inventory i
ON p.id = i.product_id
LEFT JOIN order_items oi
ON p.id = oi.product_id
WHERE p.seller_id = ?
GROUP BY
  p.id,
  p.name,
  p.price
ORDER BY sales DESC
LIMIT 3
`;

  db.query(
    sellerSql,
    [sellerId],
    (err, sellerResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Seller query failed",
          error: err.message,
        });
      }

      db.query(
        reviewSql,
        [sellerId],
        (err, productReview) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Review query failed",
              error: err.message,
            });
          }

          db.query(
            ordersSql,
            [sellerId],
            (err, orders) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: "Orders query failed",
                  error: err.message,
                });
              }

              db.query(
                totalOrderSql,
                [sellerId],
                (err, totalorder) => {
                  if (err) {
                    return res.status(500).json({
                      success: false,
                      message:
                        "Total order query failed",
                      error: err.message,
                    });
                  }

                  db.query(
                    productsSql,
                    [sellerId],
                    (err, products) => {
                      if (err) {
                        return res.status(500).json({
                          success: false,
                          message:
                            "Products query failed",
                          error: err.message,
                        });
                      }

                      db.query(
                        revenueSql,
                        [sellerId],
                        (err, revenue) => {
                          if (err) {
                            return res.status(500).json({
                              success: false,
                              message:
                                "Revenue query failed",
                              error:
                                err.message,
                            });
                          }

                          db.query(
                            topProductsSql,
                            [sellerId],
                            (
                              err,
                              topProducts
                            ) => {
                              if (err) {
                                return res.status(
                                  500
                                ).json({
                                  success:
                                    false,
                                  message:
                                    "Top products query failed",
                                  error:
                                    err.message,
                                });
                              }

                              res.json({
                                success: true,
                                seller:
                                  sellerResult[0],
                                productReview,
                                products,
                                orders,
                                totalorder:
                                  totalorder[0]
                                    .total,
                                revenue:
                                  revenue[0]
                                    .total,
                                topProducts,
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

app.get(
  "/salesperday/:sellerId",
  (req, res) => {
    const sellerId =
      req.params.sellerId;

    const sql = `
      SELECT
        DATE(o.created_at) AS day,
        COALESCE(
          SUM(oi.subtotal),
          0
        ) AS revenue
      FROM orders o
      JOIN order_items oi
        ON o.id = oi.order_id
      WHERE oi.seller_id = ?
      AND o.created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY DATE(o.created_at)
      ORDER BY day ASC
    `;

    db.query(
      sql,
      [sellerId],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json(err);
        }

        const last7Days = [];

        for (
          let i = 6;
          i >= 0;
          i--
        ) {
          const date =
            new Date();

          date.setDate(
            date.getDate() - i
          );

          const formatted =
            date
              .toISOString()
              .split("T")[0];

          const found =
            result.find(
              (item) =>
                new Date(
                  item.day
                )
                  .toISOString()
                  .split(
                    "T"
                  )[0] ===
                formatted
            );

          last7Days.push({
            day: formatted,
            revenue: found
              ? Number(
                  found.revenue
                )
              : 0,
          });
        }

        res.json({
          success: true,
          salesdata:
            last7Days,
        });
      }
    );
  }
);


app.get("/orderperday/:sellerId", (req, res) => {
  const sellerId = req.params.sellerId;

  const sql = `
    SELECT
      DATE(o.created_at) AS day,
      COUNT(DISTINCT o.id) AS total_orders
    FROM orders o
    JOIN order_items oi
      ON o.id = oi.order_id
    WHERE oi.seller_id = ?
      AND o.created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(o.created_at)
    ORDER BY day ASC
  `;

  db.query(sql, [sellerId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const formatted =
        date.toISOString().split("T")[0];

      const found = result.find(
        (item) =>
          new Date(item.day)
            .toISOString()
            .split("T")[0] === formatted
      );

      last7Days.push({
        day: formatted,
        total_orders: found
          ? found.total_orders
          : 0,
      });
    }

    res.json({
      success: true,
      orderdata: last7Days,
    });
  });
});




app.get("/seller/orders/:sellerId", (req, res) => {
  const sellerId = req.params.sellerId;

  const sql = `
    SELECT
      oi.id,
      oi.order_id,
      o.order_number,
      o.total_amount,
      o.order_status_id,
      o.created_at,
      oi.quantity,
      oi.subtotal,
      p.name AS product_name,
      u.name AS customer_name
    FROM order_items oi
    JOIN orders o
      ON oi.order_id = o.id
    JOIN customers c
      ON o.customer_id = c.id
    JOIN users u
      ON c.user_id = u.id
    JOIN products p
      ON oi.product_id = p.id
    WHERE oi.seller_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(sql, [sellerId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.status(200).json({
      success: true,
      orders: result,
    });
  });
});

app.put("/seller/order/status/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { order_status_id } = req.body;

  const sql = `
    UPDATE orders
    SET order_status_id = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [order_status_id, orderId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "Order status updated",
      });
    }
  );
});


app.post(
  "/addproduct",
  upload.single("file"),
  (req, res) => {
    const {
      seller_id,
      category_id,
      name,
      description,
      price,
      stock,
    } = req.body;

    const slug =
      name
        .toLowerCase()
        .replace(/\s+/g, "-") +
      "-" +
      Date.now();

    const productSql = `
      INSERT INTO products
      (
        seller_id,
        category_id,
        name,
        slug,
        description,
        price,
        status
      )
      VALUES
      (?, ?, ?, ?, ?, ?, 'active')
    `;

    db.query(
      productSql,
      [
        seller_id,
        category_id,
        name,
        slug,
        description,
        price,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json(err);
        }

        const productId =
          result.insertId;

        const inventorySql = `
          INSERT INTO inventory
          (
            product_id,
            stock
          )
          VALUES (?,?)
        `;

        db.query(
          inventorySql,
          [productId, stock],
          (err2) => {
            if (err2) {
              console.log(err2);
              return res
                .status(500)
                .json(err2);
            }

            if (!req.file) {
              return res.json({
                success: true,
                message:
                  "Product added without image",
              });
            }

            const imageSql = `
              INSERT INTO product_images
              (
                product_id,
                image_data,
                image_type
              )
              VALUES
              (?, ?, ?)
            `;

            db.query(
              imageSql,
              [
                productId,
                req.file.buffer,
                req.file.mimetype,
              ],
              (err3) => {
                if (err3) {
                  console.log(err3);
                  return res
                    .status(500)
                    .json(err3);
                }

                res.json({
                  success: true,
                  message:
                    "Product added successfully",
                });
              }
            );
          }
        );
      }
    );
  }
);

app.put("/updateproduct/:id", upload.single('file'), (req, res) => {
  const productId = req.params.id;

  const {
    name,
    description,
    price,
    stock,
    category_id,
  } = req.body;

  
  if (req.file) {
    const imageData = req.file.buffer.toString('base64');
    
    db.query(
      `
      UPDATE products
      SET
        name=?,
        description=?,
        price=?,
        category_id=?,
        thumbnail=?
      WHERE id=?
      `,
      [
        name,
        description,
        price,
        category_id,
        imageData,
        productId,
      ],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        db.query(
          `
          UPDATE inventory
          SET stock=?
          WHERE product_id=?
          `,
          [stock, productId],
          (err2) => {
            if (err2) {
              return res.status(500).json(err2);
            }

            res.json({
              success: true,
            });
          }
        );
      }
    );
  } else {
    
    db.query(
      `
      UPDATE products
      SET
        name=?,
        description=?,
        price=?,
        category_id=?
      WHERE id=?
      `,
      [
        name,
        description,
        price,
        category_id,
        productId,
      ],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        db.query(
          `
          UPDATE inventory
          SET stock=?
          WHERE product_id=?
          `,
          [stock, productId],
          (err2) => {
            if (err2) {
              return res.status(500).json(err2);
            }

            res.json({
              success: true,
            });
          }
        );
      }
    );
  }
});

app.delete(
  "/deleteproduct/:id",
  (req, res) => {
    const productId =
      req.params.id;

    db.query(
      "DELETE FROM cart_items WHERE product_id=?",
      [productId],
      (err) => {
        if (err)
          return res
            .status(500)
            .json(err);

        db.query(
          "DELETE FROM wishlist_items WHERE product_id=?",
          [productId],
          (err2) => {
            if (err2)
              return res
                .status(500)
                .json(err2);

            db.query(
              "DELETE FROM reviews WHERE product_id=?",
              [productId],
              (err3) => {
                if (err3)
                  return res
                    .status(500)
                    .json(err3);

                db.query(
                  "DELETE FROM order_items WHERE product_id=?",
                  [productId],
                  (err4) => {
                    if (err4)
                      return res
                        .status(500)
                        .json(err4);

                    db.query(
                      "DELETE FROM product_images WHERE product_id=?",
                      [productId],
                      (err5) => {
                        if (err5)
                          return res
                            .status(500)
                            .json(err5);

                        db.query(
                          "DELETE FROM inventory WHERE product_id=?",
                          [productId],
                          (
                            err6
                          ) => {
                            if (
                              err6
                            )
                              return res
                                .status(
                                  500
                                )
                                .json(
                                  err6
                                );

                            db.query(
                              "DELETE FROM products WHERE id=?",
                              [
                                productId,
                              ],
                              (
                                err7
                              ) => {
                                if (
                                  err7
                                )
                                  return res
                                    .status(
                                      500
                                    )
                                    .json(
                                      err7
                                    );

                                res.json(
                                  {
                                    success:
                                      true,
                                    message:
                                      "Product deleted successfully",
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);
app.get("/customer/orders/:customerId", (req, res) => {
  const customerId = req.params.customerId;

  const sql = `
    SELECT
      o.id,
      o.order_number,
      o.total_amount,
      o.order_status_id,
      o.created_at,

      oi.quantity,
      oi.price,
      oi.subtotal,

      p.name AS product_name,

      a.address_line_1,
      a.address_line_2,
      a.landmark

    FROM orders o

    JOIN order_items oi
      ON o.id = oi.order_id

    JOIN products p
      ON oi.product_id = p.id

    JOIN addresses a
      ON o.address_id = a.id

    WHERE o.customer_id = ?

    ORDER BY o.created_at DESC
  `;

  db.query(
    sql,
    [customerId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.json({
        success: true,
        orders: result,
      });
    }
  );
});



app.get("/products", (req, res) => {
  const sql1 = `
    SELECT *
    FROM categories
  `;

  const sql2 = `
    SELECT
      p.*,
      COALESCE(i.stock,0) AS stock,
      COALESCE(AVG(r.rating),0) AS rating,
      c.name AS category_name
    FROM products p
    LEFT JOIN inventory i
      ON p.id = i.product_id
    LEFT JOIN reviews r
      ON p.id = r.product_id
    LEFT JOIN categories c
      ON p.category_id = c.id
    GROUP BY p.id
  `;

  db.query(sql1, (err, categories) => {
    if (err) {
      return res.status(500).json(err);
    }

    db.query(sql2, (err, products) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        categories,
        products,
      });
    });
  });
});

app.get("/product-image/:id", (req, res) => {
  const sql = `
    SELECT image_data,image_type
    FROM product_images
    WHERE product_id=?
    LIMIT 1
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).send("Image not found");
    }

    res.set(
      "Content-Type",
      result[0].image_type
    );

    res.send(result[0].image_data);
  });
});

app.get("/homepage", (req, res) => {
  const categoriesSql = `
    SELECT *
    FROM categories
    WHERE status = 'active'
  `;

  const featuredSql = `
    SELECT
      p.id,
      p.name,
      p.slug,
      p.description,
      p.price,
      p.discount_price,
      p.status,
      MAX(COALESCE(i.stock,0)) AS stock,
      COALESCE(AVG(r.rating),0) AS rating
    FROM products p
    LEFT JOIN inventory i
      ON p.id = i.product_id
    LEFT JOIN reviews r
      ON p.id = r.product_id
    GROUP BY
      p.id,
      p.name,
      p.slug,
      p.description,
      p.price,
      p.discount_price,
      p.status
    ORDER BY rating DESC
    LIMIT 8
  `;

  const trendingSql = `
    SELECT
      p.id,
      p.name,
      p.slug,
      p.description,
      p.price,
      p.discount_price,
      p.status,
      MAX(COALESCE(i.stock,0)) AS stock,
      COUNT(oi.id) AS sales
    FROM products p
    LEFT JOIN inventory i
      ON p.id = i.product_id
    LEFT JOIN order_items oi
      ON p.id = oi.product_id
    GROUP BY
      p.id,
      p.name,
      p.slug,
      p.description,
      p.price,
      p.discount_price,
      p.status
    ORDER BY sales DESC
    LIMIT 8
  `;

  db.query(
    categoriesSql,
    (err, categories) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({
            success: false,
            message:
              "Categories query failed",
          });
      }

      const categoriesWithImages =
        categories.map((cat) => ({
          ...cat,
          image: cat.image
            ? `http://localhost:3000/uploads/${cat.image}`
            : null,
        }));

      db.query(
        featuredSql,
        (err, featured) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({
                success: false,
                message:
                  "Featured products query failed",
              });
          }

          db.query(
            trendingSql,
            (err, trending) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .json({
                    success: false,
                    message:
                      "Trending products query failed",
                  });
              }

              res.json({
                success: true,
                categories:
                  categoriesWithImages,
                featured,
                trending,
              });
            }
          );
        }
      );
    }
  );
});


app.get("/cart/:customerId", (req, res) => {
  const customerId = req.params.customerId;

  const sql = `
  SELECT
ci.id,
ci.product_id,
ci.quantity,
p.name,
p.price,
(ci.quantity * p.price) AS subtotal
FROM cart_items ci
JOIN products p
ON ci.product_id = p.id
  `;

  db.query(sql, [customerId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      cart: result,
    });
  });
});


app.post("/placeorder", (req, res) => {
  const {
    customer_id,
    address,
  } = req.body;

  const addressSql = `
    INSERT INTO addresses
    (
      user_id,
      full_name,
      phone,
      country_id,
      province_id,
      city_id,
      postal_code,
      address_line_1,
      address_line_2,
      landmark,
      address_type
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    `
    SELECT u.id AS user_id
    FROM customers c
    JOIN users u
      ON c.user_id = u.id
    WHERE c.id = ?
    `,
    [customer_id],
    (err, userResult) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (userResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      const userId =
        userResult[0].user_id;

      db.query(
        addressSql,
        [
          userId,
          address.full_name,
          address.phone,
          1,
          1,
          1,
          address.postal_code,
          address.address_line_1,
          address.address_line_2,
          address.landmark,
          "home",
        ],
        (err2, addressResult) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          const addressId =
            addressResult.insertId;

          const cartSql = `
            SELECT
              ci.quantity,
              p.id AS product_id,
              p.price,
              p.seller_id
            FROM carts c
            JOIN cart_items ci
              ON c.id = ci.cart_id
            JOIN products p
              ON ci.product_id = p.id
            WHERE c.customer_id = ?
          `;

          db.query(
            cartSql,
            [customer_id],
            (err3, cartItems) => {
              if (err3) {
                return res.status(500).json(err3);
              }

              if (
                cartItems.length === 0
              ) {
                return res.status(400).json({
                  success: false,
                  message:
                    "Cart is empty",
                });
              }

              let subtotal = 0;

              cartItems.forEach(
                (item) => {
                  subtotal +=
                    item.price *
                    item.quantity;
                }
              );

              const orderNumber =
                "ORD-" +
                Date.now();

              const orderSql = `
                INSERT INTO orders
                (
                  customer_id,
                  address_id,
                  order_number,
                  subtotal,
                  shipping_fee,
                  tax,
                  discount,
                  total_amount,
                  payment_method_id,
                  payment_status_id,
                  order_status_id
                )
                VALUES
                (?, ?, ?, ?, 0, 0, 0, ?, 1, 1, 1)
              `;

              db.query(
                orderSql,
                [
                  customer_id,
                  addressId,
                  orderNumber,
                  subtotal,
                  subtotal,
                ],
                (
                  err4,
                  orderResult
                ) => {
                  if (err4) {
                    return res
                      .status(500)
                      .json(err4);
                  }

                  const orderId =
                    orderResult.insertId;

                  const values =
                    cartItems.map(
                      (item) => [
                        orderId,
                        item.product_id,
                        item.seller_id,
                        item.quantity,
                        item.price,
                        item.price *
                          item.quantity,
                      ]
                    );

                  db.query(
                    `
                    INSERT INTO order_items
                    (
                      order_id,
                      product_id,
                      seller_id,
                      quantity,
                      price,
                      subtotal
                    )
                    VALUES ?
                    `,
                    [values],
                    (err5) => {
                      if (err5) {
                        return res
                          .status(500)
                          .json(err5);
                      }

                      cartItems.forEach(
                        (item) => {
                          db.query(
                            `
                            UPDATE inventory
                            SET stock =
                              stock - ?
                            WHERE product_id = ?
                            `,
                            [
                              item.quantity,
                              item.product_id,
                            ]
                          );
                        }
                      );

                      db.query(
                        `
                        DELETE ci
                        FROM cart_items ci
                        JOIN carts c
                          ON ci.cart_id = c.id
                        WHERE c.customer_id = ?
                        `,
                        [customer_id],
                        () => {
                          res.json({
                            success: true,
                            order_id:
                              orderId,
                            order_number:
                              orderNumber,
                            message:
                              "Order placed successfully",
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});



app.post("/cart/add", (req, res) => {
  const {
    customer_id,
    product_id,
    quantity,
  } = req.body;

  db.query(
    "SELECT id FROM carts WHERE customer_id=?",
    [customer_id],
    (err, cart) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (cart.length === 0) {
        db.query(
          "INSERT INTO carts(customer_id) VALUES(?)",
          [customer_id],
          (err2, cartResult) => {
            if (err2) {
              return res.status(500).json(err2);
            }

            addItem(cartResult.insertId);
          }
        );
      } else {
        addItem(cart[0].id);
      }

      function addItem(cartId) {
        db.query(
          `
          SELECT *
          FROM cart_items
          WHERE cart_id = ?
          AND product_id = ?
          `,
          [cartId, product_id],
          (err3, item) => {
            if (err3) {
              return res.status(500).json(err3);
            }

            if (item.length > 0) {
              db.query(
                `
                UPDATE cart_items
                SET quantity = quantity + ?
                WHERE id = ?
                `,
                [quantity, item[0].id],
                (err4) => {
                  if (err4) {
                    return res.status(500).json(err4);
                  }

                  res.json({
                    success: true,
                    message: "Cart Updated",
                  });
                }
              );
            } else {
              db.query(
                `
                INSERT INTO cart_items
                (
                  cart_id,
                  product_id,
                  quantity
                )
                VALUES (?, ?, ?)
                `,
                [
                  cartId,
                  product_id,
                  quantity,
                ],
                (err5) => {
                  if (err5) {
                    return res.status(500).json(err5);
                  }

                  res.json({
                    success: true,
                    message: "Added To Cart",
                  });
                }
              );
            }
          }
        );
      }
    }
  );
});

app.put("/cart/increase/:id", (req, res) => {
  db.query(
    `
    UPDATE cart_items
    SET quantity = quantity + 1
    WHERE id=?
    `,
    [req.params.id],
    () => {
      res.json({
        success: true,
      });
    }
  );
});

app.put("/cart/decrease/:id", (req, res) => {
  db.query(
    `
    UPDATE cart_items
    SET quantity =
    CASE
      WHEN quantity > 1
      THEN quantity - 1
      ELSE 1
    END
    WHERE id=?
    `,
    [req.params.id],
    () => {
      res.json({
        success: true,
      });
    }
  );
});

app.delete("/cart/remove/:id", (req, res) => {
  db.query(
    "DELETE FROM cart_items WHERE id=?",
    [req.params.id],
    () => {
      res.json({
        success: true,
      });
    }
  );
});

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;

  const productSql = `
    SELECT
      p.*,
      c.name AS category_name,
      COALESCE(i.stock,0) AS stock,
      COALESCE(AVG(r.rating),0) AS rating,
      COUNT(r.id) AS review_count
    FROM products p
    LEFT JOIN categories c
      ON p.category_id = c.id
    LEFT JOIN inventory i
      ON p.id = i.product_id
    LEFT JOIN reviews r
      ON p.id = r.product_id
    WHERE p.id = ?
    GROUP BY p.id
  `;

  const reviewSql = `
    SELECT
      r.id,
      r.rating,
      r.comment,
      u.name AS customer_name
    FROM reviews r
    JOIN customers c
      ON r.customer_id = c.id
    JOIN users u
      ON c.user_id = u.id
    WHERE r.product_id = ?
    ORDER BY r.id DESC
  `;

  db.query(productSql, [productId], (err, product) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    db.query(reviewSql, [productId], (err, reviews) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        product: product[0],
        reviews,
      });
    });
  });
});

app.post("/review", (req, res) => {
  const {
    customer_id,
    product_id,
    rating,
    comment,
  } = req.body;

  const sql = `
    INSERT INTO reviews
    (
      customer_id,
      product_id,
      rating,
      comment
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_id,
      product_id,
      rating,
      comment,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.json({
        success: true,
      });
    }
  );
});


app.get(
  "/checkout/:customerId",
  (req, res) => {
    const customerId =
      req.params.customerId;

    const sql = `
      SELECT
        p.name,
        p.price,
        p.thumbnail,
        ci.quantity,
        (ci.quantity * p.price)
        AS subtotal

      FROM carts c

      JOIN cart_items ci
      ON c.id = ci.cart_id

      JOIN products p
      ON ci.product_id = p.id

      WHERE c.customer_id = ?
    `;

    db.query(
      sql,
      [customerId],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json(err);
        }

        res.json({
          success: true,
          items: result,
        });
      }
    );
  }
);

app.listen(3000);
