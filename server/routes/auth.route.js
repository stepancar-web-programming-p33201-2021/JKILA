const { Router } = require('express');
const config = require('config');

const router = Router();

/* router.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
}); */

module.exports = router;
