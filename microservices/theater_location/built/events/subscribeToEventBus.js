import axios from 'axios';
export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: 'http://theater_location:4008/api/v1/events',
        events: [
            'A'
        ]
    });
    return res;
}
