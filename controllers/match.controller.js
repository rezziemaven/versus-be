'use strict';

const matchModel = require('../models/match.model');
const leagueModel = require('../models/league.model');

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
        match_datetime: match.match_datetime,
        location: match.location,
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
    const id = ctx.params.matchId ? ctx.params.matchId : ctx.match.id;
    const [match] = await matchModel.getOne(id);
    if (match.status === 'FINISHED') ctx.body = {
      match_id: match.match_id,
      league_id: match.league_id,
      sport_name: match.sport_name,
      user1: {
        user_id: match.user1_id,
        username: match.username_1,
        score: match.user1_score,
        elo_diff: match.user1_new_elo - ctx.request.body.user1.old_elo,
        image_path: match.user1_image_path
      },
      user2: {
        user_id: match.user2_id,
        username: match.username_2,
        score: match.user2_score,
        elo_diff: match.user2_new_elo - ctx.request.body.user2.old_elo,
        image_path: match.user2_image_path
      },
      match_datetime: match.match_datetime,
      location: match.location,
      status: match.status,
      winner_id: match.winner_id
    }
    else ctx.body = {
        match_id: match.match_id,
        league_id: match.league_id,
        sport_name: match.sport_name,
        user1: {
          user_id: match.user1_id,
          username: match.username_1,
          score: match.user1_score,
          new_elo: match.user1_new_elo,
          image_path: match.user1_image_path
        },
        user2: {
          user_id: match.user2_id,
          username: match.username_2,
          score: match.user2_score,
          new_elo: match.user2_new_elo,
          image_path: match.user2_image_path
        },
        match_datetime: match.match_datetime,
        location: match.location,
        status: match.status,
        winner_id: match.winner_id
      };
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};

exports.createMatch = async (ctx, next) => {
  try {

    const leagues = await leagueModel.getOne(ctx.request.body.league_id);
    const userLeague1 = leagues.find((league) => league.user_id === ctx.request.body.user1_id);
    const userLeague2 = leagues.find((league) => league.user_id === ctx.request.body.user2_id);
    const postMatch = await matchModel.post(userLeague1.users_leagues_id, userLeague2.users_leagues_id);
    ctx.match = {id: postMatch.insertId};
    return next();

    // if(postMatch.hasOwnProperty('insertId')){
    //   const matchResponse = {
    //     "match_id": postMatch.insertId,
    //     "league_id": userLeague1.league_id,
    //     "sport_name": userLeague1.sport_name,
    //     "user1": {
    //       "user_id": ctx.request.body.user1_id,
    //       "score": null,
    //       "new_elo": null
    //     },
    //     "user2": {
    //       "user_id": ctx.request.body.user2_id,
    //       "score": null,
    //       "new_elo": null
    //     },
    //     "match_datetime": "0000-00-00 00:00:00",
    //     "location": null,
    //     "status": "PENDING",
    //     "winner_id": null
    //   }

    //   ctx.body = matchResponse;
    //   ctx.status = 200;
    // }
    // else {
    //   ctx.body = postMatch;
    //   ctx.status = 400;
    // }
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}

exports.changeStatus = async (ctx, next) => {
  let status;
  switch (ctx.params.action) {
    case 'reject':
      status = 'DENIED';
      break;
    case 'delete':
      status = 'DELETED';
      break;
    default:
      status = (ctx.params.action+'ed').toUpperCase();
  }
  try {
    await matchModel.update(ctx.params.matchId, status);
    return next();
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};

exports.setDetails = async (ctx, next) => {
  try {
    await matchModel.updateDetails(ctx.params.matchId, ctx.request.body);
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
