const customError = require('../error/customError');

async function registration(req, res) {
  res.json({ message: 'user.registration' });
}

async function login(req, res) {
  res.json({ message: 'user.login' });
}

async function check(req, res, next) {
  const { id } = req.query;
  if (!id) {
    return next(customError.badRequest('Не указан ID'));
  }
  res.json(id);
}

module.exports = {
  registration,
  login,
  check,
};
