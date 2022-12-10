import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { startupDB } from './data/dbInit.js';
import { subscribeToEventbus} from './events/subscribeToEB.js'

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router)

export const db = startupDB();
let res = await subscribeToEventbus().catch((err) => {throw err});
console.log("**TEMP**: Movies Subscribed to Event Bus", res?.data);

app.listen(4004, () => {
  console.log('Listening on 4004');
});

export {};