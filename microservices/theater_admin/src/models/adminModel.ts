import { SalesRequest } from '../types';
import * as dbe from '../data/dbComms';
import { TheaterRevenue } from '../types'

export class AdminModel {
    theaterId: string;

    constructor(data: SalesRequest) {
        this.theaterId = data.theaterId;
    }

    async getRevenue() {
        this.validateRequest();
        const revObj = await dbe.getRevenue(this.theaterId);
        return this.#processRevenue(revObj);
    }

    validateRequest() {
        const theaterId = this.theaterId;
        if (!theaterId || typeof theaterId !== 'string' || theaterId === "") {
            throw new AdminException("Invalid theater id", [theaterId as string])
        }
    }

    #processRevenue(revObj: TheaterRevenue[]) {
        if (revObj.length === 0) {
            return revObj;
        }

        //convert the dates from ISO to a Date object
        revObj = this.#convertDates(revObj);

        const totalTicketRevenue = revObj.reduce((acc, e) => acc += e.ticketRevenue, 0);
        const totalConcessionRevenue = revObj.reduce((acc, e) => acc += e.concessionsRevenue, 0);

        const totalRev = {
            revObj,
            totalTicketRevenue,
            totalConcessionRevenue
        }
        return totalRev;
    }

    #convertDates(revObj: TheaterRevenue[]) {
        for (const rev of revObj) {
            rev.date = new Date(rev.date);
        }
        return revObj;
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