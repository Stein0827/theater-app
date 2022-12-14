import { LoginModel } from '../models/loginModel.js';
export const deleteUser = async (req, res) => {
    try {
        const data = req.body;
        const loginModel = new LoginModel(data);
        const deleteAck = await loginModel.delete();
        res.status(200).send(deleteAck);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
};
