import {Request, Response} from 'express';
import { eventBus } from '../models/eventBusModel';


export const subscribeService = (req: Request, res: Response) => {
    try {
        const data = req.body;
        eventBus.subscribe(data);
        console.log("CURRENT EVENTBUS:", eventBus);
        res.status(200).send("Success");
    } catch (err: any) {
        console.log("ERROR in Subscribe:", err);
        res.status(400).send(`${err.name}: ${err.message} with input ${err.list}`);
    }
}