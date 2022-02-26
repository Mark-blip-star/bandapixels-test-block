"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var middleweare_1 = require("../middleweare/middleweare");
dotenv.config();
var app = express();
(0, middleweare_1.mountMiddleweare)(app);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("The server is working on port ".concat(PORT, ".Database connected"));
});
