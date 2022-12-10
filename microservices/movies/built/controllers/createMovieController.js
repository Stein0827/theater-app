import { MovieModel } from '../models/movieModel.js';
export const createMovie = async (req, res) => {
    try {
        const data = req.body;
        const movieModel = new MovieModel(data);
        const newMovie = await movieModel.createMovie().catch((err) => { throw err; });
        res.status(200).send(newMovie);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
