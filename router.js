const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/user.controller');

router
  .get('/users', userController._getUser)
  .post('/', () => {});

module.exports = router;
