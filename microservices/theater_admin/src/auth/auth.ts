import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.jwtSecret || "";
                  
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    try {
        jwt.verify(token, jwtSecret);
        next();
    } catch(err: any) {
        console.log(err);
        // req.redirect('login page');
        return res.status(401).json({message: "User is not authorized"});
    }
}