const express = require('express');
const path = require('path');
const cors = require('cors');

const pool = require('./libs/db');
const models = require('./models/models');
const router = require('./routes/index');
const error = require('./middleware/ErrorsMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(error);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Works' });
});

const start = async () => {
  try {
    await pool.authenticate();
    await pool.sync();
    app.listen(5000, () => {
      // eslint-disable-next-line no-console
      console.log('server has started on port 5000');
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

start();
