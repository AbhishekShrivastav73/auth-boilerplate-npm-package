---
# **Auth Boilerplate for MERN Stack**

A simple, customizable authentication boilerplate designed for **MERN Stack** applications. This package provides pre-built routes for **login** and **signup**, along with JWT-based authentication and bcrypt password hashing.

Perfect for developers who want to quickly implement authentication without manually writing all the boilerplate code.
---

## 🚀 **Features**

- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Password Hashing**: Uses bcrypt for securely storing passwords.
- **Pre-built Routes**: Easy-to-use login and signup routes.
- **Customizable**: Simple to integrate with your existing MongoDB `User` model.
- **Minimal Setup**: Just install and configure your MongoDB model and secret key.
- **Protected Routes**: Implement protected routes with middleware functions that verify the JWT token passed in the request headers. This ensures that only authenticated users can access certain routes.

---

## ⚡ **Installation**

To install the package and its dependencies, run the following commands:

### Step 1: Install the package

```bash
npm install auth-boilerplate
```

### Step 2: Install additional dependencies (if not already installed)

Since the package uses `express`, `jsonwebtoken`, and `bcrypt`, make sure these are also installed in your project.

```bash
npm install express jsonwebtoken bcrypt
```

---

## 🛠️ **Usage**

Once installed, the package allows you to quickly set up authentication routes for **login** and **signup** in just a few lines of code.

### Step 1: Set up the authentication routes

1. **Import the package** into your Express app.

2. **Define a Mongoose User model** that fits your schema (this package is compatible with any MongoDB model).

3. **Set up the authentication routes** using the `setupAuth` function, passing in your User model and a secret key for JWT.

```javascript
// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const setupAuth = require("auth-boilerplate");

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Define Mongoose User Model (modify according to your needs)
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Set up authentication routes
const authRoutes = setupAuth(User, "your_secret_key");

// Use the authentication routes in your app
app.use("/auth", authRoutes);

// Protected Route Example
app.get("/protected", authenticateToken("my_secret_key"), (req, res) => {
  res.json({ message: "This is a protected route!", user: req.user });
});

// Connect to MongoDB (replace with your own connection string)
mongoose
  .connect("mongodb://localhost:27017/yourdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### Step 2: Test the Authentication Endpoints

Your authentication routes will now be available under `/auth`.

- **POST /auth/signup**: To create a new user.
- **POST /auth/login**: To log in a user.

---

## 🔑 **Authentication Flow**

### 1. **Signup**

To create a new user, send a `POST` request to `/auth/signup` with the following data:

- **Request Body**:

  ```json
  {
    "username": "user123",
    "password": "securepassword",
    "email": "user123@example.com"
  }
  ```

- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### 2. **Login**

To log in, send a `POST` request to `/auth/login` with the following data:

- **Request Body**:

  ```json
  {
    "username": "user123",
    "password": "securepassword"
  }
  ```

- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

You can use this **JWT token** for future authenticated requests by including it in the `Authorization` header:

```bash
Authorization: Bearer your_jwt_token
```

### Accessing Protected Routes

The package comes with a middleware function called `authenticateToken` that you can use to protect routes. This middleware function verifies the JWT token passed in the `Authorization` header of the request. If the token is valid, the request is allowed to continue; otherwise, it returns a 401 Unauthorized response

- **Authorization Header**:

  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```

  ```javascript
  // Protected Route Example
  app.get("/protected", authenticateToken("my_secret_key"), (req, res) => {
    res.json({ message: "This is a protected route!", user: req.user });
  });
  ```



---


## 💡 **Customization**

You can easily customize the authentication flow to match your project's requirements.

- **User Schema**: Modify the `User` schema to include other fields like email, profile picture, etc.
- **Secret Key**: Change the secret key (`'your_secret_key'`) to any secret string for JWT signing.
- **Error Handling**: Customize the error handling as per your app's structure.

---

## 📚 **Contributing**

Contributions are welcome! Feel free to submit pull requests or open issues if you find any bugs or want to suggest improvements.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Submit a pull request.

---

## 📑 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### **Contact**:

If you have any questions or need further assistance, feel free to reach out!

---

### **Why Use Auth Boilerplate?**

- **Simplicity**: No need to set up complex authentication mechanisms. Just install the package and you're ready to go!
- **Security**: Built-in JWT-based authentication and bcrypt hashing make this solution secure and scalable.
- **Customizable**: You can easily tailor this boilerplate to fit your specific needs.

---

**Enjoy building your MERN stack application with ease!** 😊

---

