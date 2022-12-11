import { OperationsModel } from '../models/operationsModel.js';
export const getOperations = async (req, res) => {
    try {
        const data = req.body;
        const operationsModel = new OperationsModel(data);
        const operations = await operationsModel.getOperations();
        res.status(200).send(operations);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
