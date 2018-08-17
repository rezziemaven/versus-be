'use strict';

exports.setWinner = (user1Score, user2Score) => {
  if (user1Score > user2Score) return 'matches.users_leagues_1_id';
  else if (user1Score < user2Score) return 'matches.users_leagues_2_id';
  else return 'NULL';
}