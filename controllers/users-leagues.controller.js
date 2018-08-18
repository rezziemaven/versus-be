'use strict';

const ulModel = require('../models/users-leagues.model');

exports.setNewElo = async (ctx, next) => {
  try {
    const result = await ulModel.updateElo(ctx.request.body);
    console.log(result);
    return next();
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};