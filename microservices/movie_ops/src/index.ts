import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { initDB } from './data/dbInit.js'

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router)

// TODO: init DB
initDB();

app.listen(4003, () => {
  console.log('Listening on 4003');
});