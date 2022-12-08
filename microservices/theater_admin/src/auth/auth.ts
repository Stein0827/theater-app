import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

//TODO: take out ternary after docker compose created
const jwtSecret = process.env.jwtSecret ? 
                  process.env.jwtSecret : 
                  '45fa5fc4668a2414a0fdea8a4cb4bbd47eb41cfecb80f7aca1a84376d9ed1e478b9824fd';
                  
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    try {
        jwt.verify(token, jwtSecret);
        next()
    } catch(err: any) {
        console.log(err);
        // req.redirect('login page');
        return res.status(401).json({message: "User is not authorized"});
    }
}