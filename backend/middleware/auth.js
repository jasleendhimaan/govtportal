const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, authorization denied' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    if (!verified) {
      return res.status(401).json({ message: 'Token verification failed, authorization denied' });
    }

    req.userId = verified.userId;
    req.userRole = verified.role;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminAuth = (req, res, next) => {
  if (!req.userId || req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Administrator only.' });
  }
  next();
};

const officerAuth = (req, res, next) => {
  if (!req.userId || (req.userRole !== 'officer' && req.userRole !== 'admin')) {
    return res.status(403).json({ message: 'Access denied. Officer or Admin only.' });
  }
  next();
};

module.exports = { auth, adminAuth, officerAuth };
