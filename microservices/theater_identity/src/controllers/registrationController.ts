import {Request, Response} from 'express';
import { LoginModel } from '../models/loginModel';
import { RegistrationRequest } from '../types';
import jwt from 'jsonwebtoken';


export function registerUser(req: Request, res: Response) {
    try {
        const data: RegistrationRequest = req.body;
        const loginModel = new LoginModel(data);
        const user = loginModel.register();

        const username = user.username;
        const password = user.password;
        const maxAge = 60 * 60; // 1 hour in seconds
        //TODO: take out ternary after docker compose created
        const jwtSecret = process.env.jwtSecret ? 
                          process.env.jwtSecret : 
                          '45fa5fc4668a2414a0fdea8a4cb4bbd47eb41cfecb80f7aca1a84376d9ed1e478b9824fd';
        // generate token for cookie 
        const token = jwt.sign(
            { username, password },
            jwtSecret,
            {
              expiresIn: maxAge, // 1hrs in sec
            }
        );

        //set cookie in browser for later authenication
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 1 hour in ms
        });

        res.status(200).send(user);
    } catch (err: any) {
        res.status(400).send(`${err.name}: ${err.message} with username: ${err.list[0]}, password: ${err.list[1]}`);
    }
}


