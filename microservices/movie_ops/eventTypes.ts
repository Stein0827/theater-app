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
export type movieListUpdated = {
    eventType: "movieListUpdated";
    eventData: {
        movieAdded: boolean;
        movie_id: number;
        theater_id: string;
    }
}

// Publisher: Theater Service
// Subscribers: Moviesops Service
export type theaterCreated = {
    eventType: "theaterCreated";
    eventData: {
        theater_id: string;
        zip: string | undefined;
    }
}

// Publisher: Theater Admin Service
// Subscribers: Moviesops Service, Theater Service
export type theaterDeleted = {
    eventType: "theaterDeleted";
    eventData: {
        theater_id: string;
        zip: string;
    }
}
