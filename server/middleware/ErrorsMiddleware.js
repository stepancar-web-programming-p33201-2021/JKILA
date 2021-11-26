const Errors = require('../error/customError');

module.exports = function (e, req, res, next) {
  if (e instanceof Errors) {
    return res.status(e.status).json({ message: e.message });
  }
  return res.status(500).json({ message: 'Неизвестная ошибка сервера' });
};
