'use strict';

const leagueModel = require('../models/league.model');

exports._getLeagues = async (ctx) => {
  try {
    const leagues = await leagueModel._getAll(ctx.params.cityName);
    const collection = await leagues.reduce((acc,league) => {
      const {league_id, sport_id, sport_name, ...rest} = league;
      if (!acc.hasOwnProperty(league.league_id)) acc[league.league_id] = [{
        league_id,
        sport_id,
        sport_name,
      }, rest];
      else acc[league.league_id].push(rest);
      return acc;
    },{});
      ctx.body = await Object.values(collection).reduce((acc, entry) => {
      const [leagueData, ...rest] = entry;
      acc.push({
        league_id: leagueData.league_id,
        sport_id: leagueData.sport_id,
        sport_name: leagueData.sport_name,
        users: rest
      })
      return acc;
    },[]);
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}

exports._getLeague = async (ctx) => {
  try {
    const league = await leagueModel._getOne(ctx.params.leagueId);
    ctx.body = await league.reduce((acc, entry) => {
      const {league_id, sport_id, name, ...rest} = entry;
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