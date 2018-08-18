'use strict';

const ulModel = require('../models/users-leagues.model');

exports.setNewElo = async (ctx, next) => {
  try {
    await ulModel.updateElo(ctx.request.body);
    return next();
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};