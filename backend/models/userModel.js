const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: [
      {
        validator: function (data) {
          return data.match(/^[a-zA-Z\s]+$/);
        },
        message: "Only characters!",
      },
      {
        validator: function (data) {
          return data.split(" ").length > 1;
        },
        message: "Please write Full Name!",
      },
    ],
  },
  email: {
    type: String,
    validate: {
      validator: function (data) {
        return data.match(/^\S+@\S+\.\S+$/);
      },
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    minlength: [8, "Password must at least be 8 characters"],
    maxlength: [30, "Password can be  max 30 characters"],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (data) {
        return data === this.password;
      },
      message: "Passwords are not matching!",
    },
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrpyt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
