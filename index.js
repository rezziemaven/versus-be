'use strict';

require('dotenv').config();
const logger = require('koa-logger');
const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes());

 const port = process.env.PORT || 3000;

 app.listen(port, () => {
  console.log(`Server running on port ${port}`);
 });
