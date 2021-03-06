'use strict';

const conn = require('../db');
const { statsQuery } = require('../helpers/stats.helper');

exports.insert = (id) => {
  return new Promise ((resolve, reject) => {
    const sql = `INSERT INTO stats SET ?`;
    conn.query(sql, [id], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.update = (match) => {
  return new Promise ((resolve, reject) => {
    const sql = statsQuery(match.user1.score,match.user2.score);
    conn.query(sql,[match.user1.user_id,match.user2.user_id,match.user1.user_id,match.user2.user_id,match.user1.user_id,match.user2.user_id,match.league_id], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};