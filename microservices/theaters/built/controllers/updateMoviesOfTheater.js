import { TheaterModel } from '../models/TheaterModel.js';
import { publishEvent } from '../events/publishEvent.js';
export const updateMoviesOfTheater = async (req, res) => {
    try {
        const data = req.body;
        const theaterModel = new TheaterModel(data);
        const theater_obj = await theaterModel.updateMoviesOfTheater();
        await publishEvent("movieListUpdated", theater_obj);
        res.status(200).send(theater_obj);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
