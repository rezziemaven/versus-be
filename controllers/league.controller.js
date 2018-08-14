'use strict';

const leagueModel = require('../models/league.model');

exports._getLeagues = async (ctx) => {
  try {
    ctx.body = await leagueModel._getAll(ctx.params.cityName);
    console.log(ctx.body);
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}