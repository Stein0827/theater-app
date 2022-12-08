"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//TODO: take out ternary after docker compose created
const jwtSecret = process.env.jwtSecret ?
    process.env.jwtSecret :
    '45fa5fc4668a2414a0fdea8a4cb4bbd47eb41cfecb80f7aca1a84376d9ed1e478b9824fd';
const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        jsonwebtoken_1.default.verify(token, jwtSecret);
        next();
    }
    catch (err) {
        console.log(err);
        // req.redirect('login page');
        return res.status(401).json({ message: "User is not authorized" });
    }
};
exports.adminAuth = adminAuth;
