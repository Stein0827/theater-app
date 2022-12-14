import axios from 'axios';
export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: "http://confirmations:4002/api/v1/event",
        events: ["paymentCreated"]
    });
    return res;
}
