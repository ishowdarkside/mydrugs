const express = require("express");
const path = require("path");
const Router = express.Router();
const authController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);
module.exports = Router;
