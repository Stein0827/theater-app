import { LoginRequest, registerUserData } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { Event } from '../types.js';
import { theaterCreated, theaterDeleted } from '../../eventTypes.js';
import { publishEvent } from '../events/publishEvent.js';

export class LoginModel {
    theaterId: string;
    username: string;
    password: string;
    
    constructor(data: LoginRequest = {username: "", password: ""}) {
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

    async processEvent(data: Event) {        
        if (!this.validateEventRequest(data)) {
            throw new LoginException("Invalid Event", [JSON.stringify(data.eventData)]);
        }
        let res: any;

        const eventType = data.eventType;

        switch(eventType) {
            case 'theaterCreated':
                res = await dbe.addTheaterId(data as theaterCreated);  
                break;
            case 'theaterDeleted':
                res = await dbe.deleteTheater(data as theaterDeleted);
                break;
            default:
                throw new LoginException("Invalid event type", [eventType]);                
        }

        return res;
    }

    validateEventRequest(data: Event) {
        const eventType = data.eventType;
        const eventData = data.eventData;
        if (!eventType || typeof eventType !== 'string'|| !eventData) {
            return false;
        }
        return true;
    }

    async registerUser(data: registerUserData) {
        this.username = data.username;
        this.password = data.password!;

        const user = await this.register();
        
        //remove the password from the data object
        delete data.password
        
        publishEvent("userCreated", data);
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