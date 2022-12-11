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