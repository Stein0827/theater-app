export interface SubscribeRequest {
    url: string,
    events: string[]
}
export interface PublishRequest {
    eventType: string,
    eventData: object
}

// Publisher: Movies Service
// Subscribers: Theaters Service
export type movieCreated = {
    eventType: "movieCreatedEvent";
    eventData: {
        movie_id: number;
    }
}

// Publisher: Movies Service
// Subscribers: Theaters Service
export type movieDeleted = {
    eventType: "movieDeletedEvent";
    eventData: {
        movie_id: number;
    }
}

// Publisher: Theater Service
// Subscribers: Moviesops Service
export type theaterAddedMovie = {
    eventType: "theaterAddedMovie";
    eventData: {
        theater_id: string;
        movie_id: number;
    }
}

// Publisher: Theater Service
// Subscribers: Moviesops Service
export type theaterRemovedMovie = {
    eventType: "theaterRemovedMovie";
    eventData: {
        theater_id: string;
        movie_id: number;
    }
}

// Publisher: Theater Service
// Subscribers: Moviesops Service
export type theaterCreated = {
    eventType: "theaterCreated";
    eventData: {
        theater_id: string;
    }
}

// Publisher: Theater Admin Service
// Subscribers: Moviesops Service, Theater Service
export type theaterDeleted = {
    eventType: "theaterDeleted";
    eventData: {
        theater_id: string;
    }
}

// Publisher: Payment Service
// Subscribers: Theater Admin Service, Confirmations Service
export type paymentCreated = {
    eventType: "paymentCreated";
    eventData: {
        payment_id: number | undefined;
        movie_id: number | undefined;
        theater_id: string | undefined;
        date: Date | undefined;
        showing: string | undefined
        concession: number | undefined;
        tickets: number | undefined;
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
    };
}