// Middleware to check roles
const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
      try {
        // Assuming req.user contains user info after JWT verification
        const userRole = req.user.role; 
  
        // Check if user's role is in the allowed roles
        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ message: "Access denied" });
        }
  
        next(); // User has access
      } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
      }
    };
  };
  
  module.exports = verifyRole;
  