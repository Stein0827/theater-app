"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishService = void 0;
const eventBusModel_1 = require("../models/eventBusModel");
const publishService = (req, res) => {
    try {
        const data = req.body;
        const success = eventBusModel_1.eventBus.publish(data);
        res.status(200).send(success);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message}`);
    }
};
exports.publishService = publishService;
