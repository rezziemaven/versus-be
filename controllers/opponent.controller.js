const opponentModel = require('../models/opponent.model.js')

exports.getOpponent = async (ctx) => {
  try {
    const data = await opponentModel.get(ctx.params.userId, ctx.params.leagueId);
    console.log(data);
    if(data.length) {
      ctx.body = data.reduce((accum, el) => {

        const currentUser = ctx.params.userId == el.user1_id ? 1 : 2;
        const resultMatch = el[`user${currentUser}_id`] == el.winner_id ? "WON" : "LOST";

        accum.user_id = el[`user${currentUser}_id`];
        accum.username = el[`username_${currentUser}`];
        accum.image_path = el[`user_image_path_${currentUser}`];

        if (el.matches_played && el.status === 'FINISHED') {
          accum.match_history = accum.match_history.concat({
            result: resultMatch,
            score: `${el.user1_score} - ${el.user2_score}`,
            elo:el[`user${currentUser}_new_elo`]
          })
        }

        return accum
      },{
        user_id:data[0].user_id,
        username:data[0].username,
        score:data[0].current_elo,
        image_path:data[0].user_image_path,
        matches_won:data[0].matches_won,
        matches_lost:data[0].matches_lost,
        match_history: []
      });

      ctx.status = 201;
    }
    else {
      ctx.body = {error:"No user or league"};
      ctx.status = 400;
    }
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}
