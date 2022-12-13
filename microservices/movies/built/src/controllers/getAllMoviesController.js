import * as dbe from "../data/dbComms.js";
export const getAllMovies = async (req, res) => {
    const dbPromise = dbe.getallMovies();
    dbPromise.then(async (result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
        ;
    });
};
