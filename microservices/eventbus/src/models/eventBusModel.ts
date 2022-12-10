import axios from 'axios';
import { PublishRequest, SubscribeRequest, EventBus } from '../types.js';

class EventBusModel {
    eventbus: EventBus

    constructor() {
        this.eventbus = {};
    }

    publish(data: PublishRequest) {
        this.validatePublishRequest(data);
        const success = this.publishEvent(data);
        return success;
    }

    subscribe(data: SubscribeRequest) {
        this.validateSubscribeRequest(data);
        this.populateBus(data);
    }

    populateBus(data: SubscribeRequest) {
        const url = data.url;
        const events = data.events;

        for (const event of events) {
            if (event in this.eventbus) {
              this.eventbus[event].push(url);
            } else {
              this.eventbus[event] = [url];
            }
        }
        console.log(JSON.stringify(this.eventbus));
    }

    async publishEvent(data: PublishRequest) {
        let success = true;
        const eventType = data.eventType;
        const eventData = data.eventData;
        const urlList = this.eventbus[eventType];

        for(const url of urlList) {
            console.log(`URL: ${url}`);
            console.log(`DATA: ${JSON.stringify(eventData)}`);
            await axios.post(url, eventData).catch((err: Error) => {
                console.log(`Error sending event: ${eventType}. ${err.message}`);
                success = false;
            });
        }
        return success;
    }
    
    validatePublishRequest(data: PublishRequest) {
        const eventType = data.eventType;
        const eventData = data.eventData;

        if (!eventType || typeof eventType !== 'string' || eventType === "" || !eventData || !(eventType in this.eventbus)) {
            throw new EventBusException(
                "event type or event data are invalid",
                [eventType, JSON.stringify(eventData)]
            );
        }    
    }
    
    validateSubscribeRequest(data: SubscribeRequest) {
        const url = data.url;
        const events = data.events;

        if (
            !url || typeof url !== 'string' || url === "" || !events || 
            events.length === 0 || !events.every(event => typeof(event) === 'string')
        ) {
            throw new EventBusException(
                "url or events are invalid",
                [url, JSON.stringify(events)]
            );
        }
    }
}

export class EventBusException {
    list: string[];
    name: string;
    message: string;

    constructor(message: string, errorList: string[]) {
        this.name = "Eventbus Exception";
        this.message = message;
        this.list = errorList;
    }
}

export const eventBus = new EventBusModel();