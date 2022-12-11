export interface SubscribeRequest {
    url: string,
    events: string[]
}

export interface PublishRequest {
    eventType: string,
    eventData: object
}

export type movieCreatedEvent = {
    eventType: string;
    eventData: {
        movie_id: number;
    }
}

export type movieDeletedEvent = {
    eventType: string;
    eventData: {
        movie_id: number;
    }
}

export type theaterAddedMovie = {
    eventType: string;
    eventData: {
        theater_id: string;
        movie_id: number;
    }
}

export type theaterRemovedMovie = {
    eventType: string;
    eventData: {
        theater_id: string;
        movie_id: number;
    }
}

export type theaterCreated = {
    eventType: string;
    eventData: {
        theater_id: string;
    }
}