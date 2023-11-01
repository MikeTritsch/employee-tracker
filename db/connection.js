// const mysql = require('mysql2');
require('dotenv').config();
const util = require('util');

// const db = mysql.createConnection(
//   {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//   },
//   console.log(`Connected to the employee database.`)
// );

// module.exports = db;

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(function (err) {
  if (err) throw err;
});

connection.query = util.promisify(connection.query);

module.exports = connection;