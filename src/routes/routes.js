const express = require("express");
const Route = express.Router();
const { createUser } = require("../controller/user");

Route.route("/api/v1/users").post(createUser);
module.exports = Route;
