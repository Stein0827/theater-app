import { RowDataPacket } from "mysql2"

export interface IMovie extends RowDataPacket {
    movie_id?: number;
    name?: string;
    desc?: string; 
    length?: string;
    rating?: string;
    thumbnail?: string; // uploaded image file
    trailer?: string;
}

type MovieRequest = {
    movie_id?: number;
    name?: string;
    desc?: string; 
    length?: string;
    rating?: string;
    thumbnail?: string; // uploaded image file
    trailer?: string; // url of youtube video
}
  
type MovieGetBatchRequest = number[];

export {MovieRequest, MovieGetBatchRequest}