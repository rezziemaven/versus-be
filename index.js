'use strict';

require('dotenv').config();
const logger = require('koa-logger');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const router = require('./router');

app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes());

 const port = process.env.PORT || 3001;

 app.listen(port, () => {
  console.log(`Server running on port ${port}`);
 });
