const express = require("express");
const Route = express.Router();

Route.route("/api/v1/houses").get();
module.exports = Route;
