"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.findUser = exports.userExists = void 0;
const dbInit_js_1 = require("../data/dbInit.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginModel_js_1 = require("../models/loginModel.js");
function userExists(username) {
    return username in dbInit_js_1.db;
}
exports.userExists = userExists;
function findUser(username) {
    return dbInit_js_1.db[username];
}
exports.findUser = findUser;
function login(username, password) {
    const user = findUser(username);
    if (bcryptjs_1.default.compareSync(password, user.password)) {
        return user.theaterId;
    }
    else {
        throw new loginModel_js_1.LoginException("Password is incorrect", [password]);
    }
}
exports.login = login;
