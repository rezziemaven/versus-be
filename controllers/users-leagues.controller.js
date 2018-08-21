'use strict';

const ulModel = require('../models/users-leagues.model');
const statsModel = require('../models/stats.model');

exports.join = async (ctx) => {
  try {
    const { insertId } = await ulModel.insert(ctx.request.body);
    await statsModel.insert({users_leagues_id: insertId});
    const [result] = await ulModel.getOne(insertId);
    ctx.body = {
      user_id: result.user_id,
      league_id: result.league_id,
      sport_name: result.sport_name,
      data: {
        current_elo: result.current_elo,
        matches_played: result.matches_played,
        matches_won: result.matches_won,
        matches_lost: result.matches_lost,
        matches_drawn: result.matches_drawn,
        elo_history: [
        {date: result.date_joined, score: result.initial_elo}
      ]
      },

    }
    ctx.status = 201;
  }
  catch (e) {
    ctx.body = {Error: e};
    ctx.status = 400;
  }
};

exports.setNewElo = async (ctx, next) => {
  try {
    await ulModel.updateElo(ctx.request.body);
    return next();
  }
  catch (e) {
    ctx.body = {Error: e};
    ctx.status = 400;
  }
};
