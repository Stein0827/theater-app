import { AdminModel } from '../models/adminModel.js';
export const getSales = async (req, res) => {
    try {
        const data = req.body;
        const adminModel = new AdminModel(data);
        const theaterRev = await adminModel.getRevenue();
        res.status(200).send(theaterRev);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
};
