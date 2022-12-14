import { SalesRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { TheaterRevenue, Event } from '../types.js';
import { paymentCreated, theaterCreated, theaterDeleted } from '../../eventTypes.js';

export class AdminModel {
    theaterId: string;

    constructor(data: SalesRequest = {theaterId: ""}) {
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

    async processEvent(data: Event) {        
        if (!this.validateEventRequest(data)) {
            throw new AdminException("Invalid Event", [JSON.stringify(data.eventData)]);
        }
        let res: any;

        const eventType = data.eventType;

        switch(eventType) {
            case 'paymentCreated':
                res = await dbe.addRevenue(data as paymentCreated);
                break;
            case 'theaterCreated':
                res = await dbe.createTheaterRev(data as theaterCreated)  ;  
                break;
            case 'theaterDeleted':
                res = await dbe.deleteTheaterRev(data as theaterDeleted)
                break;
            default:
                throw new AdminException("Invalid event type", [eventType]);                
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