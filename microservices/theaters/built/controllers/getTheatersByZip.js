import * as dbe from "../data/dbComms.js";
export const getTheatersByZip = async (req, res) => {
    try {
        const data = req.body;
        res.status(200).send(await dbe.getTheatersByZip(data.zip));
    }
    catch (err) {
        res.status(400).send(err);
    }
};
