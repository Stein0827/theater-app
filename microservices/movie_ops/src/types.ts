export type OperationsRequest = {
    movie_id?: string;
    theater_id?: string;
    operations?: Operations;
}

export type Operations = {
    [key: string] : number;
}
