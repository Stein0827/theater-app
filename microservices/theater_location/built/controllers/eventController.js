import { TheaterLocationModel } from '../models/theaterLocationModel.js';
export const eventController = async (req, res) => {
    try {
        const data = req.body;
        const theaterLocationModel = new TheaterLocationModel(data);
        const ret = theaterLocationModel.processEvent(data);
        res.status(200).send(ret);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message} with zipcode: ${err.list[0]}`);
    }
};
