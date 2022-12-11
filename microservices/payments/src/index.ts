import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { startupDB } from './data/dbInit.js'

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router)

export const db = startupDB();

// Payments doesn't receive any events but it does publish
// await subscribeToEventbus().catch((err) => {throw err}); 

app.listen(4005, () => {
  console.log('Listening on 4004');
});