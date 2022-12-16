import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { initDB } from './data/dbInit.js';
import { subscribeToEventbus } from './events/subscribeToEB.js';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router)

initDB();
await subscribeToEventbus().catch((err) => {throw err});


app.listen(4009, () => {
  console.log('Listening on 4009');
});