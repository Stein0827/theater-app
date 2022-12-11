type TheaterRequest = {
    theaterId?: string;
    name?: string;
    address?: string;
    zip?: number;
    description?: string;
    theaterImage?: File;
    movies?: number[];
}
  
type TheaterGetBatchRequest = string[];

export {TheaterRequest, TheaterGetBatchRequest}