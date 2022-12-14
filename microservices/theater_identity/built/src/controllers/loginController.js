import { LoginModel } from '../models/loginModel.js';
import jwt from 'jsonwebtoken';
export const login = async (req, res) => {
    try {
        const data = req.body;
        const loginModel = new LoginModel(data);
        const user = await loginModel.login();
        const theaterId = user === null || user === void 0 ? void 0 : user.theaterId;
        const maxAge = 60 * 60; // 1 hour in secs
        const userId = user === null || user === void 0 ? void 0 : user._id;
        const jwtSecret = process.env.jwtSecret || "";
        const token = jwt.sign({ userId }, jwtSecret, {
            expiresIn: maxAge, // 1hrs in sec
        });
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 1hrs in ms
        });
        res.status(200).send(theaterId);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
};
