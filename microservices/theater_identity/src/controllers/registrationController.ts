import {Request, Response} from 'express';
import { LoginModel } from '../models/loginModel.js';
import { registerUserData } from '../types.js';
import jwt from 'jsonwebtoken';


export const registerUser = async (req: Request, res: Response) => {
    try {
        const data: registerUserData = req.body;
        const loginModel = new LoginModel();
        const user = await loginModel.registerUser(data);

        const userId = user.insertedId;
        const maxAge = 60 * 60; // 1 hour in seconds
        const jwtSecret = process.env.jwtSecret || "";
        // generate token for cookie 
        const token = jwt.sign(
            { userId },
            jwtSecret,
            {
              expiresIn: maxAge, // 1hrs in sec
            }
        );

        //set cookie in browser for later authentication
        res.cookie('jwt', token, {
            httpOnly: false,
            maxAge: maxAge * 1000, // 1 hour in ms
        });

        res.status(200).send(user);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
}
