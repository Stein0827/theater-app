import {Request, Response} from 'express';
import { eventBus } from '../models/eventBusModel';


export const publishService = (req: Request, res: Response) => {
    try {
        const data = req.body;
        const success = eventBus.publish(data);
        res.status(200).send(`EVENTBUS Published data: ${data}`);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}