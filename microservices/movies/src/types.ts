type MovieRequest = {
    movie_id?: string;
    name?: string;
    desc?: string; 
    length?: string;
    rating?: string;
    thumbnail?: File; // uploaded image file
    trailer?: string; // url of youtube video
}
  
type MovieGetBatchRequest = string[];

export {MovieRequest, MovieGetBatchRequest}