import { MovieLocationRequest, theaterList } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class TheaterLocationModel {
    zipcode: string

    constructor(data: MovieLocationRequest) {
        this.zipcode = data.zipcode;
    }

    async getLocalTheaters() {
        this.validateRequest()
        // if the zipcode is not in the database, then ask the theater service for the theaters with that zipcode
        if (!(await this.validateZipCodeExists())) {
            //TODO: send event to theater service to get local theaters and update dbe
            throw new TheaterLocateException("zipcode does not exist", [this.zipcode as string]); 
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