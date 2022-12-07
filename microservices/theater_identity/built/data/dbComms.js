"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.findUser = exports.createUser = exports.userExists = void 0;
const dbInit_js_1 = require("../data/dbInit.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginModel_js_1 = require("../models/loginModel.js");
function userExists(username) {
    return username in dbInit_js_1.db;
}
exports.userExists = userExists;
function createUser(username, password) {
    const user = {
        username,
        password,
        "theaterId": ""
    };
    dbInit_js_1.db[username] = user;
    return user;
}
exports.createUser = createUser;
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
function register(username, password) {
    const hash = bcryptjs_1.default.hashSync(password, 10);
    // TODO: add await call once make real database function
    const user = createUser(username, hash);
    return user;
}
exports.register = register;
