const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../users.json");

let storedCaptchaCode = '';

const generateCaptchaa = () => {
  const characters = '123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  storedCaptchaCode = result;
  return result;
};

// Function to create a user
exports.createUser = (req, res) => {
  const { username, email, password, captchaCode } = req.body;

  if (captchaCode !== storedCaptchaCode) {
    console.log(username,email,password);
    console.log("Incorrect CAPTCHA code." , "captchaCode",captchaCode, "storedCaptchaCode", storedCaptchaCode );
    return res.status(401).json({ error: "Incorrect CAPTCHA code." });
  }



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

  // Check if the username or email already exists
  const existingUser = users.find((user) => {
    if (user.email === "") {
      // If existing user has an empty email, check only for the username
      return user.username === username;
    }
    // Otherwise, check both username and email
    return user.username === username || user.email === email;
  });

  if (existingUser) {
    console.error("Error: User already exists.");
    return res.status(400).json({ error: "Username or email already exists." });
  }

  // Create a new user object
  const newUser = {
    username,
    email,
    password,
  };

  // Add the new user to the array
  users.push(newUser);

  // Write the updated users array back to the file
  fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (error) => {
    if (error) {
      console.error("Error writing user data file:", error);
      return res.status(500).json({ error: "Error writing user data file." });
    }
    console.log("User created.");

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  });
};

exports.generateNewCaptcha = (req, res) => {
  const newCaptcha = generateCaptchaa(); 
  console.log("newCaptcha:",newCaptcha);
  res.status(200).json({ captcha: newCaptcha }); 
};

module.exports = {
  createUser: exports.createUser,
  generateNewCaptcha: exports.generateNewCaptcha,
};
