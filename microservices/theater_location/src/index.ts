import express, { Express } from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { initDB } from './data/dbInit.js';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router);

// initialize the database
initDB();

app.listen(4008, () => {
  console.log('Listening on 4008');
});