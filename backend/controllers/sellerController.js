const db = require("../config/db");
exports.sellerDetail = (req, res) => {
  const sellerId = req.params.sellerId;

  const sellerSql = `

SELECT
s.*,
u.name,
u.email,
u.phone

FROM sellers s


JOIN users u
ON s.user_id=u.id


WHERE s.id=?

`;

  const reviewSql = `

SELECT

r.*,

p.name as product_name


FROM reviews r


JOIN products p

ON r.product_id=p.id


WHERE p.seller_id=?

`;

  const ordersSql = `

SELECT *

FROM order_items

WHERE seller_id=?

`;

  const totalOrderSql = `

SELECT COUNT(*) as total

FROM order_items


WHERE seller_id=?

`;

  const productsSql = `

SELECT

p.*,

COALESCE(i.stock,0) as stock,


COALESCE(i.reserved_stock,0)
as reserved_stock,


i.warehouse_location,


i.updated_at



FROM products p


LEFT JOIN inventory i

ON p.id=i.product_id



WHERE p.seller_id=?


`;

  const revenueSql = `

SELECT


COALESCE(SUM(subtotal),0)
AS total


FROM order_items


WHERE seller_id=?


`;

  const topProductsSql = `


SELECT

p.id,

p.name,

p.price,


MAX(COALESCE(i.stock,0))
AS stock,


COUNT(oi.id)
AS sales



FROM products p


LEFT JOIN inventory i

ON p.id=i.product_id


LEFT JOIN order_items oi

ON p.id=oi.product_id



WHERE p.seller_id=?



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
                    });
                  }

                  db.query(
                    productsSql,

                    [sellerId],

                    (err, products) => {
                      if (err) {
                        return res.status(500).json({
                          success: false,
                        });
                      }

                      db.query(
                        revenueSql,

                        [sellerId],

                        (err, revenue) => {
                          if (err) {
                            return res.status(500).json({
                              success: false,
                            });
                          }

                          db.query(
                            topProductsSql,

                            [sellerId],

                            (err, topProducts) => {
                              if (err) {
                                return res.status(500).json({
                                  success: false,
                                });
                              }

                              res.json({
                                success: true,

                                seller: sellerResult[0],

                                productReview,

                                products,

                                orders,

                                totalorder: totalorder[0].total,

                                revenue: revenue[0].total,

                                topProducts,
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
exports.salesPerDay = (req, res) => {
  const sellerId = req.params.sellerId;

  const sql = `


SELECT


DATE(o.created_at)
AS day,


COALESCE(

SUM(oi.subtotal),
0

)

AS revenue


FROM orders o


JOIN order_items oi

ON o.id=oi.order_id



WHERE oi.seller_id=?


AND o.created_at>=DATE_SUB(

CURDATE(),

INTERVAL 6 DAY

)


GROUP BY DATE(o.created_at)


ORDER BY day ASC



`;

  db.query(
    sql,

    [sellerId],

    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      const last7Days = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(date.getDate() - i);

        const formatted = date.toISOString().split("T")[0];

        const found = result.find(
          (item) =>
            new Date(item.day).toISOString().split("T")[0] === formatted,
        );

        last7Days.push({
          day: formatted,

          revenue: found ? Number(found.revenue) : 0,
        });
      }

      res.json({
        success: true,

        salesdata: last7Days,
      });
    },
  );
};
exports.orderPerDay = (req, res) => {
  const sellerId = req.params.sellerId;

  const sql = `


SELECT


DATE(o.created_at)
AS day,


COUNT(DISTINCT o.id)
AS total_orders



FROM orders o


JOIN order_items oi


ON o.id=oi.order_id



WHERE oi.seller_id=?


AND o.created_at>=DATE_SUB(

CURDATE(),

INTERVAL 6 DAY

)



GROUP BY DATE(o.created_at)


ORDER BY day ASC


`;

  db.query(
    sql,

    [sellerId],

    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      const last7Days = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(date.getDate() - i);

        const formatted = date.toISOString().split("T")[0];

        const found = result.find(
          (item) =>
            new Date(item.day)

              .toISOString()

              .split("T")[0] === formatted,
        );

        last7Days.push({
          day: formatted,

          total_orders: found ? found.total_orders : 0,
        });
      }

      res.json({
        success: true,

        orderdata: last7Days,
      });
    },
  );
};
exports.sellerOrders = (req, res) => {
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


p.name as product_name,


u.name as customer_name



FROM order_items oi



JOIN orders o
ON oi.order_id=o.id



JOIN customers c
ON o.customer_id=c.id


JOIN users u
ON c.user_id=u.id


JOIN products p
ON oi.product_id=p.id



WHERE oi.seller_id=?


ORDER BY o.created_at DESC


`;

  db.query(
    sql,

    [sellerId],

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
    },
  );
};
exports.updateOrderStatus = (req, res) => {
  const orderId = req.params.orderId;

  const { order_status_id } = req.body;

  const sql = `


UPDATE orders


SET order_status_id=?


WHERE id=?


`;

  db.query(
    sql,

    [order_status_id, orderId],

    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,

          error: err.message,
        });
      }

      res.json({
        success: true,

        message: "Order Updated",
      });
    },
  );
};
