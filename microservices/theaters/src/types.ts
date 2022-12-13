type TheaterRequest = {
    theaterId?: string;
    name?: string;
    address?: string;
    zip?: string;
    description?: string;
    theaterImage?: string;
    movies?: number[];
}
  
type TheaterGetBatchRequest = string[];

export {TheaterRequest, TheaterGetBatchRequest}