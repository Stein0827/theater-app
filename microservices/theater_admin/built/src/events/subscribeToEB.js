import axios from 'axios';
export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: "http://theater_admin:4006/api/v1/events",
        events: [
            "paymentCreated",
            "theaterCreated",
            "theaterDeleted"
        ]
    });
    return res;
}
