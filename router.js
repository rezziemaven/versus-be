const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/user.controller');
const sportsController = require('./controllers/sports.controller');
const opponentController = require('./controllers/opponent.controller');

router
  .get('/users/:id', userController._getUser)
  .post('/users',userController._postUser)
  .get('/sports', sportsController._getSports)
  .get('/opponent/:userId/:leagueId', opponentController._getOpponent);

module.exports = router;
