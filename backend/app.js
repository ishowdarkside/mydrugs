const express = require("express");
const dotenv = require("dotenv");
const ViewRouter = require("./routes/viewRouter");
const path = require("path");
const morgan = require("morgan");
const apiAuthRouter = require("./routes/apiAuthRouter");
const ErrorMiddleware = require("./controllers/errorController");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());

//Rendering Views
app.set("view engine", "pug");
app.use("/", ViewRouter);

//Handling Api Calls
app.use("/api/users", apiAuthRouter);

//Error Handling Middleware
app.use(ErrorMiddleware);
module.exports = app;
