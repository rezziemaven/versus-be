const userModel = require('../models/user.model');

exports._getUser = async (ctx) => {
  try {
    ctx.body = await userModel._get();
    console.log(ctx.body);
    ctx.status = 200;
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
}
