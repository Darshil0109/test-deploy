const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    req.user = decoded; // Add user data to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token, access denied.' });
  }
};

module.exports = authMiddleware;
