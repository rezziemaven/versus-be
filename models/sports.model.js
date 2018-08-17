'use strict';

const conn = require('../db');

exports.get = () => {
  return new Promise ((resolve, reject) => {
    const sql = `SELECT * FROM sports`;
    conn.query(sql,(err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};
