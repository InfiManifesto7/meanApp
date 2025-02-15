const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

// Middleware to check if user is logged in
const requiresLogin = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = await UserModel.findById(decoded._id).select('-password'); // Exclude password field

        if (!req.user) {
            return res.status(403).json({ message: 'Invalid user' });
        }

        next(); // Proceed to the next middleware or route
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};


const requiresAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
};

module.exports = { requiresLogin, requiresAdmin };
