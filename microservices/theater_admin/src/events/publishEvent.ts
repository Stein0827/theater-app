import axios from 'axios';

export async function publishEvent(eventType: string, data: Object) {
    const res = await axios.post('http://eventbus:4000/api/v1/publish', {
        eventType: eventType,
        eventData: data 
    });

    return res;
}
