import { MovieModel } from '../models/movieModel.js';
export const deleteMovie = async (req, res) => {
    try {
        const data = req.body;
        const movieModel = new MovieModel(data);
        await movieModel.deleteMovie();
        res.status(200).send("Success: Movie Deleted");
    }
    catch (err) {
        res.status(400).send(err);
    }
};
