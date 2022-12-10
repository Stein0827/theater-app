import axios from 'axios';
export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: "http://movies:4004/api/v1/events",
        events: ["te1", "te2"]
    });
    return res;
}
