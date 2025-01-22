# Auth-Boilerplate-Express

A simple yet powerful authentication boilerplate for building MERN stack applications. This package streamlines the process of adding authentication, authorization, and basic CRUD operations to your Express.js backend, along with CLI-based project initialization.

---

## Features

### 1. **Authentication**
- User Signup
- User Login with JWT (JSON Web Tokens)
- Password Hashing using bcrypt

### 2. **Authorization**
- Role-Based Access Control (RBAC)
- Middleware to restrict access based on user roles

### 3. **CRUD Operations**
- Pre-configured CRUD routes for any Mongoose model
- Easy-to-use, extendable, and RESTful

### 4. **Email Integration**
- Nodemailer setup for sending emails (e.g., password reset, email verification)

### 5. **Middleware**
- JWT Authentication Middleware for protecting routes

### 6. **CLI Tool**
- Quickly generate folder structures and boilerplate code for your Express.js backend with a single command.

---

## Installation

Install the package using npm:

```bash
npm install auth-boilerplate-express
```

---

## Usage

### Import and Initialize

```javascript
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
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err));
```

---

## CLI Usage

### Initialize a Backend Project

Run the following command to generate the boilerplate structure:

```bash
npx init-backend <project-name>
```

This will create the following structure:

```
<project-name>/
|-- config/
|-- controllers/
|-- models/
|-- routes/
|-- middleware/
|-- utils/
|-- .env
|-- .gitignore
|-- index.js
```

---

## API Endpoints

### Authentication

#### Signup
`POST /auth/signup`

**Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User created successfully!"
}
```

#### Login
`POST /auth/login`

**Body:**
```json
{
  "email": "test@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful!",
  "token": "<JWT_TOKEN>"
}
```

### CRUD

#### Create a Record
`POST /api`

#### Read All Records
`GET /api`

#### Read a Single Record
`GET /api/:id`

#### Update a Record
`PUT /api/:id`

#### Delete a Record
`DELETE /api/:id`

### Protected Route Example
`GET /protected`

**Headers:**
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

---

## Role-Based Access Control

Add roles to your user model and use the `verifyRole` middleware to restrict access to specific routes.

**Example:**
```javascript
app.get("/admin", authenticateToken(SECRET_KEY), verifyRole("admin"), (req, res) => {
  res.status(200).send("Welcome Admin!");
});
```

---

## Environment Variables

Create a `.env` file in your project root:

```env
PORT=5000
DB_URI=your_database_uri
SECRET_KEY=your_secret_key
```

---

## Keywords
- `auth`
- `jwt`
- `mern`
- `express`
- `authentication`
- `cli`
- `role-based-access-control`
- `crud`

---

## License

MIT License

---

## Author

Created by **Abhishek Shrivastav**. Feel free to reach out or contribute to this project!

