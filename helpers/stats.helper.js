'use strict';

const user1WinsQuery = `
  UPDATE stats
    LEFT JOIN users_leagues USING (users_leagues_id)
    SET matches_played =  case when user_id = ? then matches_played+1
                               when user_id = ? then matches_played+1
                               else matches_played
                          end,
        matches_won = case when user_id = ? then matches_won+1
                           else matches_won
                      end,
        matches_lost = case when user_id = ? then matches_lost+1
                            else matches_lost
                       end
    WHERE user_id in (?, ?) AND league_id = ?`;

const user1LosesQuery = `
  UPDATE stats
    LEFT JOIN users_leagues USING (users_leagues_id)
    SET matches_played =  case when user_id = ? then matches_played+1
                               when user_id = ? then matches_played+1
                               else matches_played
                          end,
        matches_lost = case when user_id = ? then matches_lost+1
                            else matches_lost
                       end,
        matches_won = case when user_id = ? then matches_won+1
                           else matches_won
                      end
    WHERE user_id in (?, ?) AND league_id = ?`;

const user1TiesQuery = `
  UPDATE stats
    LEFT JOIN users_leagues USING (users_leagues_id)
    SET matches_played =  case when user_id = ? then matches_played+1
                               when user_id = ? then matches_played+1
                               else matches_played
                          end,
        matches_drawn =  case when user_id = ? then matches_drawn+1
                               when user_id = ? then matches_drawn+1
                               else matches_drawn
                          end
    WHERE user_id in (?, ?) AND league_id = ?`;

exports.statsQuery = (user1Score, user2Score) => {
  if (user1Score > user2Score) return user1WinsQuery;
  else if (user1Score < user2Score) return user1LosesQuery;
  else return user1TiesQuery;
}

// steps to update stats for each player:
// 1. join users_leagues and stats tables
// 2. update stats table where users_leagues_id matches that belonging to user1_id
// 3. update stats table where users_leagues_id matches that belonging to user2_id

// USE SCORES TO SEE HOW TO UPDATE THE TABLE.
// IF P1SCORE > P2SCORE THEN INCR P1 MATCHES WON AND INCR P2 MATCHES LOST
// IF P1SCORE < P2SCORE THEN INCR P1 MATCHES LOST AND INCR P2 MATCHES WON
// IF P1SCORE = P2SCORE THEN INCR P1 MATCHES DRAWN AND INCR P2 MATCHES DRAWN
// FOR BOTH PLAYERS INCR MATCHES PLAYED