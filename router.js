'use strict';

const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/user.controller');
const leagueController = require('./controllers/league.controller');
const matchController = require('./controllers/match.controller');
const ulController = require('./controllers/users-leagues.controller');
const statsController = require('./controllers/stats.controller');

router
  // .get('/users/:id', userController.getUser)
  .get('/:cityName/leagues', leagueController.getLeagues)
  .get('/:cityName/leagues/:leagueId', leagueController.getLeague)
  .get('/users/:userId/:cityName/matches', matchController.getMatches)
  .post('/matches/:matchId/set', matchController.setDetails, matchController.getMatch)
  .put('/matches/:matchId/:action', matchController.changeStatus, matchController.getMatch)
  .post('/matches/:matchId/:action', matchController.changeStatus, ulController.setNewElo, statsController.updateStats, matchController.finishMatch, matchController.getMatch);

module.exports = router;
