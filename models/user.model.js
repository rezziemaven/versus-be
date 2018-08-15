'use strict';

const conn = require('../db');
let sql ='';

//Get all topics from DB
exports._get = (id) => {
  return new Promise ((resolve, reject) => {
    sql = `SELECT * FROM stats INNER JOIN users_leagues USING (user_id) INNER JOIN users USING (user_id) INNER JOIN matches ON users_leagues.users_leagues_id = matches.user1_id WHERE user_id=3 `;
    conn.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports._post = () => {
  return new Promise ((resolve, reject) => {
    sql = 'INSERT INTO user (user_id, first_name, username, email, image_path) VALUES ()';
    conn.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
