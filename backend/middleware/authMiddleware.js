
const jwt = require('jsonwebtoken');
const User = require('../models/User');



const protect = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
};


module.exports = { protect };
