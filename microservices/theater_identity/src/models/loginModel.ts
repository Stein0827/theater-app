import { LoginRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class LoginModel {
    theaterId: string;
    username: string;
    password: string;
    
    constructor(data: LoginRequest) {
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
        const username = this.username,
              password = this.password;
        if (
            !username || typeof username !== 'string' || username === "" ||
            !password || typeof password !== 'string' || password === ""
        ) {
            throw new LoginException("Username or password are invalid", [username, password])
        }
    }

    validateUserExists() {
        const userExists: boolean = dbe.userExists(this.username);
        if (!userExists) {
            throw new LoginException("User does not exist", [this.username, this.password])
        }
    }
}

export class LoginException {
    list: string[];
    name: string;
    message: string;

    constructor(message: string, errorList: string[]) {
        this.name = "Login Exception";
        this.message = message;
        this.list = errorList;
    }
}