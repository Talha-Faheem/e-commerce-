const db = require("../config/db");

exports.placeOrder = (req, res) => {
  const { customer_id, address } = req.body;

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

VALUES

(

?,?,?,?,?,?,?,?,?,?,?

)

`;

  db.query(
    `

SELECT


u.id AS user_id


FROM customers c


JOIN users u

ON c.user_id=u.id


WHERE c.id=?


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

      const userId = userResult[0].user_id;

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

          const addressId = addressResult.insertId;

          const cartSql = `


SELECT


ci.quantity,


p.id AS product_id,


p.price,


p.seller_id



FROM carts c


JOIN cart_items ci

ON c.id=ci.cart_id


JOIN products p

ON ci.product_id=p.id



WHERE c.customer_id=?


`;

          db.query(
            cartSql,

            [customer_id],

            (err3, cartItems) => {
              if (err3) {
                return res.status(500).json(err3);
              }

              if (cartItems.length === 0) {
                return res.status(400).json({
                  success: false,

                  message: "Cart is empty",
                });
              }

              let subtotal = 0;

              cartItems.forEach((item) => {
                subtotal += item.price * item.quantity;
              });

              const orderNumber = "ORD-" + Date.now();

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

(

?,?,?,?,

0,0,0,

?,

1,
1,
1

)


`;

              db.query(
                orderSql,

                [customer_id, addressId, orderNumber, subtotal, subtotal],

                (err4, orderResult) => {
                  if (err4) {
                    return res.status(500).json(err4);
                  }

                  const orderId = orderResult.insertId;

                  const values = cartItems.map((item) => [
                    orderId,

                    item.product_id,

                    item.seller_id,

                    item.quantity,

                    item.price,

                    item.price * item.quantity,
                  ]);

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
                        return res.status(500).json(err5);
                      }

                      cartItems.forEach((item) => {
                        db.query(
                          `

UPDATE inventory


SET stock=stock-?


WHERE product_id=?


`,

                          [item.quantity, item.product_id],
                        );
                      });

                      db.query(
                        `

DELETE ci

FROM cart_items ci


JOIN carts c

ON ci.cart_id=c.id



WHERE c.customer_id=?


`,

                        [customer_id],

                        () => {
                          res.json({
                            success: true,

                            order_id: orderId,

                            order_number: orderNumber,

                            message: "Order placed successfully",
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
};

exports.customerOrders = (req, res) => {
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

ON o.id=oi.order_id



JOIN products p

ON oi.product_id=p.id


JOIN addresses a

ON o.address_id=a.id



WHERE o.customer_id=?



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
    },
  );
};
