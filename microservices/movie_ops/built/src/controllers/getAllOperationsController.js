import * as dbe from '../data/dbComms.js';
export const getAllOperations = async (req, res) => {
    try {
        const result = await dbe.getAllOperations();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
