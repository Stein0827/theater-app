import axios from 'axios';

export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: "http://payments:4005/api/v1/event",
        events: []
    });

    return res;
}
