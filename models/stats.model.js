'use strict';

const conn = require('../db');

exports.insert = (id) => {
  return new Promise ((resolve, reject) => {
    const sql = `INSERT INTO stats SET ?`;
    conn.query(sql, [id], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};