const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const authenticateToken = require("./utils/middleware");
const CRUD = require("./CRUD/crudRoutes");

const Auth = (UserModel, secretKey) => {
  if (!UserModel || !secretKey) {
    throw new Error("Model and secret key are required!");
  }

  const router = express.Router();

  // Signup Route
  router.post("/signup", async (req, res) => {
    try {
      const { username, password, ...additionalData } = req.body;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        ...additionalData,
      });
      await newUser.save();

      res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Login Route
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found!" });

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials!" });

      // Generate token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({ message: "Login successful!", token, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

module.exports = { Auth, authenticateToken, CRUD };
