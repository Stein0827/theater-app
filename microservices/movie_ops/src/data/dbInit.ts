export let db: {[key: string]: string | object} = {};

/*
theaterid {
    movieid {
        time: capacity
    }
}
*/
function initDB() {
    db["1t"] = {
        "1m": {
            "1:00pm": 5,
            "1:30pm": 10
        },
        "2m": {
            "1:00pm": 5,
            "1:30pm": 10
        }
    };
}

export function startupDB() {
    // connect to db
    initDB();
}