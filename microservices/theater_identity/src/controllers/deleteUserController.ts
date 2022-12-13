import {Request, Response} from 'express';
import { LoginModel } from '../models/loginModel';


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const loginModel = new LoginModel(data);
        const deleteAck = await loginModel.delete();

        res.status(200).send(deleteAck);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}
