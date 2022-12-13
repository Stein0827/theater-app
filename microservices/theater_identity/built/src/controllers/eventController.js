import { LoginModel } from '../models/loginModel.js';
export const eventController = async (req, res) => {
    try {
        const data = req.body;
        const loginModel = new LoginModel();
        const ret = await loginModel.processEvent(data);
        res.status(200).send(ret);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
};
