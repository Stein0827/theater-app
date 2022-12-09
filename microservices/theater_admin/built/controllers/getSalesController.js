"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSales = void 0;
const adminModel_1 = require("../models/adminModel");
const getSales = (req, res) => {
    try {
        const data = req.body;
        const adminModel = new adminModel_1.AdminModel(data);
        const theaterRev = adminModel.getRevenue();
        res.status(200).send(theaterRev);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
};
exports.getSales = getSales;
