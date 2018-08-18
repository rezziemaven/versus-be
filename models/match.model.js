'use strict';

const conn = require('../db');
const { setWinner } = require('../helpers/winner.helper');
const { calculateElo } = require('../helpers/elo.helper');

exports.getAll = (userId, cityName) => {
  return new Promise ((resolve, reject) => {
    const sql = `
    SELECT matches.match_id, a.user_id as user1_id, b.user_id as user2_id,
    matches.user1_score, matches.user2_score, matches.user1_new_elo, matches.user2_new_elo,
    matches.match_datetime, matches.location, c.user_id as winner_id,
    d.username as username_1, e.username as username_2, matches.status,
    a.league_id, sports.sport_name FROM matches
      INNER JOIN users_leagues a ON matches.users_leagues_1_id = a.users_leagues_id
      INNER JOIN users_leagues b ON matches.users_leagues_2_id = b.users_leagues_id
      LEFT JOIN users_leagues c ON matches.winner_id = c.users_leagues_id
      INNER JOIN users d ON a.user_id = d.user_id
      INNER JOIN users e ON b.user_id = e.user_id
      INNER JOIN leagues ON a.league_id = leagues.league_id OR b.league_id = leagues.league_id
      INNER JOIN cities USING (city_id)
      INNER JOIN sports USING (sport_id)
      WHERE d.user_id = ? OR e.user_id = ? AND cities.city_name = ?`;
    conn.query(sql, [userId, userId, cityName], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.getOne = (matchId) => {
  return new Promise ((resolve, reject) => {
    const sql = `
    SELECT matches.match_id, a.user_id as user1_id, b.user_id as user2_id,
    matches.user1_score, matches.user2_score, matches.user1_new_elo, matches.user2_new_elo,
    matches.match_datetime, matches.location, c.user_id as winner_id,
    d.username as username_1, e.username as username_2, matches.status,
    a.league_id, sports.sport_name FROM matches
      INNER JOIN users_leagues a ON matches.users_leagues_1_id = a.users_leagues_id
      INNER JOIN users_leagues b ON matches.users_leagues_2_id = b.users_leagues_id
      LEFT JOIN users_leagues c ON matches.winner_id = c.users_leagues_id
      INNER JOIN users d ON a.user_id = d.user_id
      INNER JOIN users e ON b.user_id = e.user_id
      INNER JOIN leagues ON a.league_id = leagues.league_id OR b.league_id = leagues.league_id
      INNER JOIN cities USING (city_id)
      INNER JOIN sports USING (sport_id)
      WHERE match_id = ?`;
    conn.query(sql, [matchId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.update = (matchId, action) => {
  return new Promise ((resolve, reject) => {
    const sql = `UPDATE matches
                  SET status = ?
                  WHERE match_id = ? LIMIT 1`;
    conn.query(sql, [action, matchId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.updateDetails = (matchId, match) => {
  return new Promise ((resolve, reject) => {
    const sql = `UPDATE matches
                  SET match_datetime = ?, location = ?
                  WHERE match_id = ? LIMIT 1`;
    conn.query(sql, [match.match_datetime, match.location, matchId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.updateFinish = (matchId, match, winner = '') => {
  const result = calculateElo(match.user1.old_elo, match.user2.old_elo,match.user1.score,match.user2.score);
  winner = setWinner(match.user1.score,match.user2.score);
  return new Promise ((resolve, reject) => {
    const sql = `UPDATE matches
                  SET user1_score = ?, user2_score = ?,
                      user1_new_elo = ?, user2_new_elo = ?,
                      winner_id = ${winner}
                  WHERE match_id = ? LIMIT 1`;
    conn.query(sql, [match.user1.score, match.user2.score,
      result.user1_newElo, result.user2_newElo, matchId],
      (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};