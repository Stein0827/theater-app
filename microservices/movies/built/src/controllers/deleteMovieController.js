import { MovieModel } from '../models/movieModel.js';
import { publishEvent } from '../events/publishEvent.js';
export const deleteMovie = async (req, res) => {
    try {
        const data = req.body;
        const movieModel = new MovieModel(data);
        await movieModel.deleteMovie();
        await publishEvent("movieDeleted", { movie_id: movieModel.id });
        res.status(200).send("Success: Movie Deleted");
    }
    catch (err) {
        res.status(400).send(err);
    }
};
