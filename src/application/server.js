import bodyParser from 'body-parser';
import express from 'express';

import database from '../infra/database.js';
import apiRouter from './http/routes.js';

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);

const port = 3000;

export default {
  start() {
    database.connect();

    app.listen(port, () => {
      console.log(`Listening in port ${port}`);
    });
  },
};
