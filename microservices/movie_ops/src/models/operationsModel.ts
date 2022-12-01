import { OperationsRequest, Operations } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class OperationsModel {
    movie_id: string | undefined;
    theater_id: string | undefined;
    operations: Operations | undefined;

    constructor(data: OperationsRequest) {
        this.movie_id = data.movie_id;
        this.theater_id = data.theater_id;
        this.operations = data.operations;
    }

    createOperations() {
        // For each operation run a query
        return dbe.createOperations(this);
    }

    updateOperations() {
        // For each operation run a query
        return dbe.updateOperations(this);
    }

    getOperations() {
        return dbe.getOperations(this);
    }

    deleteOperations() {
        // For each operation run a query
        return dbe.deleteOperations(this.movie_id as string, this.theater_id as string);
    }
}