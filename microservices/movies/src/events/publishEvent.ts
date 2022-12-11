import axios from 'axios';

export async function publishEvent(eventtype: string, data: Object) {
    const res = await axios.post('http://eventbus:4000/api/v1/publish', {
        eventType: eventtype,
        eventData: data
    });

    return res;
}
