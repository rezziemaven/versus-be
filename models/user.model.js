'use strict';

const conn = require('../db');

exports.getUserWithMatchesAndStats = (id) => {
  return new Promise ((resolve, reject) => {
    const sql = `
      SELECT matches.match_id, a.user_id as user1_id,
            b.user_id as user2_id,
            a.current_elo, matches.match_datetime, matches.location,
            matches.user1_score, matches.user2_score, matches.user1_new_elo, matches.user2_new_elo,
            c.user_id as winner_id, d.username as username_1, e.username as username_2,
            d.first_name as first_name_1, d.last_name as last_name_1, d.email as email_1, d.user_image_path as user_image_path_1,
            e.first_name as first_name_2, e.last_name as last_name_2, e.email as email_2, e.user_image_path as user_image_path_2,
            matches.status, a.league_id, sports.sport_name, stats.matches_played, stats.matches_won, stats.matches_lost,
            stats.matches_drawn, cities.city_name
            FROM matches
              RIGHT OUTER JOIN users_leagues a ON (matches.users_leagues_1_id = a.users_leagues_id)
              RIGHT JOIN users_leagues b ON (matches.users_leagues_2_id = b.users_leagues_id)
              LEFT JOIN users_leagues c ON matches.winner_id = c.users_leagues_id
              INNER JOIN stats ON a.users_leagues_id = stats.users_leagues_id
              INNER JOIN leagues ON a.league_id = leagues.league_id
              INNER JOIN cities USING (city_id)
              INNER JOIN sports USING (sport_id)
              INNER JOIN users d ON a.user_id = d.user_id
              LEFT JOIN users e ON b.user_id = e.user_id
            WHERE a.user_id = ? OR b.user_id = ?
            ORDER BY matches.match_datetime ASC;`;

    conn.query(sql, [id, id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

exports.post = (user) => {
  return new Promise ((resolve, reject) => {
    conn.query('INSERT INTO users SET ?', [user] , (err, res) => {
      if (err) return resolve(err);
      resolve(res)
    })
  })
};

exports.getUser = (id) => {
  return new Promise ((resolve, reject) => {
    conn.query('SELECT * FROM users WHERE user_id = ?', [id], (err, res) => {
      if (err) return resolve(err);
      resolve(res)
    })
  })
};

exports.getUserByUsername = (username) => {
  return new Promise ((resolve, reject) => {
    conn.query('SELECT * FROM users WHERE username = ?', [username], (err, res) => {
      if (err) return resolve(err);
      resolve(res)
    })
  })
};
