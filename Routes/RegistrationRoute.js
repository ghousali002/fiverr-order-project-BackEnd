// routes/index.js
const express = require("express");
const router = express.Router();

const RegistrationController = require("../Controllers/RegistrationController");

router.post("/createUser", RegistrationController.createUser);

module.exports = router;
