import { TheaterLocationModel } from '../models/theaterLocationModel.js';
export const getLocalTheaters = async (req, res) => {
    try {
        const data = req.body;
        const theaterLocationModel = new TheaterLocationModel(data);
        let resList = await theaterLocationModel.getLocalTheaters();
        res.status(200).send(resList);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}: ${err.list[0]}`);
    }
};
