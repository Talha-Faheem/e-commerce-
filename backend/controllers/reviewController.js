const db = require("../config/db");

exports.addReview = (req, res) => {
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


VALUES


(

?,?,?,?

)


`;

  db.query(
    sql,

    [customer_id, product_id, rating, comment],

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
    },
  );
};
