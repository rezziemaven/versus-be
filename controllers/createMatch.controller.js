const createMatchModel = require('../models/createMatch.model');

exports._postMatch = async (ctx) => {
  try {
    const data = await createMatch._post();
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
