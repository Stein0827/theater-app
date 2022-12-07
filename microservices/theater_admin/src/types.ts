export interface TheaterRevenue {
    theaterId: string,
    ticketRevenue: number,
    concessionsRevenue: number,
    date: Date
}

export interface SalesRequest {
    theaterId: string
}