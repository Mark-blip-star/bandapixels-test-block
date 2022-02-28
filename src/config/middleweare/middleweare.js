"use strict";
exports.__esModule = true;
exports.mountMiddleweare = void 0;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var mountMiddleweare = function (app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
};
exports.mountMiddleweare = mountMiddleweare;
