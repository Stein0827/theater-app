import { ConfirmationModel } from '../models/ConfirmationModel.js';
export const getConfirmations = async (req, res) => {
    let resList = [];
    const data = req.body;
    for (const id of data) {
        try {
            let data_input = { confirmationId: id };
            const confirmationModel = new ConfirmationModel(data_input);
            const confirmation = await confirmationModel.getConfirmation();
            resList.push(confirmation);
        }
        catch (err) {
            resList.push(err);
        }
    }
    res.status(202).send(resList);
};
