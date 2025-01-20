const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function setupAuth(UserModel, secretKey) {
    if (!UserModel || !secretKey) {
        throw new Error("Model and secretKey are required!");
    }

    const router = express.Router();

    // Sign-up route
    router.post("/", async (req, res) => {
        const { action, username, password, ...extraData } = req.body;

        if (!action || !username || !password) {
            return res.status(400).json({ error: "Action, username, and password are required!" });
        }

        try {
            if (action === "signup") {
                // Check if user already exists
                const existingUser = await UserModel.findOne({ username });
                if (existingUser) {
                    return res.status(400).json({ error: "Username already exists!" });
                }

                // Hash password and save user
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new UserModel({ username, password: hashedPassword, ...extraData });
                await newUser.save();
                res.status(201).json({ message: "User created successfully!" });
            } else if (action === "login") {
                // Find user and validate password
                const user = await UserModel.findOne({ username });
                if (!user) {
                    return res.status(404).json({ error: "User not found!" });
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ error: "Invalid credentials!" });
                }

                // Generate JWT token
                const token = jwt.sign(
                    { id: user._id, username: user.username },
                    secretKey,
                    { expiresIn: "1h" }
                );
                res.status(200).json({ message: "Login successful!", token });
            } else {
                res.status(400).json({ error: "Invalid action!" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = setupAuth;
