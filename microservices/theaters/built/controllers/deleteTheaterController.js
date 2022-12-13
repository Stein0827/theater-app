import { TheaterModel } from '../models/TheaterModel.js';
import { publishEvent } from '../events/publishEvent.js';
export const deleteTheaters = async (req, res) => {
    try {
        const data = req.body;
        const theaterModel = new TheaterModel(data);
        console.log(theaterModel);
        const deletedTheater = await theaterModel.deleteTheater();
        await publishEvent("theaterDeleted", deletedTheater);
        res.status(200).send(deletedTheater);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
