import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { initDB } from './data/dbInit.js';
import { subscribeToEventbus } from './events/subscribeToEventBus.js';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['http://localhost:3000']);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Initialize the database
initDB();
await subscribeToEventbus().catch((err) => {throw err});


app.listen(4007, () => {
  console.log('Listening on 4007');
});