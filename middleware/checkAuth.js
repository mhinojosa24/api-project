const jwt = require('jsonwebtoken');
const User = require('../models/user');
var checkAuth = (req, res, next) => {
  console.log('Checking authentication');
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
    return res.status(401).send('Please log in.');
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, {complete: true}) || {};
    req.user = decodedToken.payload;
    User.findById(decodedToken.payload._id).then((user) => {
        req.user = user;
        next();
    })
  }
  next();
};

module.exports = checkAuth;
