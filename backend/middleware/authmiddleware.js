// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    
    // Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Attach the user ID to the request object
        req.user = { id: decoded.id }; // Assuming the token contains the user ID
        // console.log(req.user);
        
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;