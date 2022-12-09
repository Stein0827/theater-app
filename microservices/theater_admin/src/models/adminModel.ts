import { SalesRequest } from '../types';
import * as dbe from '../data/dbComms';

export class AdminModel {
    theaterId: string;

    constructor(data: SalesRequest) {
        this.theaterId = data.theaterId;
    }

    getRevenue() {
        this.validateRequest();
        this.validateTheaterExists();
        const theaterRevenue = dbe.getRevenue(this.theaterId);
        return theaterRevenue;
    }

    validateRequest() {
        const theaterId = this.theaterId;

        if (!theaterId || typeof theaterId !== 'string' || theaterId === "") {
            throw new AdminException("Invalid theater id", [theaterId as string])
        }
    }

    validateTheaterExists() {
        const theaterExists: boolean = dbe.theaterExists(this.theaterId);
        if (!theaterExists) {
            throw new AdminException("Theater does not exist", [this.theaterId as string]);
        }
    }
}

export class AdminException {
    list: string[];
    name: string;
    message: string;

    constructor(message: string, errorList: string[]) {
        this.name = "Admin Exception";
        this.message = message;
        this.list = errorList;
    }
}