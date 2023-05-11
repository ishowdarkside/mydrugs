const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

router.get(
  "/",
  authController.protectProcess,
  productController.getPaginatedProducts,
  viewController.renderIndex
);
router.get(
  "/register",
  authController.protectProcess,
  viewController.renderRegister
);
router.get("/login", authController.protectProcess, viewController.renderLogin);
router.get(
  "/confirmAccount/:confirmToken",
  authController.confirm,
  viewController.renderConfirm
);
router.get(
  "/main",
  authController.protect,
  productController.getPaginatedProducts,
  viewController.renderMain
);
router.get(
  "/admin",
  authController.protect,
  authController.protectAdmin,
  viewController.renderAdminInterface
);

router.get(
  "/admin/addProduct",
  authController.protect,
  authController.protectAdmin,
  viewController.renderAddProduct
);

router.get(
  "/admin/editProducts",
  authController.protect,
  authController.protectAdmin,
  productController.renderAllProducts,
  viewController.editProductsPanel
);

router.get(
  "/admin/editProduct/:productId",
  authController.protect,
  authController.protectAdmin,
  productController.checkProduct,
  viewController.renderEditProduct
);

router.get(
  "/admin/deleteProducts",
  authController.protect,
  authController.protectAdmin,
  productController.renderAllProducts,
  viewController.deleteProductsPanel
);

router.get(
  "/product/:productId",
  authController.protect,
  productController.renderSpecificProduct,
  viewController.renderSpecificProduct
);

module.exports = router;
