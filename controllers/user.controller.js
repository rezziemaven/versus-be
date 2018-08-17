const userModel = require('../models/user.model');

exports._getUser = async (ctx) => {
  try {
    const data = await userModel._get(ctx.params.id);

    if (data.length) {
      ctx.body = data.reduce((accum, el)=> {
        if (!accum.stats.find(stat => stat.data.stats_id === el.stats_id)) {
          accum.stats = accum.stats.concat({
            "name":el.sport_name,
            "league_id":el.league_id,
            data: {
              stats_id: el.stats_id,
              matches_played: el.matches_played,
              matches_won: el.matches_won,
              matches_lost: el.matches_lost
            }
          });
        }

        accum.matches = accum.matches.concat({
          match_id: el.match_id,
          users_leagues_1_id:el.users_leagues_1_id,
          users_leagues_2_id:el.users_leagues_2_id,
          user1_score:el.user1_score,
          user2_score:el.user2_score,
          status:el.status,
          winner_id:el.winner_id
        })

        return accum
      }, {
        user: {
          user_id: data[0].user_id,
          first_name: data[0].first_name,
          last_name:  data[0].last_name,
          total_score:data[0].elo_rating,
          username: data[0].username,
          email: data[0].email,
          city_name: data[0].city_name,
          image_path: data[0].image_path
        },
        stats: [],
        matches: []
      })
      ctx.status = 200;
    }
    else {
      ctx.status = 404;
    }
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}

exports._postUser = async (ctx) => {
  try {

    const request = await userModel._post(ctx.request.body);
    const response = await userModel._postResponse(request.insertId)

    if(response.length){
      ctx.body = response;
      ctx.status = 200;
    }
    else {
      ctx.body = request;
      ctx.status = 400;
    }
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}
