import axios from 'axios';

export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: 'http://theater_identity:4007/api/v1/events',
        events: [
            'theaterCreated',
            'theaterDeleted'
        ]
    });

    return res;
}