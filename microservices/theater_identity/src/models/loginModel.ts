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

    async login() {
        this.validateRequest();
        const user = await dbe.login(this.username, this.password);
        return user;
    }

    async register() {
        this.validateRequest();
        const user = await dbe.register(this.username, this.password);
        return user;
    }

    async delete() {
        this.validateDelete();
        const deleteAck = await dbe.deleteUser(this.username);
        return deleteAck;
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

    validateDelete() {
        const username = this.username;
        if (!username || typeof username !== 'string' || username === "") {
            throw new LoginException("Username is invalid", [username])
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