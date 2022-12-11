import { OkPacket } from 'mysql2';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { db } from '../index.js';
import { PaymentModel } from "../models/paymentModel";
import { IPayment } from '../types.js';
import { insert } from './queries.js'

export function createPayment(model: PaymentModel): Promise<PaymentModel> {
    const values: string[] = Object.values(model);
    values.shift();

    return new Promise((resolve, reject) => {
        (db as Connection).query<OkPacket>(insert, [values], 
            (error, result) => {       
            console.log(error)         
            if (error) {
                reject(new DatabaseException(error.message));
            }
            
            model.payment_id = result.insertId;
            resolve(model);
        });        
    });
}

export function getPayment(id: number): any {
    return new Promise((resolve, reject) => {
        (db as Connection).query<IPayment[]>(
            "SELECT * FROM Payments WHERE payment_id=?;", [id],
            (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(results[0]);
        });
    });
}

export function hasPayment(id: number) {
    return new Promise<boolean>((resolve, reject) => {
        (db as Connection).query<IPayment[]>(
            "SELECT * FROM Payments WHERE payment_id=?;", [id],
            (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            if (results.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });  
}

class DatabaseException{
    name: string;
    message: string;

    constructor (message:string) {
        this.name = "Database Exception";
        this.message = message;
    }
}