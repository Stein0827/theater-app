import {Request, Response} from 'express';
import { eventBus } from '../models/eventBusModel';


export const publishService = (req: Request, res: Response) => {
    try {
        const data = req.body;
        const urlList = eventBus.publish(data);
        res.status(200).send(`Success: Eventbus published data to subscribers ${urlList}`);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}