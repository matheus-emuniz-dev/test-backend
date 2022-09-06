import bodyParser from 'body-parser';
import express from 'express';

import database from '../infra/database.js';
import apiRouter from './http/routes.js';

const _app = express();

_app.use(bodyParser.json());

_app.use('/api', apiRouter);

const port = 3000;

export const app = _app;

export default {
  start() {
    database.connect();

    _app.listen(port, () => {
      console.log(`Listening in port ${port}`);
    });

    return _app;
  },
};
