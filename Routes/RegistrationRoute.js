// routes/index.js
const express = require("express");
const router = express.Router();

const RegistrationController = require("../Controllers/RegistrationController");

router.post("/createUser", RegistrationController.createUser);

router.get("/generateCaptcha", RegistrationController.generateNewCaptcha);

module.exports = router;
