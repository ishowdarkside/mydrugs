const path = require("path");
exports.renderIndex = (req, res) => {
  const file = path.join(__dirname, "..", "views", "index");
  res.render(file);
};

exports.renderRegister = (req, res) => {
  const file = path.join(__dirname, "..", "views", "register");
  res.render(file);
};

exports.renderLogin = (req, res) => {
  const file = path.join(__dirname, "..", "views", "login");
  res.render(file);
};

exports.renderError = (req, res) => {
  const file = path.join(__dirname, "..", "views", "error");
  res.render(file);
};

exports.renderConfirm = (req, res) => {
  const file = path.join(__dirname, "..", "views", "confirm");

  res.render(file, { req });
};

exports.renderMain = (req, res) => {
  const file = path.join(__dirname, "..", "views", "main");
  res.render(file, { user: req.user });
};

exports.renderAdminInterface = (req, res) => {
  const file = path.join(__dirname, "..", "views", "adminInterface");
  res.render(file, { user: req.user });
};

exports.renderAddProduct = (req, res) => {
  const file = path.join(__dirname, "..", "views", "adminAddProduct");
  res.render(file, { user: req.user });
};
