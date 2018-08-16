const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/user.controller');
const leagueController = require('./controllers/league.controller');
const matchController = require('./controllers/match.controller');

router
  .get('/users/:id', userController._getUser)
  .get('/:cityName/leagues', leagueController._getLeagues)
  .get('/:cityName/leagues/:leagueId', leagueController._getLeague)
  .get('/users/:userId/:cityName/matches', matchController._getMatches)
  .put('/matches/:matchId/:action', matchController._changeStatus);

module.exports = router;
