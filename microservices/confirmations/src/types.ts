type ConfirmationRequest = {
    confirmationId?: string;
    movieId?: number;
    theaterId?: string; 
    creditCard?: string;
    billingAddr?: string;
    price?: number;
    email?: string;
}
  
type ConfirmationGetBatchRequest = string[];

export type PaymentRequest = {
    payment_id?: number;
    movie_id?: number;
    theater_id?: string;
    date?: Date;
    showing?: string;
    concessions?: number;
    tickets?: number;
    email?: string;
    fname?: string;
    lname?: string;
    cardnum?: string;
    seccode?: string;
    cardexp?: string;
    bstreet?: string;
    bunit?: string;
    bstate?: string;
    bcountry?: string;
    zip?: string;
}

export {ConfirmationRequest, ConfirmationGetBatchRequest}