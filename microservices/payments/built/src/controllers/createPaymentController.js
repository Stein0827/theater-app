"use strict";
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
exports.createPayment = void 0;
const paymentModel_js_1 = require("../models/paymentModel.js");
const publishEvent_js_1 = require("../events/publishEvent.js");
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const paymentModel = new paymentModel_js_1.PaymentModel(data);
        const newPayment = yield paymentModel.createPayment().catch((err) => { throw err; });
        yield (0, publishEvent_js_1.publishEvent)("paymentCreated", newPayment);
        res.status(200).send(newPayment);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createPayment = createPayment;
