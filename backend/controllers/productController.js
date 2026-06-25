const db = require("../config/db");
const generateSlug = require("../utils/generateSlug");

exports.addProduct = (req, res) => {
  const { seller_id, category_id, name, description, price, stock } = req.body;

  const slug = generateSlug(name);

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

(

?,?,?,?,?,?,
'active'

)

`;

  db.query(
    productSql,

    [seller_id, category_id, name, slug, description, price],

    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json(err);
      }

      const productId = result.insertId;

      const inventorySql = `

INSERT INTO inventory
(

product_id,
stock

)

VALUES
(?,?)

`;

      db.query(
        inventorySql,

        [productId, stock],

        (err2) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          if (!req.file) {
            return res.json({
              success: true,

              message: "Product added without image",
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

(

?,
?,
?

)

`;

          db.query(
            imageSql,

            [productId, req.file.buffer, req.file.mimetype],

            (err3) => {
              if (err3) {
                return res.status(500).json(err3);
              }

              res.json({
                success: true,

                message: "Product Added",
              });
            },
          );
        },
      );
    },
  );
};
exports.updateProduct = (req, res) => {
  const productId = req.params.id;

  const { name, description, price, stock, category_id } = req.body;

  if (req.file) {
    const imageData = req.file.buffer.toString("base64");

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

      [name, description, price, category_id, imageData, productId],

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
          },
        );
      },
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

      [name, description, price, category_id, productId],

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
          },
        );
      },
    );
  }
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  db.query(
    "DELETE FROM cart_items WHERE product_id=?",

    [productId],

    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      db.query(
        "DELETE FROM wishlist_items WHERE product_id=?",

        [productId],

        (err2) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          db.query(
            "DELETE FROM reviews WHERE product_id=?",

            [productId],

            (err3) => {
              if (err3) {
                return res.status(500).json(err3);
              }

              db.query(
                "DELETE FROM order_items WHERE product_id=?",

                [productId],

                (err4) => {
                  if (err4) {
                    return res.status(500).json(err4);
                  }

                  db.query(
                    "DELETE FROM product_images WHERE product_id=?",

                    [productId],

                    (err5) => {
                      if (err5) {
                        return res.status(500).json(err5);
                      }

                      db.query(
                        "DELETE FROM inventory WHERE product_id=?",

                        [productId],

                        (err6) => {
                          if (err6) {
                            return res.status(500).json(err6);
                          }

                          db.query(
                            "DELETE FROM products WHERE id=?",

                            [productId],

                            (err7) => {
                              if (err7) {
                                return res.status(500).json(err7);
                              }

                              res.json({
                                success: true,

                                message: "Product deleted successfully",
                              });
                            },
                          );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
};

exports.products = (req, res) => {
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
ON p.id=i.product_id


LEFT JOIN reviews r
ON p.id=r.product_id


LEFT JOIN categories c
ON p.category_id=c.id


GROUP BY p.id


`;

  db.query(
    sql1,

    (err, categories) => {
      if (err) {
        return res.status(500).json(err);
      }

      db.query(
        sql2,

        (err, products) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            success: true,

            categories,

            products,
          });
        },
      );
    },
  );
};

exports.singleProduct = (req, res) => {
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
ON p.category_id=c.id


LEFT JOIN inventory i
ON p.id=i.product_id


LEFT JOIN reviews r
ON p.id=r.product_id


WHERE p.id=?


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
ON r.customer_id=c.id


JOIN users u
ON c.user_id=u.id



WHERE r.product_id=?



ORDER BY r.id DESC


`;

  db.query(
    productSql,

    [productId],

    (err, product) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (product.length === 0) {
        return res.status(404).json({
          success: false,

          message: "Product not found",
        });
      }

      db.query(
        reviewSql,

        [productId],

        (err, reviews) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            success: true,

            product: product[0],

            reviews,
          });
        },
      );
    },
  );
};

exports.homepage = (req, res) => {
  const categoriesSql = `
SELECT *
FROM categories
WHERE status='active'
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


MAX(COALESCE(i.stock,0))
AS stock,


COALESCE(
AVG(r.rating),
0
)
AS rating


FROM products p


LEFT JOIN inventory i
ON p.id=i.product_id


LEFT JOIN reviews r
ON p.id=r.product_id



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


MAX(COALESCE(i.stock,0))
AS stock,


COUNT(oi.id)
AS sales



FROM products p


LEFT JOIN inventory i
ON p.id=i.product_id


LEFT JOIN order_items oi
ON p.id=oi.product_id




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
        return res.status(500).json({
          success: false,

          message: "Categories query failed",
        });
      }

      const categoriesWithImages = categories.map((cat) => ({
        ...cat,

        image: cat.image ? `http://localhost:3000/uploads/${cat.image}` : null,
      }));

      db.query(
        featuredSql,

        (err, featured) => {
          if (err) {
            return res.status(500).json({
              success: false,

              message: "Featured products query failed",
            });
          }

          db.query(
            trendingSql,

            (err, trending) => {
              if (err) {
                return res.status(500).json({
                  success: false,

                  message: "Trending products query failed",
                });
              }

              res.json({
                success: true,

                categories: categoriesWithImages,

                featured,

                trending,
              });
            },
          );
        },
      );
    },
  );
};

exports.productImage = (req, res) => {
  const sql = `

SELECT image_data,image_type


FROM product_images


WHERE product_id=?


LIMIT 1


`;

  db.query(
    sql,

    [req.params.id],

    (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).send("Image not found");
      }

      res.set(
        "Content-Type",

        result[0].image_type,
      );

      res.send(result[0].image_data);
    },
  );
};
