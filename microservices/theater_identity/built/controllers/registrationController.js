"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const loginModel_1 = require("../models/loginModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerUser(req, res) {
    try {
        const data = req.body;
        const loginModel = new loginModel_1.LoginModel(data);
        const user = loginModel.register();
        const username = user.username;
        const password = user.password;
        const maxAge = 60 * 60; // 1 hour in seconds
        //TODO: take out ternary after docker compose created
        const jwtSecret = process.env.jwtSecret ?
            process.env.jwtSecret :
            '45fa5fc4668a2414a0fdea8a4cb4bbd47eb41cfecb80f7aca1a84376d9ed1e478b9824fd';
        // generate token for cookie 
        const token = jsonwebtoken_1.default.sign({ username, password }, jwtSecret, {
            expiresIn: maxAge, // 1hrs in sec
        });
        //set cookie in browser for later authenication
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 1 hour in ms
        });
        res.status(200).send(user);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message} with username: ${err.list[0]}, password: ${err.list[1]}`);
    }
}
exports.registerUser = registerUser;
