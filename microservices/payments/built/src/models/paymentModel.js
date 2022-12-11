"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const dbe = __importStar(require("../data/dbComms.js"));
class PaymentModel {
    constructor(data) {
        this.payment_id = data.payment_id;
        this.movie_id = data.movie_id;
        this.theater_id = data.theater_id;
        this.date = data.date;
        this.concession = data.concessions;
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
    createPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            validateCreateRequest(this);
            try {
                const payment = yield dbe.createPayment(this);
                return payment;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            validatePaymentRequest(this);
            try {
                yield validatePaymentExists(this);
            }
            catch (err) {
                throw err;
            }
            try {
                const movie = yield dbe.getPayment(this.payment_id);
                return movie;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.PaymentModel = PaymentModel;
function validateCreateRequest(data) {
    let invalidAttributes = [];
    let attributes = Object.keys(data);
    attributes.shift();
    const required_attributes = new Set(attributes);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute] === "" || data[attribute] === undefined) {
            invalidAttributes.push(attribute);
        }
    });
    if (invalidAttributes.length !== 0) {
        throw new PaymentException("Error: Invalid Attributes", invalidAttributes);
    }
}
function validatePaymentRequest(data) {
    if (data.payment_id === undefined || typeof data.payment_id !== "number") {
        throw new PaymentException("Error: Invalid ID", [data.payment_id.toString()]);
    }
}
function validatePaymentExists(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hasMovie = yield dbe.hasPayment(data.payment_id);
            if (!(hasMovie)) {
                throw new PaymentException("Error: Payment does not exists", [data.payment_id.toString()]);
            }
        }
        catch (err) {
            throw err;
        }
    });
}
class PaymentException {
    constructor(message, errorList) {
        this.name = "Payment Exception";
        this.message = message;
        this.list = errorList;
    }
}
