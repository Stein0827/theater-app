import express, {Express, Request, Response} from 'express';
import * as dbe from "../data/dbComms.js"
import { db } from '../index.js';

export const getAllMovies = async (req: Request, res: Response) => {
    const dbPromise = dbe.getallMovies();
    dbPromise.then((result) => { 
        res.status(200).send(result);
    }).catch((error) => { 
        res.status(400).send(error);;
    });
};