const path = require("path");
const queryString = require("querystring");

exports.renderIndex = (req, res) => {
  const file = path.join(__dirname, "..", "views", "index");
  res.render(file, { products: req.products, page: req.query.page });
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

exports.renderMain = async (req, res) => {
  const file = path.join(__dirname, "..", "views", "main");
  res.render(file, {
    user: req.user,
    products: req.products,
    page: req.query.page?.length > 1 ? req.query.page.at(-1) : req.query.page,
    currentUrl: req.url,
  });
};

exports.renderAdminInterface = (req, res) => {
  const file = path.join(__dirname, "..", "views", "adminInterface");
  res.render(file, { user: req.user });
};

exports.renderAddProduct = (req, res) => {
  const file = path.join(__dirname, "..", "views", "adminAddProduct");
  res.render(file, { user: req.user });
};

exports.renderEditProduct = (req, res) => {
  const file = path.join(__dirname, "..", "views", "editProduct");
  res.render(file, { user: req.user, product: req.product });
};

exports.editProductsPanel = (req, res) => {
  const file = path.join(__dirname, "..", "views", "editProductsPanel");
  res.render(file, { user: req.user, products: req.products });
};

exports.deleteProductsPanel = (req, res) => {
  const file = path.join(__dirname, "..", "views", "deleteProductsPanel");
  res.render(file, { user: req.user, products: req.products });
};

exports.renderSpecificProduct = (req, res) => {
  const file = path.join(__dirname, "..", "views", "specificProduct");
  res.render(file, { user: req.user, product: req.product });
};
