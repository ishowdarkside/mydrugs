const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

router.get("/", authController.protect, viewController.renderIndex);
router.get("/register", viewController.renderRegister);
module.exports = router;
