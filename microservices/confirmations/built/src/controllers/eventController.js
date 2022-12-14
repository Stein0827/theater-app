import { ConfirmationModel } from '../models/ConfirmationModel.js';
export const respondToEvent = async (req, res) => {
    try {
        const event = req.body;
        const model = new ConfirmationModel(event.eventData);
        let result = {};
        if (event.eventType === "paymentCreated") {
            result = `Theater created: ${await model.createConfirmation()}`;
        }
        if (result === undefined) {
            result = "Error: This event was not handled";
        }
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
