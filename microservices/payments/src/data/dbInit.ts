export let db: {[key: string]: string | object} = {};

/*
confirmationId {
    movie_id: string | undefined;
    theater_id: string | undefined;
    time: string | undefined;
    price: string | undefined;
    email: string | undefined;
    fname: string | undefined;
    lname: string | undefined;
    cardnum: string | undefined;
    seccode: string | undefined;
    cardexp: string | undefined;
    bstreet: string | undefined;
    bunit: string | undefined;
    bstate: string | undefined;
    bcountry: string | undefined;
    zip: string | undefined;
}
*/
function connectDB() {
    throw new Error('Function not implemented.');
}

function initDB() {
    throw new Error('Function not implemented.');
}

export function startupDB() {
    connectDB();
    initDB();
}