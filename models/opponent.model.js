'use strict';

const conn = require('../db');

exports._get = (userId, leagueId) => {
  return new Promise ((resolve, reject) => {
    const sql = `SELECT * FROM matches
                 INNER JOIN users_leagues ON users_leagues.users_leagues_id = matches.users_leagues_1_id OR users_leagues.users_leagues_id = matches.users_leagues_2_id
                 INNER JOIN users ON users.user_id = users_leagues.user_id
                 INNER JOIN leagues ON leagues.league_id = users_leagues.league_id
                 INNER JOIN sports ON sports.sport_id = leagues.sport_id
                 INNER JOIN stats ON stats.users_leagues_id = users_leagues.users_leagues_id
                 WHERE users.user_id = ? AND leagues.league_id = ? AND matches.status = "FINISHED"`;

    conn.query(sql,[userId,leagueId],(err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};
