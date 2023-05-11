const path = require("path");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/AppError");
const sharp = require("sharp");

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
  if (!req.file || !req.file.mimetype.startsWith("image")) {
    return next(new AppError(400, "Please provide valid image"));
  }

  const product = await ProductModel.create({
    productName: req.body.productName,
    productSub: req.body.productSub,
    description: req.body.description,
    price: req.body.price,
    shippingDate: req.body.shippingDate,
    category: req.body.category,
    shippingLocation: req.body.shippingLocation,
    productImage: `/imgs/${req.file.originalname}`,
  });

  await sharp(req.file.buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/imgs/${req.file.originalname}`);
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
  if (req.file) {
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/imgs/${req.file.originalname}`);
    product.productImage = `/imgs/${req.file.originalname}`;
  }

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

exports.getSingleProuct = catchAsync(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.productId);
  if (!product) return next(new AppError("Product not found"));
  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.checkProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.productId });

    req.product = product;
    next();
  } catch (err) {
    const file = path.join(__dirname, "..", "views", "error");
    return res.render(file);
  }
};

exports.renderAllProducts = catchAsync(async (req, res, next) => {
  const products = await ProductModel.find();
  req.products = products;
  next();
});

exports.getPaginatedProducts = catchAsync(async (req, res, next) => {
  const skipValue = req.query.page ? (+req.query.page - 1) * 12 : 0;
  const products = await ProductModel.find().skip(skipValue).limit(12);
  req.products = products;
  next();
});

exports.renderSpecificProduct = catchAsync(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.productId);
  req.product = product;
  next();
});
