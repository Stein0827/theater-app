type ConcessionRequest = {
    snackId?: string;
    name?: string;
    type?: string; 
    price?: number;
    image?: string;
}
  
type ConcessionGetBatchRequest = string[];

export {ConcessionRequest, ConcessionGetBatchRequest}