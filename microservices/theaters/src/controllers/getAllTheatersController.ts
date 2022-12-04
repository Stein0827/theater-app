import express, {Express, Request, Response} from 'express';
import * as dbe from "../data/dbComms.js"

export const getAllTheaters = async (req: Request, res: Response) => {
    try {
        res.status(200).send(dbe.getAllTheaters());
    } catch (err) {
        res.status(400).send(err);
    }
};