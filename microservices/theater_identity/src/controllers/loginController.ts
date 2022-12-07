import {Request, Response} from 'express';
import { LoginModel } from '../models/loginModel';
import { LoginRequest } from '../types';

export const login = async (req: Request, res: Response) => {
    try {
        const data: LoginRequest = req.body;
        const loginModel = new LoginModel(data);
        const theaterId = loginModel.login();
        res.status(200).send(theaterId);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message} with username: ${err.list[0]}, password: ${err.list[1]}`);
    }
}