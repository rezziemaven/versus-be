'use strict';

const conn = require('../db');
let sql ='';

exports._getAll = (cityName) => {
  return new Promise ((resolve, reject) => {
    sql = `SELECT leagues.league_id, users_leagues.users_leagues_id, sports.sport_id, sports.name, users.user_id, users.username, users_leagues.elo_rating, users.image_path FROM leagues INNER JOIN users_leagues USING (league_id) INNER JOIN cities USING (city_id) INNER JOIN sports USING (sport_id) INNER JOIN users USING (user_id) WHERE cities.name = '${cityName}' ORDER BY leagues.league_id, users_leagues.elo_rating DESC;`;
    conn.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};