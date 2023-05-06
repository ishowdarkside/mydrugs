const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

router.get("/", authController.protectProcess, viewController.renderIndex);
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
router.get("/main", authController.protect, viewController.renderMain);
module.exports = router;
