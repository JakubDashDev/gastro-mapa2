"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
const restaurantService_1 = __importDefault(require("./restaurantService"));
exports.default = (0, restaurantService_1.default)(restaurantModel_1.default);
