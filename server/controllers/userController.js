const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customError = require('../error/customError');
const config = require('../config/default.json');
const { User } = require('../models/models');

const generateJwt = (id, username, role) => jwt.sign(
  { id, username, role },
  config.SECRET_KEY,
  { expiresIn: '24h' },
);

async function registration(req, res, next) {
  const {
    username, password, role, fName, lName,
  } = req.body;
  if (!username || !password || !fName || !lName) {
    return next(customError.badRequest('Некорректный вводные данные'));
  }
  const candidate = await User.findOne({ where: { username } });
  if (candidate) {
    return next(customError.badRequest('Пользователь с таким username уже существует'));
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({
    username, role, password: hashPassword, first_name: fName, last_name: lName,
  });
  const token = generateJwt(user.id, user.username, user.role);
  return res.json({ token });
}

async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return next(customError.badRequest('Пользователь не найден'));
  }
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(customError.badRequest('Неверный пароль'));
  }
  const token = generateJwt(user.id, user.username, user.role);
  return res.json({ token });
}

async function check(req, res, next) {
  const token = generateJwt(req.user.id, req.user.username, req.user.role);
  return res.json({ token });
}

module.exports = {
  registration,
  login,
  check,
};
