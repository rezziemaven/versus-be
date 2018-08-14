const userModel = require('../models/user.model');

exports._getUser = async (ctx) => {
  try {
    user = await userModel._get();
    console.log(user);
    ctx.status(200).send(user);
  }
  catch (e) {
    ctx.status(400);
    throw e;
  }
}