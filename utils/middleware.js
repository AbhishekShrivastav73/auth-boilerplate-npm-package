const jwt = require('jsonwebtoken');

const authenticateToken = (secretKey) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; 
        if (!token) return res.status(401).json({ error: 'Access denied!' });

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Invalid token!' });

            req.user = decoded;
            next();
        });
    };
};

module.exports = authenticateToken;

