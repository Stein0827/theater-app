import {Request, Response} from 'express';
import { eventBus } from '../models/eventBusModel';


export const subscribeService = (req: Request, res: Response) => {
    try {
        const data = req.body;
        eventBus.subscribe(data);
        res.status(200).send("SUCCESS");
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message} with input ${err.list}`);
    }
}