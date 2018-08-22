'use strict';

const conn = require('../db');

exports.get = (userId, leagueId) => {
  return new Promise ((resolve, reject) => {
    const sql = `  SELECT matches.match_id, a.user_id as user1_id,
      b.user_id as user2_id,
      a.current_elo,
      matches.user1_score, matches.user2_score, matches.user1_new_elo, matches.user2_new_elo,
      c.user_id as winner_id, d.username as username_1,
      d.first_name as first_name_1, d.last_name as last_name_1, d.email as email_1, d.user_image_path as user_image_path_1,
      e.first_name as first_name_2, e.last_name as last_name_2, e.email as email_2, e.user_image_path as user_image_path_2,
      matches.status, a.league_id, sports.sport_name, stats.matches_played, stats.matches_won, stats.matches_lost,
      stats.matches_drawn, matches.match_datetime
      FROM matches
RIGHT OUTER JOIN users_leagues a ON (matches.users_leagues_1_id = a.users_leagues_id OR matches.users_leagues_2_id = a.users_leagues_id)
LEFT JOIN users_leagues b ON ((matches.users_leagues_1_id = b.users_leagues_id OR matches.users_leagues_2_id = b.users_leagues_id) AND b.user_id != a.user_id)
LEFT JOIN users_leagues c ON matches.winner_id = c.users_leagues_id
LEFT JOIN stats ON a.users_leagues_id = stats.users_leagues_id
INNER JOIN leagues ON a.league_id = leagues.league_id
INNER JOIN sports USING (sport_id)
INNER JOIN users d ON a.user_id = d.user_id
LEFT JOIN users e ON b.user_id = e.user_id
WHERE leagues.league_id = ? AND a.user_id = ?;`;

    conn.query(sql,[leagueId,userId],(err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};
