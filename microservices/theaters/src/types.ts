type TheaterRequest = {
    theaterId?: string;
    name?: string;
    address?: string; 
    description?: string;
    theaterImage?: File;
    movies?: string[];
}
  
type TheaterGetBatchRequest = string[];

export {TheaterRequest, TheaterGetBatchRequest}