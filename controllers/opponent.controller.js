const opponentModel = require('../models/opponent.model.js')

exports.getOpponent = async (ctx) => {
  try {
    const data = await opponentModel.get(ctx.params.userId, ctx.params.leagueId);
    console.log(data);
    if(data.length) {
      ctx.body = data.reduce((accum, el) => {

        let currentUser = ctx.params.userId === el.user1_id ? 1 : 2;

        accum.matches_history = accum.matches_history.concat({
          score: `${el.user1_score} - ${el.user2_score}`,

        })

        return accum
      },{
        user_id:data[0].user_id,
        username:data[0].username,
        score:data[0].current_elo,
        image_path:data[0].user_image_path,
        matches_won:data[0].matches_won,
        matches_lost:data[0].matches_lost,
        matches_history: []
      });

      ctx.status = 201;
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
