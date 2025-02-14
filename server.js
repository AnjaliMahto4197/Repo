const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createUser, getUser } = require("./dbfile/dboperation");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Signup Endpoint
app.post("/api/signup", async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const userData = req.body;
    await createUser(userData);
    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
});

// Login Endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await getUser(username, password);

    if (userData) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: userData,
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("JWT_SECRET:", process.env.JWT_SECRET);

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required." });
//   }

//   try {
//     // Authenticate user
//     const user = await loginUser(email, password);

//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password." });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user.id, username: user.username, email: user.email },
//       process.env.JWT_SECRET, // Secret key from .env file
//       { expiresIn: "1h" } // Token expires in 1 hour
//     );

//     res.status(200).json({ message: "Login successful", token }); // Send token in response
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });