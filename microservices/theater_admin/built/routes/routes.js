"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const getSalesController_1 = require("../controllers/getSalesController");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/api/revenue', getSalesController_1.getSales);
