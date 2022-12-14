import { PaymentRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class PaymentModel {
    payment_id: number | undefined;
    movie_id: number | undefined;
    theater_id: string | undefined;
    date: Date | undefined;
    showing: string | undefined
    concessions: number | undefined;
    tickets: number | undefined;
    email: string | undefined;
    fname: string | undefined;
    lname: string | undefined;
    cardnum: string | undefined;
    seccode: string | undefined;
    cardexp: string | undefined;
    bstreet: string | undefined;
    bunit: string | undefined;
    bstate: string | undefined;
    bcountry: string | undefined;
    zip: string | undefined;

    constructor(data: PaymentRequest) {
        this.payment_id = data.payment_id;
        this.movie_id = data.movie_id;
        this.theater_id = data.theater_id;
        this.date = data.date;
        this.showing = data.showing;
        this.concessions = data.concessions
        this.tickets = data.tickets;
        this.fname = data.fname;
        this.lname = data.lname;
        this.email = data.email;
        this.cardnum = data.cardnum;
        this.seccode = data.seccode;
        this.cardexp = data.cardexp;
        this.bstreet = data.bstreet;
        this.bunit = data.bunit;
        this.bstate = data.bstate;
        this.bcountry = data.bcountry;
        this.zip = data.zip;
    }

    async createPayment(): Promise<PaymentModel> {        
        validateCreateRequest(this);

        try {
            const payment = await dbe.createPayment(this);
            return payment;
        } catch (err) {
            throw err;
        }
    }
    
    async getPayment() {
        validatePaymentRequest(this);

        try {
            await validatePaymentExists(this);
        } catch (err) {
            throw err;
        }

        try {
            const movie = await dbe.getPayment(this.payment_id as number);
            return movie;
        } catch (err) {
            throw err;
        }
    }
}

function validateCreateRequest(data: PaymentModel) {
    let invalidAttributes: string[] = [];

    let attributes = Object.keys(data);
    attributes.shift();

    const required_attributes = new Set(attributes);

    required_attributes.forEach(attribute => {
        if (attribute !== "concessions" && (!(attribute in data) || data[attribute as keyof typeof data] === "" || data[attribute as keyof typeof data] === undefined)) {
            invalidAttributes.push(attribute);
        }
    });

    if (invalidAttributes.length !== 0) {
        throw new PaymentException("Error: Invalid Attributes", invalidAttributes);
    }
}

function validatePaymentRequest(data: PaymentModel) {
    if (data.payment_id === undefined || typeof data.payment_id !== "number") {
        throw new PaymentException("Error: Invalid ID", [(data.payment_id as unknown as number).toString()]);
    }
}

async function validatePaymentExists(data: PaymentModel) {
    try {
        const hasMovie = await dbe.hasPayment(data.payment_id as number);
        if (!(hasMovie)) {
            throw new PaymentException("Error: Payment does not exists", [(data.payment_id as unknown as number).toString()]);
        }
    } catch (err) {
        throw err;
    }
}

class PaymentException {
    list: string[];
    name: string;
    message: string;

    constructor (message:string, errorList: string[]) {
        this.name = "Payment Exception";
        this.message = message;
        this.list = errorList;
    }
}