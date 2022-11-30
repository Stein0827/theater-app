import express, {Express, Request, Response} from 'express';
import {MovieGetBatchRequest } from '../types.js';
import * as dbe from '../data/dbCommsSingleton.js';

export const getMovies = async (req: Request, res: Response) => {
    const data: MovieGetBatchRequest = req.body;
    let list: Array<Object | string > = [];

    try {
        data.forEach(id => {
        
            if (id === undefined || id as string === "" || typeof id !== "string") {
                list.push('Error: Invalid Movie ID');
            } else if (dbe.hasMovie(id)) {
                list.push(dbe.getMovie(id));
            } else {
                list.push('Error: Movie doesnt exists');
            }
        })
        // return list of entities or errors if entity doesnt exists
        res.status(200).send(list);  
    } catch (err) {
        res.status(400).send("Error: database error");  
    }
  }