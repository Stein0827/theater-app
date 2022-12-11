import axios from 'axios';

export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: "http://theaters_app:4009/api/v1/event",
        events: ["te1", "te2"]
    });

    return res;
}
