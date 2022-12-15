import {Request, Response} from 'express';
import { eventBus } from '../models/eventBusModel';


export const publishService = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log("this is eventbus data: " + data);
        const urlList = await eventBus.publish(data);
        console.log(`Success: Eventbus published data: ${JSON.stringify(data)} to subscribers ${JSON.stringify(urlList)}`);
        res.status(200).send(`Success: Eventbus published data: ${data} to subscribers ${urlList}`);
    } catch (err: any) {
        console.log("ERROR: EVENTBUS PUBLISH CONTROLLER ERR:", err)
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}