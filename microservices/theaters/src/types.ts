type TheaterRequest = {
    theaterId?: string;
    name?: string;
    address?: string;
    zip?: number;
    description?: string;
    theaterImage?: File;
    movies?: string[];
}
  
type TheaterGetBatchRequest = string[];

export {TheaterRequest, TheaterGetBatchRequest}