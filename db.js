'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  insecureAuth: true
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to database.');
});

module.exports = connection;
