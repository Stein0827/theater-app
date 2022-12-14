import {Request, Response} from 'express';
import { AdminModel } from '../models/adminModel.js';
import { SalesRequest } from '../types';

export const getSales = async (req: Request, res: Response) => {
    try {
        const data: SalesRequest = req.body;
        const adminModel = new AdminModel(data);
        const theaterRev = await adminModel.getRevenue();
        res.status(200).send(theaterRev);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}