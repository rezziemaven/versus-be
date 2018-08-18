const createMatchModel = require('../models/createMatch.model');

exports.postMatch = async (ctx) => {
  try {
    const data = await createMatch.post();
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
