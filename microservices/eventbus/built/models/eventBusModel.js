"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = exports.EventBusException = void 0;
const axios_1 = __importDefault(require("axios"));
class EventBusModel {
    constructor() {
        this.eventbus = {};
    }
    publish(data) {
        this.validatePublishRequest(data);
        const success = this.publishEvent(data);
        return success;
    }
    subscribe(data) {
        this.validateSubscribeRequest(data);
        this.populateBus(data);
    }
    populateBus(data) {
        const url = data.url;
        const events = data.events;
        for (const event of events) {
            if (event in this.eventbus) {
                this.eventbus[event].push(url);
            }
            else {
                this.eventbus[event] = [url];
            }
        }
        console.log(JSON.stringify(this.eventbus));
    }
    publishEvent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let success = true;
            const eventType = data.eventType;
            const eventData = data.eventData;
            const urlList = this.eventbus[eventType];
            for (const url of urlList) {
                console.log(`URL: ${url}`);
                console.log(`DATA: ${JSON.stringify(eventData)}`);
                yield axios_1.default.post(url, eventData).catch((err) => {
                    console.log(`Error sending event: ${eventType}. ${err.message}`);
                    success = false;
                });
            }
            return success;
        });
    }
    validatePublishRequest(data) {
        const eventType = data.eventType;
        const eventData = data.eventData;
        if (!eventType || typeof eventType !== 'string' || eventType === "" || !eventData || !(eventType in this.eventbus)) {
            throw new EventBusException("event type or event data are invalid", [eventType, JSON.stringify(eventData)]);
        }
    }
    validateSubscribeRequest(data) {
        const url = data.url;
        const events = data.events;
        if (!url || typeof url !== 'string' || url === "" || !events ||
            events.length === 0 || !events.every(event => typeof (event) === 'string')) {
            throw new EventBusException("url or events are invalid", [url, JSON.stringify(events)]);
        }
    }
}
class EventBusException {
    constructor(message, errorList) {
        this.name = "Eventbus Exception";
        this.message = message;
        this.list = errorList;
    }
}
exports.EventBusException = EventBusException;
exports.eventBus = new EventBusModel();
