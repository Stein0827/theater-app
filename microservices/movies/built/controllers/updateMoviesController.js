import { MovieModel } from '../models/movieModel.js';
export const updateMovie = async (req, res) => {
    try {
        const data = req.body;
        const movieModel = new MovieModel(data);
        const result = await movieModel.updateMovie();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
