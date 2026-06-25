const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../services/emailService");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role_id } = req.body;

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

VALUES
(?,?,?,?,?,1)

`;

    db.query(
      sql,

      [name, email, hashedPassword, phone || "", role_id],

      async (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        const userId = result.insertId;

        if (role_id == 3) {
          db.query(
            "INSERT INTO customers(user_id) VALUES(?)",

            [userId],
          );
        }

        try {
          await sendVerificationEmail(email);
        } catch (error) {
          console.log(error);
        }

        res.json({
          success: true,
          message: "Registration Successful",
        });
      },
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = (req, res) => {
  const { email, password, role } = req.body;

  const sql = `

SELECT *
FROM users
WHERE email=?

`;

  db.query(
    sql,

    [email],

    async (err, result) => {
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
        passwordMatched = await bcrypt.compare(password, user.password);
      } else {
        passwordMatched = password === user.password;

        if (passwordMatched) {
          const newHash = await bcrypt.hash(password, 10);

          db.query(
            "UPDATE users SET password=? WHERE id=?",

            [newHash, user.id],
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
        (role === "customer" && user.role_id !== 3) ||
        (role === "seller" && user.role_id !== 2)
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
        },
      );

      if (user.role_id === 3) {
        db.query(
          `
SELECT id
FROM customers
WHERE user_id=?
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

                customer_id: customerResult[0]?.id || null,

                name: user.name,

                email: user.email,

                role_id: user.role_id,
              },
            });
          },
        );
      } else if (user.role_id === 2) {
        db.query(
          `

SELECT id
FROM sellers
WHERE user_id=?

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

                seller_id: sellerResult[0]?.id || null,

                name: user.name,

                email: user.email,

                role_id: user.role_id,
              },
            });
          },
        );
      } else {
        res.json({
          success: true,

          token,

          user: {
            id: user.id,

            name: user.name,

            email: user.email,

            role_id: user.role_id,
          },
        });
      }
    },
  );
};
