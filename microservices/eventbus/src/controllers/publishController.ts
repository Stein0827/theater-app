import {Request, Response} from 'express';
import { eventBus } from '../models/eventBusModel';


export const publishService = (req: Request, res: Response) => {
    try {
        const data = req.body;
        const urlList = eventBus.publish(data);
        console.log(`Success: Eventbus published data: ${data} to subscribers ${urlList}`);
        res.status(200).send(`Success: Eventbus published data: ${data} to subscribers ${urlList}`);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}