'use strict';

const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/user.controller');
const leagueController = require('./controllers/league.controller');
const sportsController = require('./controllers/sports.controller');
const opponentController = require('./controllers/opponent.controller');
const matchController = require('./controllers/match.controller');
const ulController = require('./controllers/users-leagues.controller');
const statsController = require('./controllers/stats.controller');
const locationController = require('./controllers/location.controller');

router
  .get('/users/:id', userController.getUser)
  .post('/users', userController.postUser)
  .get('/login', userController.login, userController.getUser)
  .get('/sports', sportsController.getSports)
  .get('/:cityName/leagues', leagueController.getLeagues)
  .get('/:cityName/leagues/:leagueId', leagueController.getLeague)
  .post('/:cityName/leagues/:leagueId/join', ulController.join)
  .get('/opponent/:leagueId/:userId', opponentController.getOpponent)
  .post('/versus', matchController.createMatch)
  .get('/users/:userId/:cityName/matches', matchController.getMatches)
  .post(
    '/matches/:matchId/set',
    matchController.setDetails,
    matchController.getMatch
  )
  .put(
    '/matches/:matchId/:action',
    matchController.changeStatus,
    matchController.getMatch
  )
  .post(
    '/matches/:matchId/:action',
    matchController.changeStatus,
    ulController.setNewElo,
    statsController.updateStats,
    matchController.finishMatch,
    matchController.getMatch
  )
  .post('/requestLocation/', locationController.getLocation);

module.exports = router;
