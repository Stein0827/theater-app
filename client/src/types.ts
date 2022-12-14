export type MovieRequest = {
    movie_id: number | undefined;
    name: string | undefined;
    desc: string | undefined;
    length: string | undefined;
    rating: string | undefined;
    thumbnail: string | undefined;
    trailer: string | undefined;
}

export type TheaterModel = {
    id: string | undefined;
    name: string | undefined;
    address: string | undefined;
    zip: number | undefined;
    description: string | undefined;
    image: string | undefined;
    movies: number[] | undefined;
}

export type ConcessionModel = {
    id: string | undefined;
    name: string | undefined;
    type: string | undefined;
    price: number | undefined;
    image: string | undefined;
}