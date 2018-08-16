const sportsModel = require('../models/sports.model');

exports._getSports = async (ctx) => {
  try {
    const data = await sportsModel._get();
    if(data.length) {
      ctx.body = data;
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
