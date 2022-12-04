type ConcessionRequest = {
    snackId?: string;
    name?: string;
    type?: string; 
    price?: number;
    image?: File;
}
  
type ConcessionGetBatchRequest = string[];

export {ConcessionRequest, ConcessionGetBatchRequest}