// routes/index.js
const express = require("express");
const router = express.Router();

const LoginController = require("../Controllers/LoginController");
router.post("/LoginUser", LoginController.LoginUser);

module.exports = router;
