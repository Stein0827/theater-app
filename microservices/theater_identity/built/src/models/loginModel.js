import * as dbe from '../data/dbComms.js';
import { publishEvent } from '../events/publishEvent.js';
export class LoginModel {
    constructor(data = { username: "", password: "" }) {
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
        const username = this.username, password = this.password;
        if (!username || typeof username !== 'string' || username === "" ||
            !password || typeof password !== 'string' || password === "") {
            throw new LoginException("Username or password are invalid", [username, password]);
        }
    }
    validateDelete() {
        const username = this.username;
        if (!username || typeof username !== 'string' || username === "") {
            throw new LoginException("Username is invalid", [username]);
        }
    }
    async processEvent(data) {
        if (!this.validateEventRequest(data)) {
            throw new LoginException("Invalid Event", [JSON.stringify(data.eventData)]);
        }
        let res;
        const eventType = data.eventType;
        switch (eventType) {
            case 'theaterCreated':
                res = await dbe.addTheaterId(data);
                break;
            case 'theaterDeleted':
                res = await dbe.deleteTheater(data);
                break;
            default:
                throw new LoginException("Invalid event type", [eventType]);
        }
        return res;
    }
    validateEventRequest(data) {
        const eventType = data.eventType;
        const eventData = data.eventData;
        if (!eventType || typeof eventType !== 'string' || !eventData) {
            return false;
        }
        return true;
    }
    async registerUser(data) {
        this.username = data.username;
        this.password = data.password;
        const user = await this.register();
        //remove the password from the data object
        delete data.password;
        publishEvent("userCreated", data);
    }
}
export class LoginException {
    constructor(message, errorList) {
        this.name = "Login Exception";
        this.message = message;
        this.list = errorList;
    }
}
