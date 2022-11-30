import express, {Express, Request, Response} from 'express';
import { getallMovies } from "../data/dbCommsSingleton.js"

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        res.status(200).send(getallMovies());
    } catch (err) {
        res.status(400).send("Error: database error");
    }
};