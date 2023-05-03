const path = require("path");
exports.renderIndex = (req, res) => {
  const file = path.join(__dirname, "..", "views", "index");
  res.render(file);
};

exports.renderRegister = (req, res) => {
  const file = path.join(__dirname, "..", "views", "register");
  res.render(file);
};
