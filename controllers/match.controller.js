'use strict';

const matchModel = require('../models/match.model');

exports._getMatches = async (ctx) => {
  try {
    const matches = await matchModel._getAll(ctx.params.userId,ctx.params.cityName);
    ctx.body = await matches.reduce((acc,match) => {
      acc.push ({
        match_id: match.match_id,
        league_id: match.league_id,
        sport_name: match.sport_name,
        user1: {
          user_id: match.user1_id,
          username: match.username_1,
          score: match.user1_score
        },
        user2: {
          user_id: match.user2_id,
          username: match.username_2,
          score: match.user2_score
        },
        status: match.status,
        winner_id: match.winner_id
      });
      return acc;
    },[])
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};

exports._changeStatus = async (ctx) => {
  try {
    ctx.body = await matchModel._update(ctx.params.matchId, (ctx.params.action+'ed').toUpperCase());
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};
