const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensuredLoggedIn = require("../../config/ensureLoggedIn");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post("/", usersCtrl.create);
// POST /api/users/login
router.post("/login", usersCtrl.login);
//Get Check token
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
