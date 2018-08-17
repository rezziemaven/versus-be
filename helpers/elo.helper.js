'use strict';

const Elo = require('elo-js');
const elo = new Elo();

exports.calculateElo = (p1Elo, p2Elo, p1Score, p2Score, newP1Elo = 0, newP2Elo = 0) => {
  if (p1Score > p2Score) {
    newP1Elo = elo.ifWins(p1Elo,p2Elo);
    newP2Elo = elo.ifLoses(p2Elo,p1Elo);
  }
  else if (p1Score < p2Score) {
    newP1Elo = elo.ifLoses(p1Elo,p2Elo);
    newP2Elo = elo.ifWins(p2Elo,p1Elo);
  }
  else {
    newP1Elo = elo.ifTies(p1Elo,p2Elo);
    newP2Elo = elo.ifTies(p2Elo,p1Elo);
  }

  return {
    user1_newElo: newP1Elo,
    user2_newElo: newP2Elo
  }
};