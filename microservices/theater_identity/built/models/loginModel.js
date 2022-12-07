"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginException = exports.LoginModel = void 0;
const dbe = __importStar(require("../data/dbComms.js"));
class LoginModel {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.theaterId = "";
    }
    login() {
        this.validateRequest();
        this.validateUserExists();
        this.theaterId = dbe.login(this.username, this.password);
        return this.theaterId;
    }
    validateRequest() {
        const username = this.username, password = this.password;
        if (!username || typeof username !== 'string' || username === "" ||
            !password || typeof password !== 'string' || password === "") {
            throw new LoginException("Username or password are invalid", [username, password]);
        }
    }
    validateUserExists() {
        const userExists = dbe.userExists(this.username);
        if (!userExists) {
            throw new LoginException("User does not exist", [this.username, this.password]);
        }
    }
}
exports.LoginModel = LoginModel;
class LoginException {
    constructor(message, errorList) {
        this.name = "Login Exception";
        this.message = message;
        this.list = errorList;
    }
}
exports.LoginException = LoginException;
