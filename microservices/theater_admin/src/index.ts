import express, { Express } from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { startupDB } from './data/dbInit.js';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router);

// TODO: init DB
startupDB();

app.listen(4006, () => {
  console.log('Listening on 4006');
});