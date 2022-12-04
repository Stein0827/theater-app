import express, {Express, Request, Response} from 'express';
import * as dbe from "../data/dbComms.js"

export const getAllConcessions = async (req: Request, res: Response) => {
    try {
        res.status(200).send(dbe.getAllConcessions());
    } catch (err) {
        res.status(400).send(err);
    }
};