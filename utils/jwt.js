const jwt = require("jsonwebtoken");

function generateToken(payload, secretKey, options = {}) {
    return jwt.sign(payload, secretKey, options);
}

function verifyToken(token, secretKey) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        throw new Error("Invalid or expired token!");
    }
}

module.exports = { generateToken, verifyToken };
