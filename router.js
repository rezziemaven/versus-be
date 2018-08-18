'use strict';

const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/user.controller');
const leagueController = require('./controllers/league.controller');
const sportsController = require('./controllers/sports.controller');
const opponentController = require('./controllers/opponent.controller');
const createMatchController = require('./controllers/createMatch.controller');
const matchController = require('./controllers/match.controller');
const ulController = require('./controllers/users-leagues.controller');  

router
  .get('/users/:id', userController.getUser)
  .post('/users',userController.postUser)
  .get('/sports', sportsController.getSports)
  .get('/:cityName/leagues', leagueController._getLeagues)
  .get('/:cityName/leagues/:leagueId', leagueController._getLeague)
  .get('/opponent/:userId/:leagueId', opponentController.getOpponent)
  .post('/versus',createMatchController.postMatch)
  .get('/users/:userId/:cityName/matches', matchController.getMatches)
  .put('/matches/:matchId/:action', matchController.changeStatus, matchController.getMatch)
  .post('/matches/:matchId/:action', matchController.changeStatus, ulController.setNewElo, matchController.finishMatch, matchController.getMatch);

module.exports = router;
