'use strict';

const conn = require('../db');
const { calculateElo } = require('../helpers/elo.helper');

exports.getOne = (id) => {
  return new Promise ((resolve, reject) => {
    const sql = `
      SELECT * FROM users_leagues
        INNER JOIN stats USING (users_leagues_id)
        INNER JOIN leagues USING (league_id)
        INNER JOIN sports USING (sport_id)
        WHERE users_leagues_id = ?`;
    conn.query(sql, [id], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

exports.insert = (user) => {
  return new Promise ((resolve, reject) => {
    const sql = `
      INSERT INTO users_leagues
      SET ?, date_joined = NOW(), current_elo = ?`;
    conn.query(sql, [user, user.initial_elo], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.updateElo = (match) => {
  const result = calculateElo(match.user1.old_elo, match.user2.old_elo,match.user1.score,match.user2.score);
  return new Promise ((resolve, reject) => {
    const sql = `
      UPDATE users_leagues
        SET elo_rating =  case when user_id = ? then ?
                              when user_id = ? then ?
                              else elo_rating
                          end
        WHERE user_id in (?, ?) AND league_id = ?`;
    conn.query(sql, [match.user1.user_id, result.user1_newElo,
      match.user2.user_id, result.user2_newElo,
      match.user1.user_id, match.user2.user_id, match.league_id], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};