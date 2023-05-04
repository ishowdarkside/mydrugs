const path = require("path");
const User = require(path.join(__dirname, "..", "models", "userModel.js"));
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/AppError");
const bcrpyt = require("bcrypt");
exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: "User created successfully!",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return new next(new AppError(401, "Invalid Email/Password"));
  const compared = await bcrpyt.compare(req.body.password, user.password);
  if (!compared) return next(new AppError(401, "Invalid Email/Password"));
  res.status(200).json({
    status: "success",
    data: "LOGGED IN SUCCESSFULLY!",
  });
});
