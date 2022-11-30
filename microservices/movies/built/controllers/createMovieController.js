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
export const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    // data doesn't have all movie attributes except id, return error
    const required_attributes = new Set(["name", "desc", "length", "rating", "trailer"]);
    let invalid = false;
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute] === "") {
            invalid = true;
        }
    });
    // on success return entity with generated id, may want to use a try catch in 
    // case there is an error with the database
    if (invalid) {
        res.status(400).send("Error: Request body does not included all required attributes");
    }
    else {
        try {
            const movieModel = new MovieModel(data);
            const newMovie = movieModel.createMovie();
            res.status(200).send(newMovie);
        }
        catch (err) {
            res.status(400).send("Error: error creating movie in database");
        }
    }
});
