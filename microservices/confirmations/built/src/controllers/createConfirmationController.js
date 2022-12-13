import { ConfirmationModel } from '../models/ConfirmationModel.js';
export const createConfirmation = async (req, res) => {
    try {
        const data = req.body;
        const confirmationModel = new ConfirmationModel(data);
        const newConfirmation = await confirmationModel.createConfirmation();
        res.status(200).send(newConfirmation);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
