import axios from 'axios';

export async function subscribeToEventbus() {
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', {
        url: "http://movie_ops:4003/api/v1/event",
        events: ["theaterAddedMovie", "theaterRemovedMovie"]
    });

    return res;
}
