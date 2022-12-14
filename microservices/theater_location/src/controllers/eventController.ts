import {Request, Response} from 'express';
import { TheaterLocationModel} from '../models/theaterLocationModel.js'

export const eventController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const theaterLocationModel = new TheaterLocationModel();
        const ret = await theaterLocationModel.processEvent(data);
        res.status(200).send(ret);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}: ${err.list[0]}`);
    }
}