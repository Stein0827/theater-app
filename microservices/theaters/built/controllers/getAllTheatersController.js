import * as dbe from "../data/dbComms.js";
export const getAllTheaters = async (req, res) => {
    try {
        res.status(200).send(await dbe.getAllTheaters());
    }
    catch (err) {
        res.status(400).send(err);
    }
};
