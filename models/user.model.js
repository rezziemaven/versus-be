'use strict';

const conn = require('../db');

exports._get = (id) => {
  return new Promise ((resolve, reject) => {
    const sql = `SELECT * FROM stats
            INNER JOIN users_leagues USING (users_leagues_id)
            INNER JOIN users USING (user_id)
            INNER JOIN matches ON matches.users_leagues_1_id = users_leagues_id OR matches.users_leagues_2_id = users_leagues_id
            INNER JOIN leagues USING (league_id)
            INNER JOIN cities USING (city_id)
            INNER JOIN sports USING (sport_id)
            WHERE users_leagues_id=?`;
    conn.query(sql, [id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

exports._post = (user,ctx) => {
  return new Promise ((resolve, reject) => {
    conn.query('INSERT INTO users SET ?', user , (err, res) => {
      if (err) return resolve(err);
      resolve(res);
    })
  })
};
