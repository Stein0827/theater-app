import express, { Express } from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(4000, () => {
  console.log('Listening on 4000');
});