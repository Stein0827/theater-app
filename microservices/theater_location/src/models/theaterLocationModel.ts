import * as dbe from '../data/dbComms.js';
import { MovieLocationRequest, Event, TheaterData, TheaterModel } from '../types.js';

export class TheaterLocationModel {
    zipcode: string

    constructor(data: MovieLocationRequest = {zipcode: ""}) {
        this.zipcode = data.zipcode;
    }

    async getLocalTheaters() {
        this.validateRequest()
        // if the zipcode is not in the database, then ask the theater service for the theaters with that zipcode
        if (!(await this.validateZipCodeExists())) {
            throw new TheaterLocateException("zipcode does not exist", [`${this.zipcode}`]); 
        }
        return await dbe.getTheaters(this.zipcode);
    }

    validateRequest() {
        if (this.zipcode === undefined || typeof this.zipcode !== "string" || this.zipcode === "") {
            throw new TheaterLocateException("Invalid zipcode", [this.zipcode as string]);
        }
    }

    async validateZipCodeExists() {
        return await dbe.hasZipCode(this.zipcode);
    }

    validateEventRequest(data: Event) {
        const eventType = data.eventType;
        const eventData = data.eventData;
        if (!eventType || typeof eventType !== 'string'|| !eventData) {
            return false;
        }
        return true;
    }

    async processEvent(data: Event) {
        if (!this.validateEventRequest(data)) {
            throw new TheaterLocateException("Invalid Event", [JSON.stringify(data.eventData)]);
        }

        const eventType = data.eventType;
        const eventData = data.eventData;
        let ret: any;

        switch(eventType) {
            case 'theaterCreated':
                ret = await dbe.addTheaterZipcode(eventData as TheaterData);
                break;
            case 'theaterDeleted':
                ret = await dbe.removeTheaterZipcode(eventData as TheaterModel);
                break;
            default:
                throw new TheaterLocateException("Invalid event type", [eventType]);
        }
        return ret;
    }
}

export class TheaterLocateException {
    list: string[];
    name: string;
    message: string;

    constructor (message:string, errorList: string[]) {
        this.name = "Locate Theater Exception";
        this.message = message;
        this.list = errorList;
    }
}