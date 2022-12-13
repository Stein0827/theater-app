export type OperationsRequest = {
    movie_id?: number;
    theater_id?: string;
    operations?: Operations;
}

export type Operations = {
    [key: string] : number;
}

export type MongoDoc = {
    theater_id: string;
    operations: Operation[]
}

export type Operation = {
    movie_id: number;
    logistics: Logistics;
}

export type Logistics = {
    [key: string] : number;
}