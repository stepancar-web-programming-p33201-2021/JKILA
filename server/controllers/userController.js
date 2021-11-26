async function registration(req, res) {
  res.json({ message: 'user.registration' });
}

async function login(req, res) {
  res.json({ message: 'user.login' });
}

async function check(req, res) {
  const { id } = req.query;
  res.json(id);
}

module.exports = {
  registration,
  login,
  check,
};
