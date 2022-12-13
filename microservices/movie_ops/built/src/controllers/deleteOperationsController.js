import { OperationsModel } from '../models/operationsModel.js';
export const deleteOperations = async (req, res) => {
    try {
        const data = req.body;
        const operationsModel = new OperationsModel(data);
        const result = await operationsModel.deleteOperations();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
