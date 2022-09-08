import bodyParser from 'body-parser';
import express from 'express';

import database from '../../infra/database.js';
import apiRouter from './routes.js';

const appInstance = express();

appInstance.use(bodyParser.json());

appInstance.use('/api', apiRouter);

const port = 3000;

export const app = appInstance;

export default {
  start() {
    database.connect();

    return appInstance.listen(port);
  },
};
