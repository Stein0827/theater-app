import { OperationsModel } from '../models/operationsModel.js';
export const createOperations = async (req, res) => {
    try {
        const data = req.body;
        const operationsModel = new OperationsModel(data);
        const newOperations = await operationsModel.createOperations();
        res.status(200).send(newOperations);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
