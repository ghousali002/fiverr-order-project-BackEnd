const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../users.json");
const secretKey = "stresser";

exports.LoginUser = (req, res, next) => {
  const { username, password } = req.body;

  // Read existing users from the file
  let users = [];
  try {
    const usersData = fs.readFileSync(usersFilePath, "utf-8");
    if (usersData.trim() !== "") {
      users = JSON.parse(usersData);
    }
  } catch (error) {
    console.error("Error reading user data file:", error);
    return res.status(500).json({ error: "Error reading user data file." });
  }

  // Check if the username and password match any user in the file
  const authenticatedUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (authenticatedUser) {
    // Generate a token with the user information
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

    // Send the token to the client
    res.status(200).json({ message: "Login successful!", token });
  } else {
    res.status(401).json({ error: "Invalid username or password." });
  }
};
