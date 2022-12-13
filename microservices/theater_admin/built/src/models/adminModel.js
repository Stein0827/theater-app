var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AdminModel_instances, _AdminModel_processRevenue, _AdminModel_convertDates;
import * as dbe from '../data/dbComms.js';
export class AdminModel {
    constructor(data = { theaterId: "" }) {
        _AdminModel_instances.add(this);
        this.theaterId = data.theaterId;
    }
    async getRevenue() {
        this.validateRequest();
        const revObj = await dbe.getRevenue(this.theaterId);
        return __classPrivateFieldGet(this, _AdminModel_instances, "m", _AdminModel_processRevenue).call(this, revObj);
    }
    validateRequest() {
        const theaterId = this.theaterId;
        if (!theaterId || typeof theaterId !== 'string' || theaterId === "") {
            throw new AdminException("Invalid theater id", [theaterId]);
        }
    }
    async processEvent(data) {
        if (!this.validateEventRequest(data)) {
            throw new AdminException("Invalid Event", [JSON.stringify(data.eventData)]);
        }
        let res;
        const eventType = data.eventType;
        const eventData = data.eventData;
        switch (eventType) {
            case 'paymentCreated':
                res = await dbe.addRevenue(eventData);
                break;
            case 'theaterCreated':
                res = await dbe.createTheaterRev(eventData);
                break;
            case 'theaterDeleted':
                res = await dbe.deleteTheaterRev(eventData);
                break;
            default:
                throw new AdminException("Invalid event type", [eventType]);
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
}
_AdminModel_instances = new WeakSet(), _AdminModel_processRevenue = function _AdminModel_processRevenue(revObj) {
    if (revObj.length === 0) {
        return revObj;
    }
    //convert the dates from ISO to a Date object
    revObj = __classPrivateFieldGet(this, _AdminModel_instances, "m", _AdminModel_convertDates).call(this, revObj);
    const totalTicketRevenue = revObj.reduce((acc, e) => acc += e.ticketRevenue, 0);
    const totalConcessionRevenue = revObj.reduce((acc, e) => acc += e.concessionsRevenue, 0);
    const totalRev = {
        revObj,
        totalTicketRevenue,
        totalConcessionRevenue
    };
    return totalRev;
}, _AdminModel_convertDates = function _AdminModel_convertDates(revObj) {
    for (const rev of revObj) {
        rev.date = new Date(rev.date);
    }
    return revObj;
};
export class AdminException {
    constructor(message, errorList) {
        this.name = "Admin Exception";
        this.message = message;
        this.list = errorList;
    }
}
