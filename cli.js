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
    ".env": "PORT=5000\nDB_URI=your_database_uri\nSECRET_KEY=your_secret_key",
    ".gitignore": "node_modules\n.env",
    "index.js": `
require('dotenv').config();
const express = require("express");
const { Auth, CRUD, authenticateToken, verifyRole } = require("auth-boilerplate-express");

// Import config and models
const config = require("./config/config");
const UserModel = require("./models/userModel");
const SomeModel = require("./models/someModel");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Authentication Routes
app.use("/auth", Auth(UserModel, process.env.SECRET_KEY));

// CRUD Routes (for any model)
app.use("/api", CRUD(SomeModel));

// Protected Route Example
app.get(
  "/protected",
  authenticateToken(process.env.SECRET_KEY),
  verifyRole("admin"),
  (req, res) => {
    res.status(200).send("Welcome Admin!");
  }
);

// Connect to database and start server
config.connectDB().then(() => {
  app.listen(PORT, () => console.log('Server listening on port', PORT));
});
        `,
    "config/config.js": `
require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB
};`,
    "models/userModel.js": `
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;`,
    "models/someModel.js": `
const mongoose = require("mongoose");

const someModelSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const SomeModel = mongoose.model("SomeModel", someModelSchema);

module.exports = SomeModel;`
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
