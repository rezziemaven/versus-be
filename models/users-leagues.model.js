'use strict';

const conn = require('../db');
const { calculateElo } = require('../helpers/elo.helper');

exports.updateElo = (match) => {
  const result = calculateElo(match.user1.old_elo, match.user2.old_elo,match.user1.score,match.user2.score);
  return new Promise ((resolve, reject) => {
    console.log('match is here: ', match);
    const sql = `UPDATE users_leagues
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