'use strict';

const conn = require('../db');
let sql ='';

//Get all topics from DB
exports._get = () => {
  return new Promise ((resolve, reject) => {
    sql = 'select * from stats inner join users_leagues using ( user_id) inner join users using (user_id);';
    conn.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};