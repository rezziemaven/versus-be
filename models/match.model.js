'use strict';

const conn = require('../db');

exports._getAll = (userId, cityName) => {
  return new Promise ((resolve, reject) => {
    const sql = `
    SELECT matches.match_id, a.user_id as user1_id, b.user_id as user2_id,
    matches.user1_score, matches.user2_score, c.user_id as winner_id,
    d.username as username_1, e.username as username_2,
    matches.status, a.league_id,
    sports.sport_name FROM matches
    INNER JOIN users_leagues a ON matches.users_leagues_1_id = a.users_leagues_id
    INNER JOIN users_leagues b ON matches.users_leagues_2_id = b.users_leagues_id
    LEFT JOIN users_leagues c ON matches.winner_id = c.users_leagues_id
    INNER JOIN users d ON a.user_id = d.user_id
    INNER JOIN users e ON b.user_id = e.user_id
    INNER JOIN leagues ON a.league_id = leagues.league_id OR b.league_id = leagues.league_id
    INNER JOIN cities USING (city_id)
    INNER JOIN sports USING (sport_id)
    WHERE d.user_id = ${userId} OR e.user_id = ${userId} AND cities.city_name ='${cityName}'`;
    conn.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};