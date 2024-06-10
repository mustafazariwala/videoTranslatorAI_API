const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({
      message: 'Token is required for authentication'
    });
  }
  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Invalid Token'
      });
    }
    req.user = decoded;
    next();
  });
};