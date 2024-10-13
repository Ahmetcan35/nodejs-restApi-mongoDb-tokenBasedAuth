const express = require("express");
const products = require("../router/products");
const category = require("../router/category");
const user = require("../router/user");
const home = require("../router/home");
const error = require("../middleware/error");

module.exports = function (app) {

    app.use(express.json());
    app.use("/api/products",products);
    app.use("/api/categories",category);
    app.use("/api/users",user);
    app.use("/",home);
    app.use(error);
}