import { ConfirmationModel } from '../models/ConfirmationModel.js';
export const deleteConfirmation = async (req, res) => {
    try {
        const data = req.body;
        const confirmationModel = new ConfirmationModel(data);
        const ack = await confirmationModel.deleteConfirmation();
        res.status(200).send(ack);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
