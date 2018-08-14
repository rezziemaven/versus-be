const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/user.controller');
const leagueController = require('./controllers/league.controller');

router
  .get('/users/:id', userController._getUser)
  .get('/:cityName/leagues', leagueController._getLeagues)
  .get('/:cityName/leagues/:leagueId', leagueController._getLeague)
  .post('/', () => {});

module.exports = router;
