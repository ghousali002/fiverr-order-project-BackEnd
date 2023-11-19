// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/Login", require("./Routes/LoginRoute"));
app.use("/Register", require("./Routes/RegistrationRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
