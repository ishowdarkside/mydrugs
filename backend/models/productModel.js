const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique: true,
    required: [true, "please provide product name"],
  },
  productSub: {
    type: String,
    required: [true, "please provide product subtitle"],
  },
  image: {
    type: String,
    //required: [true, "please provide product image"],
  },
  description: {
    type: String,
    required: [true, "please provide product description"],
  },
  price: {
    type: "String",
    required: [true, "please provide product price"],
  },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
  ratingAvg: {
    type: Number,
    default: 4.7,
  },
  orders: {
    type: Number,
    default: 0,
  },
  shippingDate: {
    type: "String",
    required: [true, "please provide shipping date"],
    enum: ["same day", "next day"],
  },
  category: {
    type: "String",
    enum: ["sedatives", "stimulants", "hallucinogenics"],
  },
  shippingLocation: {
    type: "String",
    enum: ["columbia", "germany", "austria"],
    required: [true, "please provide shipping location"],
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
