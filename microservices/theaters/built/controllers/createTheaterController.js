import { TheaterModel } from '../models/TheaterModel.js';
import { publishEvent } from '../events/publishEvent.js';
export const createTheater = async (req, res) => {
    try {
        const data = req.body;
        const theaterModel = new TheaterModel(data);
        const newTheater = await theaterModel.createTheater();
        await publishEvent("theaterCreated", newTheater);
        res.status(200).send(newTheater);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
