import axios from 'axios';

export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: "http://movies_app:4004/api/v1/event",
        events: []
    });

    return res;
}
