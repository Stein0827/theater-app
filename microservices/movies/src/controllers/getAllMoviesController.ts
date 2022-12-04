import express, {Express, Request, Response} from 'express';
import * as dbe from "../data/dbComms.js"

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        res.status(200).send(dbe.getallMovies());
    } catch (err) {
        res.status(400).send(err);
    }
};