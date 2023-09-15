const express = require("express");
const Route = express.Router();
const auth = require("../middleware/auth");
const { createUser, logIn, logOut, authedUser } = require("../controller/user");

Route.route("/api/v1/users").post(createUser);
Route.route("/api/v1/users/login").post(logIn);
Route.route("/api/v1/users/logout").post(auth, logOut);
Route.route("/api/v1/users/me").get(auth, authedUser).patch(auth);
module.exports = Route;
