import { MovieModel } from '../models/movieModel.js';
export const getMovies = async (req, res) => {
    let resList = [];
    const data = req.body;
    for (const id of data) {
        let data_input = { movie_id: id };
        const movieModel = new MovieModel(data_input);
        try {
            const result = await movieModel.getMovie();
            resList.push(result);
        }
        catch (err) {
            resList.push(err);
        }
    }
    res.status(202).send(resList);
};
