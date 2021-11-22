const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const pool = require('./db');

const start = async () => {
  try {
    await pool.authenticate();
    await pool.sync();
  } catch (e) {
    console.log(e);
  }
};

// middleware
app.use(cors());
app.use(express.json()); // req.body
// app.use('/api/auth', require('/routes/auth.route'));

app.listen(5000, () => {
  console.log('server has started on port 5000');
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../'));
});

start();
