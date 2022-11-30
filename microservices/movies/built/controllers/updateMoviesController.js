var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MovieModel } from '../models/movieModel.js';
import * as dbe from '../data/dbCommsSingleton.js';
export const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    //if data has no movie id
    let invalid = true;
    if (data.movie_id !== undefined && data.movie_id !== "" && typeof data.movie_id === "string") {
        invalid = false;
    }
    if (invalid) {
        res.status(400).send("Error: Request body does not include a valid id");
    }
    else {
        try {
            // get movie to see if it exists
            const movieModel = new MovieModel(data);
            if (dbe.hasMovie(movieModel.id)) {
                const newMovie = movieModel.updateMovie();
                res.status(200).send(newMovie);
            }
            else {
                res.status(404).send("Error: Movie not found");
            }
        }
        catch (err) {
            res.status(400).send("Error: database failure");
        }
    }
});
