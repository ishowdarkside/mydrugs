const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

router.get("/", viewController.renderIndex);
router.get("/register", viewController.renderRegister);
module.exports = router;
