'use strict';

const statsModel = require('../models/stats.model');

exports.updateStats = async (ctx, next) => {
  try {
    await statsModel.update(ctx.request.body);
    return next();
  }
  catch (e) {
    ctx.status = 400;
    throw e;
  }
};