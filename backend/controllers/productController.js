const path = require("path");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/AppError");
const ProductModel = require(path.join(
  __dirname,
  "..",
  "models",
  "productModel.js"
));

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json({
    status: "success",
    data: products,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await ProductModel.create({
    productName: req.body.productName,
    productSub: req.body.productSub,
    description: req.body.description,
    price: req.body.price,
    shippingDate: req.body.shippingDate,
    category: req.body.category,
    shippingLocation: req.body.shippingLocation,
  });

  return res.status(200).json({
    status: "success",
    message: "Product created sucessfully!",
    product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.productId);
  if (!product)
    return res.status(404).json({
      status: "fail",
      message: `"${req.params.productName}" product doesn't exist!`,
    });
  Object.entries(req.body).forEach((el) => {
    product[el[0]] = el[1];
  });

  await product.save({ validateBeforeSave: true });

  res.status(201).json({
    status: "success",
    message: "Product updated successfully!",
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.productId);

  if (!product)
    return res.status(404).json({
      status: "fail",
      message: `${req.params.productName} doesn't exist`,
    });

  await product.deleteOne();

  res.status(204).json({
    status: "success",
  });
});
