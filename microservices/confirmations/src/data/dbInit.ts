export let db: {[key: string]: string | object} = {};

function initDB() {
    db["1"] = {
        id: "1",
        movieId: "1231925sdfs",
        theaterId: "alwekjkalset12",
        creditCard: "91231ksdlg",
        address: "123dlfjkads",
        price: "44",
        email: "xiuquanshi@umass.edu",
    };
    db["2"] = {
        id: "2",
        movieId: "asdfsdfasd",
        theaterId: "dfdfdfdfd",
        creditCard: "12321ass",
        address: "xzcvzxcvzxcv",
        price: "555",
        email: "xiuquanshi@umass.edu"
    };
}

export function startupDB() {
    // connect to db
    initDB();
}