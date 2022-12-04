import { PaymentRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { validateLocaleAndSetLanguage } from '../../node_modules/typescript/lib/typescript.js';

export class PaymentModel {
    movie_id: string | undefined;
    theater_id: string | undefined;
    time: string | undefined;
    price: string | undefined;
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
        this.movie_id = data.movie_id;
        this.theater_id = data.theater_id;
        this.time = data.time;
        this.price = data.price;
        this.fname = data.fname;
        this.lname = data.lname;
        this.cardnum = data.cardnum;
        this.seccode = data.seccode;
        this.cardexp = data.cardexp;
        this.bstreet = data.bstreet;
        this.bunit = data.bunit;
        this.bstate = data.bstate;
        this.bcountry = data.bcountry;
        this.zip = data.zip;
    }

    createPayment() {
        const invalidAttributes: string[] = getInvalidRequestAttributes(this);
        if (invalidAttributes.length === 0) {
            dbe.createPayment(this);
        } else {
            throw new PaymentException(invalidAttributes)
        }
    }    
}

function getInvalidRequestAttributes(model: PaymentModel) {
    let invalidList : string[] = [];
    const required_attributes = new Set(Object.getOwnPropertyNames(model));
    
    required_attributes.forEach(attribute => {
        if (!(attribute in model) || model[attribute as keyof typeof model] === "" || model[attribute as keyof typeof model] === undefined) {
           invalidList.push(attribute)
        }
    });

    return invalidList;
}

class PaymentException extends Error {
    list: string[];

    constructor (errorList: string[]) {
        super("Invalid attributes");
        this.list = errorList;
    }
}