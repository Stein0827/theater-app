"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const loginModel_1 = require("../models/loginModel");
const login = (req, res) => {
    try {
        const data = req.body;
        const loginModel = new loginModel_1.LoginModel(data);
        const theaterId = loginModel.login();
        res.status(200).send(theaterId);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message} with username: ${err.list[0]}, password: ${err.list[1]}`);
    }
};
exports.login = login;
