'use strict';

const matchModel = require('../models/match.model');

exports.getMatches = async (ctx) => {
  try {
    const matches = await matchModel.getAll(ctx.params.userId,ctx.params.cityName);
    ctx.body = await matches.reduce((acc,match) => {
      acc.push ({
        match_id: match.match_id,
        league_id: match.league_id,
        sport_name: match.sport_name,
        user1: {
          user_id: match.user1_id,
          username: match.username_1,
          score: match.user1_score,
          new_elo: match.user1_new_elo
        },
        user2: {
          user_id: match.user2_id,
          username: match.username_2,
          score: match.user2_score,
          new_elo: match.user2_new_elo
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

exports.getMatch = async (ctx) => {
  try {
    const match = await matchModel.getOne(ctx.params.matchId);
    ctx.body = {
        match_id: match[0].match_id,
        league_id: match[0].league_id,
        sport_name: match[0].sport_name,
        user1: {
          user_id: match[0].user1_id,
          username: match[0].username_1,
          score: match[0].user1_score,
          new_elo: match[0].user1_new_elo
        },
        user2: {
          user_id: match[0].user2_id,
          username: match[0].username_2,
          score: match[0].user2_score,
          new_elo: match[0].user2_new_elo
        },
        status: match[0].status,
        winner_id: match[0].winner_id
      };
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};


exports.createMatch = async (ctx) => {
  try {
    //ctx.body = await matchModel._update(ctx.params.matchId, (ctx.params.action+'ed').toUpperCase());
    ctx.body = ctx.request.body
    console.log('esisto', ctx.request.body)

exports.changeStatus = async (ctx, next) => {
  try {
    await matchModel.update(ctx.params.matchId, (ctx.params.action+'ed').toUpperCase());
    return next();
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};

exports.finishMatch = async (ctx, next) => {
  try {
    await matchModel.updateFinish(ctx.params.matchId, ctx.request.body);
    return next();
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};

exports.updateWinner = async (ctx, next) => {
  try {
    ctx.body = await matchModel.updateWinner(ctx.params.matchId, ctx.request.body);
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};
