'use strict';

const leagueModel = require('../models/league.model');

exports._getLeagues = async (ctx) => {
  try {
    ctx.body = await leagueModel._getAll(ctx.params.cityName);
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}

exports._getLeague = async (ctx) => {
  try {
    ctx.body = await leagueModel._getOne(ctx.params.leagueId);
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}