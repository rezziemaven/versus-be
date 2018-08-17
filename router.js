const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/user.controller');
const sportsController = require('./controllers/sports.controller');
const opponentController = require('./controllers/opponent.controller');
const createMatchController = require('./controllers/createMatch.controller');

router
  .get('/users/:id', userController.getUser)
  .post('/users',userController.postUser)
  .get('/sports', sportsController.getSports)
  .get('/opponent/:userId/:leagueId', opponentController.getOpponent)
  .post('/versus',createMatchController.postMatch);

module.exports = router;
