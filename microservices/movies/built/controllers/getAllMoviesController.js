import * as dbe from "../data/dbComms.js";
import { publishEvent } from '../events/publishEvent.js';
export const getAllMovies = async (req, res) => {
    const dbPromise = dbe.getallMovies();
    dbPromise.then(async (result) => {
        await publishEvent("te1", result);
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
        ;
    });
};
