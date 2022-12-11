import { MovieModel } from '../models/movieModel.js';
import { publishEvent } from '../events/publishEvent.js';
export const createMovie = async (req, res) => {
    try {
        const data = req.body;
        const movieModel = new MovieModel(data);
        const newMovie = await movieModel.createMovie().catch((err) => { throw err; });
        await publishEvent("movieCreated", { movie_id: newMovie.id });
        res.status(200).send(newMovie);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
