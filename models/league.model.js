'use strict';

const conn = require('../db');

exports.getAll = (cityName) => {
  return new Promise ((resolve, reject) => {
    const sql = `
      SELECT leagues.league_id, sports.sport_id, sports.sport_name, sports.sport_image_path
        FROM leagues
          INNER JOIN cities USING (city_id)
          INNER JOIN sports USING (sport_id)
        WHERE cities.city_name = ?`;
    conn.query(sql, [cityName], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.getOne = (leagueId) => {
  return new Promise ((resolve, reject) => {
    const sql = `
      SELECT leagues.league_id, sports.sport_id, sports.sport_name, users.user_id, users.username, users_leagues.elo_rating, users.user_image_path
      FROM leagues
        INNER JOIN users_leagues USING (league_id)
        INNER JOIN cities USING (city_id)
        INNER JOIN sports USING (sport_id)
        INNER JOIN users USING (user_id)
      WHERE leagues.league_id = ?
      ORDER BY users_leagues.elo_rating DESC`;
    conn.query(sql, [leagueId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};