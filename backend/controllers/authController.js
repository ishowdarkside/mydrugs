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
  if (!User.checkFields(req.body))
    return next(new AppError(400, "Please provide all fields!"));
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
  //REMOVE 3000 in production
  const emailMessage = `To confirm your account visit: \n ${req.protocol}://${req.hostname}:3000/confirmAccount/${user.confirmationToken} \n If you don't confirm your account in next 10 minutes,your data will be lost!`;

  await user.save({ validateBeforeSave: true });
  const message = await Emailer.sendConfirmation(user.email, emailMessage);
  res.status(201).json({
    status: "success",
    message,
  });
});

exports.confirm = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    confirmationToken: req.params.confirmToken,
  });
  const errorFile = path.join(__dirname, "..", "views", "error");
  if (!user) return res.render(errorFile);
  user.confirmed = true;
  user.confirmationToken = undefined;
  user.confirmExpires = undefined;
  await user.save({ validateBeforeSave: false });
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email, confirmed: true });
  if (!user) return new next(new AppError(401, "Invalid Email/Password"));
  const compared = await bcrpyt.compare(req.body.password, user.password);
  if (!compared) return next(new AppError(401, "Invalid Email/Password"));
  const token = generateJWT(user._id, res);
  req.headers.Authorization = `Bearer ${token}`;
  res.status(200).json({
    status: "success",
    message: "logged in successfully!",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.redirect("/login");
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    } else {
      const user = await User.findById(decoded.id);
      if (!user) return res.redirect("/login");
      if (
        user.passwordChangedAt &&
        decoded.iat * 1000 < user.passwordChangedAt.getTime()
      )
        return res.redirect("/login");
      req.user = user;
      next();
    }
  });
});

exports.protectProcess = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next();
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next();
    } else {
      return res.redirect("/main");
    }
  });
});

exports.protectAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    const file = path.join(__dirname, "..", "views", "error");
    return res.render(file);
  }

  next();
};
