"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const getSalesController_1 = require("../controllers/getSalesController");
const auth_1 = require("../auth/auth");
const router = (0, express_1.Router)();
exports.router = router;
// check if user if theater admin before executing endpoint
router.get('/api/revenue', auth_1.adminAuth, getSalesController_1.getSales);
