import {Request, Response} from 'express';
import { LoginModel } from '../models/loginModel.js';
import { LoginRequest } from '../types.js';
import jwt from 'jsonwebtoken';


export const login = async (req: Request, res: Response) => {
    try {
        const data: LoginRequest = req.body;
        const loginModel = new LoginModel(data);
        const user = await loginModel.login();
        const theaterId = user?.theaterId;

        const maxAge = 60 * 60; // 1 hour in secs
        const userId = user?._id;
        
        const jwtSecret = process.env.jwtSecret || "";
        const token = jwt.sign(
            { userId },
            jwtSecret,
            {
                expiresIn: maxAge, // 1hrs in sec
            }
        );
        res.cookie("jwt", token, {
            httpOnly: false,
            maxAge: maxAge * 1000, // 1hrs in ms
        });

        res.status(200).send(theaterId);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}