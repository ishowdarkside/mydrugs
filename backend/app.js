const express = require("express");
const dotenv = require("dotenv");
const ViewRouter = require("./routes/viewRouter");
const path = require("path");
const morgan = require("morgan");
const apiAuthRouter = require("./routes/apiAuthRouter");
const ErrorMiddleware = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const viewController = require("./controllers/viewController");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//Rendering Views
app.set("view engine", "pug");
app.use("/", ViewRouter);

//Handling Api Calls
app.use("/api/users", apiAuthRouter);

//Error Handling Middleware

//Handling unhandled routes
app.use("*", viewController.renderError);
app.use(ErrorMiddleware);
module.exports = app;
