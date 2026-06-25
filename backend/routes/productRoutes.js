const express = require("express");

const router = express.Router();

const product = require("../controllers/productController");

const upload = require("../config/multer");

router.post(
  "/addproduct",

  upload.single("file"),

  product.addProduct,
);

router.put(
  "/updateproduct/:id",

  upload.single("file"),

  product.updateProduct,
);

module.exports = router;

router.delete(
  "/deleteproduct/:id",

  product.deleteProduct,
);

router.get(
  "/homepage",

  product.homepage,
);

router.get(
  "/products",

  product.products,
);

router.get(
  "/product/:id",

  product.singleProduct,
);

router.get(
  "/product-image/:id",

  product.productImage,
);
