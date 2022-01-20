const { Sequelize } = require('sequelize');
const config = require('config');

module.exports = new Sequelize(
  config.get('db_name'),
  config.get('db_user'),
  config.get('db_password'),
  {
    dialect: 'postgres',
    host: config.get('db_host'),
    port: config.get('db_port'),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  },
);

// module.exports = new Sequelize(
//   process.env.dbName || 'jkila',
//   process.env.dbUser || 'postgres',
//   process.env.dbPassword || '789456123',
//   {
//     dialect: 'postgres',
//     host: process.env.dbHost || 'localhost',
//     port: process.env.dbPort || '5432',
//   },
// );
