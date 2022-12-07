type ConfirmationRequest = {
    confirmationId?: string;
    movieId?: string;
    theaterId?: string; 
    creditCard?: string;
    billingAddr?: string;
    price?: number;
    email?: string;
}
  
type ConfirmationGetBatchRequest = string[];

export {ConfirmationRequest, ConfirmationGetBatchRequest}