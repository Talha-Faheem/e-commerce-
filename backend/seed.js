const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "t@lh@.11",
  database: "ecommerce_platform",
});

const images = [
  [1, "chair.jpeg"],
  [2, "coffee-table.jpeg"],
  [3, "rug.jpeg"],
  [4, "bed.jpeg"],
  [5, "laptop.jpeg"],
  [6, "tv.jpeg"],
  [7, "smartwatch.jpeg"],
  [8, "speaker.jpeg"],
  [9, "earbuds.jpeg"],
  [10, "iphone.jpeg"],
  [11, "itel-phone.jpeg"],
  [12, "shirt.jpeg"],
  [13, "black-tshirt.jpeg"],
  [14, "women-tshirt.jpeg"],
  [15, "glasses.jpeg"],
  [16, "shalwar-kameez.jpeg"],
  [17, "refrigerator.jpeg"],
  [18, "oven.jpeg"],
  [19, "washing-machine.jpeg"],
  [20, "tea-set.jpeg"],
  [21, "knife-set.jpeg"],
  [22, "treadmill.jpeg"],
  [23, "dumbbells.jpeg"],
  [24, "makeup-kit.jpeg"],
  [25, "derma-roller.jpeg"],
  [26, "pressure-washer.jpeg"],
  [27, "lawn-mower.jpeg"],
  [28, "grass.jpeg"],
  [29, "tree.jpeg"],
  [30, "car.jpeg"],
];

db.connect((err) => {
  if (err) {
    console.log("Database Connection Error:", err);
    return;
  }

  console.log("Database Connected");

  db.query(
    "TRUNCATE TABLE product_images",
    (err) => {
      if (err) {
        console.log("Truncate Error:", err);
        return;
      }

      console.log("product_images cleared");

      let inserted = 0;

      images.forEach(
        ([productId, fileName]) => {
          const imagePath =
            path.join(
              __dirname,
              "uploads",
              fileName
            );

          if (
            !fs.existsSync(
              imagePath
            )
          ) {
            console.log(
              `Missing: ${fileName}`
            );
            return;
          }

          const imageBuffer =
            fs.readFileSync(
              imagePath
            );

          db.query(
            `
            INSERT INTO product_images
            (
              product_id,
              image_data,
              image_type
            )
            VALUES
            (?, ?, ?)
            `,
            [
              productId,
              imageBuffer,
              "image/jpeg",
            ],
            (err) => {
              if (err) {
                console.log(
                  `Error: ${fileName}`,
                  err
                );
              } else {
                inserted++;

                console.log(
                  `Inserted: ${fileName}`
                );

                if (
                  inserted ===
                  images.length
                ) {
                  console.log(
                    "All Images Inserted Successfully"
                  );

                  db.end();
                }
              }
            }
          );
        }
      );
    }
  );
});