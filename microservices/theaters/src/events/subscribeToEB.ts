import axios from 'axios';

export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: "http://theaters:4009/api/v1/event",
        events: ["userCreated"]
    });

    return res;
}
