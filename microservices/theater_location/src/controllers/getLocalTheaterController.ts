import {Request, Response} from 'express';
import {MovieLocationRequest } from '../types.js';
import { TheaterLocationModel} from '../models/theaterLocationModel.js'

export const getLocalTheaters = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const data: MovieLocationRequest = req.body;
        const theaterLocationModel = new TheaterLocationModel(data);
        let resList = await theaterLocationModel.getLocalTheaters();
        res.status(200).send(resList);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}: ${err.list[0]}`);
    }
}

