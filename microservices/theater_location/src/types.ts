export interface MovieLocationRequest {
    zipcode: string
}
export interface Event {
    eventType: string,
    eventData: object
}
export interface TheaterData {
    theaterId: string,
    zip: string,
}

export interface DeletionData {
    zip: string,
    theaterId: string
}
