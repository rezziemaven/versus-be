const User = require('../models/user.model');

exports.getUser = async (ctx) => {
  try {
    const data = await User.getUserWithMatchesAndStats(ctx.params.id);
    if (data.length) {
      ctx.body = data.reduce((accum, el, index)=> {

        let currentUser = ctx.params.id == el.user1_id ? 1 : 2;

        accum.user.user_id = el[`user${currentUser}_id`];
        accum.user.first_name = el[`first_name_${currentUser}`];
        accum.user.last_name = el[`last_name_${currentUser}`];
        accum.user.username = el[`username_${currentUser}`];
        accum.user.email = el[`email_${currentUser}`];
        accum.user.image_path = el[`user_image_path_${currentUser}`];

        accum.elo = [...accum.elo,{sport:el.sport_name, date:el.match_datetime, score:el[`user${currentUser}_new_elo`]}]

        accum.stats = {
          ...accum.stats,
          [el.sport_name]: {
            sport_name:el.sport_name,
            league_id:el.league_id,
            data: {
              current_elo:el.current_elo,
              matches_played: el.matches_played,
              matches_won: el.matches_won,
              matches_lost: el.matches_lost,
              matches_drawn:el.matches_drawn,
              elo_history:accum.elo.filter((element) => element.sport === el.sport_name)
            }
          }
        }

        accum.matches = accum.matches.concat({
          match_id: el.match_id,
          sport_name:el.sport_name,
          league_id:el.league_id,
          user1:{
            user_id:el.user1_id,
            username:el.username_1,
            image_path:el.user_image_path_1,
            score:el.user1_score
          },
          user2:{
            user_id:el.user2_id,
            username:el.username_2,
            image_path:el.user_image_path_2,
            score:el.user2_score
          },
          status:el.status,
          winner_id:el.winner_id
        })

        return accum
      }, {
        user: {
          user_id: ctx.params.id,
          first_name: data[0].first_name,
          last_name:  data[0].last_name,
          total_score:0,
          username: data[0].username,
          email: data[0].email,
          city_name: data[0].city_name,
          image_path: data[0].image_path
        },
        stats: {},
        matches: [],
        elo:[]
      })

      delete ctx.body.elo;
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

exports.postUser = async (ctx) => {
  try {

    const request = await User.post(ctx.request.body);
    const response = await User.getUser(request.insertId)

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
