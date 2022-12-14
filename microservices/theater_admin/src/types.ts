export interface TheaterRevenue {
    theaterId: string,
    ticketRevenue: number,
    concessionsRevenue: number,
    date: Date
}

export interface SalesRequest {
    theaterId: string
}
export interface Event {
    eventType: string,
    eventData: object
}