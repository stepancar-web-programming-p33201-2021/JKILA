const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const customError = require('../error/customError');

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return next(customError.unAuthorized('Не авторизован1'));
      }
      const decoded = jwt.verify(token, config.SECRET_KEY);
      if (decoded.role !== role) {
        return next(customError.forbidden('Нет доступа'));
      }
      req.user = decoded;
      next();
    } catch (e) {
      return next(customError.unAuthorized('Не авторизован2'));
    }
  };
};
