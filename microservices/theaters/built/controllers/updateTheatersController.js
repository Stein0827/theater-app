import { TheaterModel } from '../models/TheaterModel.js';
import { publishEvent } from '../events/publishEvent.js';
export const updateTheater = async (req, res) => {
    try {
        const data = req.body;
        const theaterModel = new TheaterModel(data);
        const newTheater = await theaterModel.updateTheater();
        await publishEvent("theaterUpdated", newTheater);
        res.status(200).send(newTheater);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
