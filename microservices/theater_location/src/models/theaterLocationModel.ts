import { MovieLocationRequest, theaterList } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class TheaterLocationModel {
    zipcode: string
    localTheatersList: theaterList

    constructor(data: MovieLocationRequest) {
        this.zipcode = data.zipcode;
        this.localTheatersList = [];
    }

    getLocalTheaters() {
        this.validateRequest()
        // if the zipcode is not in the database, then ask the theater service for the theaters with that zipcode
        if (!this.validateZipCodeExists()) {
            //TODO: send event to theater service to get local theaters and update dbe
            throw new TheaterLocateException("zipcode does not exist", [this.zipcode as string]); 
        } else {
            this.localTheatersList = dbe.getTheaters(this.zipcode);
        }
        return this;
    }

    validateRequest() {
        if (this.zipcode === undefined || typeof this.zipcode !== "string" || this.zipcode === "") {
            throw new TheaterLocateException("Invalid zipcode", [this.zipcode as string]);
        }
    }

    validateZipCodeExists() {
        return dbe.hasZipCode(this.zipcode);
    }
}

export class TheaterLocateException{
    list: string[];
    name: string;
    message: string;

    constructor (message:string, errorList: string[]) {
        this.name = "Locate Theater Exception";
        this.message = message;
        this.list = errorList;
    }
}