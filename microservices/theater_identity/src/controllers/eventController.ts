import {Request, Response} from 'express';
import { LoginModel} from '../models/loginModel.js';

export const eventController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const loginModel = new LoginModel();
        const ret = await loginModel.processEvent(data);
        res.status(200).send(ret);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}