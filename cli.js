#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Folder aur files create karne ka function
const createFolderStructure = (projectName) => {
  const basePath = path.join(process.cwd(), projectName);

  // Define folders and files
  const folders = [
    "config",
    "controllers",
    "models",
    "routes",
    "middleware",
    "utils",
  ];
  const files = {
    ".env": "PORT=5000\nDB_URI=your_database_uri",
    ".gitignore": "node_modules\n.env",
    "index.js": `
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const { Auth, CRUD, authenticateToken, verifyRole } = require("auth-boilerplate-express");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

// Example Mongoose model
const UserModel = mongoose.model("User", new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
}));

// Middleware
app.use(express.json());

// Authentication Routes
app.use("/auth", Auth(UserModel, SECRET_KEY));

// CRUD Routes (for any model)
const SomeModel = mongoose.model("SomeModel", new mongoose.Schema({ title: String, description: String }));
app.use("/api", CRUD(SomeModel));

// Protected Route Example
app.get(
  "/protected",
  authenticateToken(SECRET_KEY),
  verifyRole("admin"),
  (req, res) => {
    res.status(200).send("Welcome Admin!");
  }
);

// Start Server
mongoose
  .connect("your_database_uri", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log('Server listening on port', PORT)))
  .catch((err) => console.log(err));
        `,
  };

  // Create base directory
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  // Create folders
  folders.forEach((folder) => {
    const folderPath = path.join(basePath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  });

  // Create files
  Object.keys(files).forEach((fileName) => {
    const filePath = path.join(basePath, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, files[fileName]);
    }
  });

  console.log("✅ Folder structure created successfully!");
};

// CLI Arguments
const args = process.argv.slice(2);
const projectName = args[0] || "my-backend-project";

// Execute function
createFolderStructure(projectName);
