import express from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { initDB } from './data/dbInit.js';
import { subscribeToEventbus } from './events/subscribeToEventBus.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
// Initialize the database
initDB();
await subscribeToEventbus().catch((err) => { throw err; });
app.listen(4007, () => {
    console.log('Listening on 4007');
});
