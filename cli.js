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
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routes'));

// Start Server
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
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
