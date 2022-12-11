"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeService = void 0;
const eventBusModel_1 = require("../models/eventBusModel");
const subscribeService = (req, res) => {
    try {
        const data = req.body;
        eventBusModel_1.eventBus.subscribe(data);
        res.status(200).send("SUCCESS");
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message} with input ${err.list}`);
    }
};
exports.subscribeService = subscribeService;
