import { AdminModel } from '../models/adminModel.js';
export const eventController = async (req, res) => {
    try {
        const data = req.body;
        const adminModel = new AdminModel();
        const ret = await adminModel.processEvent(data);
        res.status(200).send(ret);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}: ${err.list[0]}`);
    }
};
