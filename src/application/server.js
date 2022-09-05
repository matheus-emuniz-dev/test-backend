import bodyParser from 'body-parser';
import express from 'express';

import database from '../infra/database.js';

const app = express();

app.use(bodyParser.json());

const port = 3000;

export default {
  start() {
    database.connect();

    app.listen(port, () => {
      console.log(`Listening in port ${port}`);
    });
  },
};
