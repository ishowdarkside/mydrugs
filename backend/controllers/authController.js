const path = require("path");
const User = require(path.join(__dirname, "..", "models", "userModel.js"));
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/AppError");
const bcrpyt = require("bcrypt");
const Emailer = require("../utilities/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateJWT = function (id, res) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("jwt", token);
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const buffer = crypto.randomBytes(25);
  user.confirmationToken = crypto
    .createHash("sha256")
    .update(buffer)
    .digest("hex");
  //REMOVE 3000 in deployment process
  const emailMessage = `To confirm your account visit: \n ${req.protocol}://${req.hostname}:3000/confirmAccount/${user.confirmationToken}`;

  await user.save({ validateBeforeSave: true });
  const message = await Emailer.sendConfirmation(user.email, emailMessage);
  res.status(201).json({
    status: "success",
    message,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return new next(new AppError(401, "Invalid Email/Password"));
  const compared = await bcrpyt.compare(req.body.password, user.password);
  if (!compared) return next(new AppError(401, "Invalid Email/Password"));
  const token = generateJWT(user._id, res);
  res.status(200).json({
    status: "success",
    data: "logged in successfully!",
    token,
  });
});

exports.protect = (req, res, next) => {
  const token = req.cookies.jwt;
  next();
};
