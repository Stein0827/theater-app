import { OperationsModel } from '../models/operationsModel.js';
export const updateOperations = async (req, res) => {
    try {
        const data = req.body;
        const operationsModel = new OperationsModel(data);
        const updatedOperations = await operationsModel.updateOperations();
        res.status(200).send(updatedOperations);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
