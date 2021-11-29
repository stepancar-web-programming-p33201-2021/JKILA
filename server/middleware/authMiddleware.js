const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const customError = require('../error/customError');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(customError.unAuthorized('Не авторизован1'));
    }
    req.user = jwt.verify(token, config.SECRET_KEY);
    next();
  } catch (e) {
    return next(customError.unAuthorized('Не авторизован2'));
  }
};
