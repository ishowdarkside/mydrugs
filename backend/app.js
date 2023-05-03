const express = require("express");
const dotenv = require("dotenv");
const ViewRouter = require("./routes/viewRouter");
const path = require("path");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.static("public"));
app.use(morgan("dev"));

//Rendering Views
app.set("view engine", "pug");
app.use("/", ViewRouter);

module.exports = app;
