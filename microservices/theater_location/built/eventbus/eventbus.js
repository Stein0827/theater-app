import axios from 'axios';
export async function subscribeToBus() {
    const url = 'http://theater_location/4008/api/events';
    const events = [
        'TheaterCreated',
        'TheaterDeleted',
        'TheaterUpdater'
    ];
    const data = {
        url,
        events
    };
    console.log("Sending subscription");
    const res = await axios.post('http://eventbus:4000/api/v1/subscribe', data);
    if (res !== 'SUCCESS') {
        console.log("Error: failed to subscribe to eventbus");
    }
    console.log("Sent subscription");
}
