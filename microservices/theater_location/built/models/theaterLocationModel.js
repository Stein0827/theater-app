import * as dbe from '../data/dbComms.js';
export class TheaterLocationModel {
    constructor(data) {
        this.zipcode = data.zipcode;
        this.localTheatersList = [];
    }
    getLocalTheaters() {
        this.validateRequest();
        // if the zipcode is not in the database, then ask the theater service for the theaters with that zipcode
        if (!this.validateZipCodeExists()) {
            //TODO: send event to theater service to get local theaters and update dbe
            throw new TheaterLocateException("zipcode does not exist", [this.zipcode]);
        }
        else {
            this.localTheatersList = dbe.getTheaters(this.zipcode);
        }
        return this;
    }
    validateRequest() {
        if (this.zipcode === undefined || typeof this.zipcode !== "string" || this.zipcode === "") {
            throw new TheaterLocateException("Invalid zipcode", [this.zipcode]);
        }
    }
    validateZipCodeExists() {
        return dbe.hasZipCode(this.zipcode);
    }
}
export class TheaterLocateException {
    constructor(message, errorList) {
        this.name = "Locate Theater Exception";
        this.message = message;
        this.list = errorList;
    }
}
