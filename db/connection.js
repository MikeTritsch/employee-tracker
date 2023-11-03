// IMPORTS
require('dotenv').config();
const util = require('util');
const mysql = require("mysql2");

// DB CONNECTION
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// ERR HANDLE
connection.connect(function (err) {
  if (err) throw err;
});

connection.query = util.promisify(connection.query);

// EXPORTS
module.exports = connection;