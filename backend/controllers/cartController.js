const db = require("../config/db");
exports.cart = (req, res) => {
  const customerId = req.params.customerId;

  const sql = `

SELECT


ci.id,


ci.product_id,


ci.quantity,


p.name,


p.price,


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
        return res.status(500).json(err);
      }

      res.json({
        success: true,

        cart: result,
      });
    },
  );
};
exports.addToCart = (req, res) => {
  const { customer_id, product_id, quantity } = req.body;

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
          },
        );
      } else {
        addItem(cart[0].id);
      }

      function addItem(cartId) {
        db.query(
          `

SELECT *

FROM cart_items

WHERE cart_id=?

AND product_id=?

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

SET quantity=quantity+?


WHERE id=?


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
                },
              );
            } else {
              db.query(
                `

INSERT INTO cart_items(

cart_id,
product_id,
quantity

)

VALUES(?,?,?)

`,

                [cartId, product_id, quantity],

                (err5) => {
                  if (err5) {
                    return res.status(500).json(err5);
                  }

                  res.json({
                    success: true,

                    message: "Added To Cart",
                  });
                },
              );
            }
          },
        );
      }
    },
  );
};
exports.increase = (req, res) => {
  db.query(
    `

UPDATE cart_items


SET quantity=quantity+1


WHERE id=?

`,

    [req.params.id],

    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
      });
    },
  );
};
exports.decrease = (req, res) => {
  db.query(
    `

UPDATE cart_items


SET quantity =


CASE


WHEN quantity > 1


THEN quantity-1


ELSE 1


END



WHERE id=?


`,

    [req.params.id],

    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
      });
    },
  );
};
exports.remove = (req, res) => {
  db.query(
    "DELETE FROM cart_items WHERE id=?",

    [req.params.id],

    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
      });
    },
  );
};
exports.checkout = (req, res) => {
  const customerId = req.params.customerId;

  const sql = `



SELECT


p.name,


p.price,


p.thumbnail,


ci.quantity,


(ci.quantity*p.price)

AS subtotal




FROM carts c


JOIN cart_items ci

ON c.id=ci.cart_id


JOIN products p

ON ci.product_id=p.id



WHERE c.customer_id=?



`;

  db.query(
    sql,

    [customerId],

    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,

        items: result,
      });
    },
  );
};
