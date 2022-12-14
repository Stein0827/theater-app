export interface MovieLocationRequest {
    zipcode: string
}
export interface Event {
    eventType: string,
    eventData: object
}
export interface TheaterData {
    id: string,
    zip: string,
}

export type TheaterModel = {
    id: string | undefined;
    name: string | undefined;
    address: string | undefined;
    zip: string | undefined;
    description: string | undefined;
    image: string | undefined;
    movies: number[] | undefined;
}
