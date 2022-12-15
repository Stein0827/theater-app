import {Request, Response} from 'express';
import { AdminModel} from '../models/adminModel.js';

export const eventController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const adminModel = new AdminModel();
        const ret = await adminModel.processEvent(data);
        res.status(200).send(ret);
    } catch (err: any) {
        console.log("ERROR: Theater admin error", err);
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}