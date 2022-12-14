import * as dbe from '../data/dbComms.js';
export class TheaterLocationModel {
    constructor(data = { zipcode: "" }) {
        this.zipcode = data.zipcode;
    }
    async getLocalTheaters() {
        this.validateRequest();
        // if the zipcode is not in the database, then ask the theater service for the theaters with that zipcode
        if (!(await this.validateZipCodeExists())) {
            throw new TheaterLocateException("zipcode does not exist", [`${this.zipcode}`]);
        }
        return await dbe.getTheaters(this.zipcode);
    }
    validateRequest() {
        if (this.zipcode === undefined || typeof this.zipcode !== "string" || this.zipcode === "") {
            throw new TheaterLocateException("Invalid zipcode", [this.zipcode]);
        }
    }
    async validateZipCodeExists() {
        return await dbe.hasZipCode(this.zipcode);
    }
    validateEventRequest(data) {
        const eventType = data.eventType;
        const eventData = data.eventData;
        if (!eventType || typeof eventType !== 'string' || !eventData) {
            return false;
        }
        return true;
    }
    async processEvent(data) {
        if (!this.validateEventRequest(data)) {
            throw new TheaterLocateException("Invalid Event", [JSON.stringify(data.eventData)]);
        }
        const eventType = data.eventType;
        const eventData = data.eventData;
        let ret;
        switch (eventType) {
            case 'theaterCreated':
                ret = await dbe.addTheaterZipcode(eventData);
                break;
            case 'theaterDeleted':
                ret = await dbe.removeTheaterZipcode(eventData);
                break;
            default:
                throw new TheaterLocateException("Invalid event type", [eventType]);
        }
        return ret;
    }
}
export class TheaterLocateException {
    constructor(message, errorList) {
        this.name = "Locate Theater Exception";
        this.message = message;
        this.list = errorList;
    }
}
