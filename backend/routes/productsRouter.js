const express = require("express");
const Router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
//Get all products
Router.get("/getAllProducts", productController.getAllProducts);
//Create product
Router.post(
  "/",
  authController.protect,
  authController.protectAdmin,
  upload.single("productImage"),
  productController.createProduct
);

//Update Product
Router.use(authController.protect, authController.protectAdmin);
Router.route("/:productId")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct)
  .get(productController.getSingleProuct);

//Delete Product

module.exports = Router;
