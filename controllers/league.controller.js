'use strict';

const leagueModel = require('../models/league.model');

exports.getLeagues = async (ctx) => {
  try {
    ctx.body = await leagueModel.getAll(ctx.params.cityName);
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}

exports.getLeague = async (ctx) => {
  try {
    const league = await leagueModel.getOne(ctx.params.leagueId);
    ctx.body = await league.reduce((acc, entry) => {
      const {league_id, sport_id, sport_name, ...rest} = entry;
      acc.users.push(rest);
      return acc;
    },{
      league_id: league[0].league_id,
      sport_id: league[0].sport_id,
      sport_name: league[0].sport_name,
      users:[]
    });
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}