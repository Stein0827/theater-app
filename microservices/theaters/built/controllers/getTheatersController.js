import { TheaterModel } from '../models/TheaterModel.js';
export async function getTheaters(req, res) {
    const resList = [];
    const data = req.body;
    for (const id of data) {
        try {
            let data_input = { theaterId: id };
            const theaterModel = new TheaterModel(data_input);
            const theater = await theaterModel.getTheater();
            resList.push(theater);
        }
        catch (err) {
            resList.push(err);
        }
    }
    res.status(202).send(resList);
}
