"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.RestaurantService = void 0;
const adminUserModel_1 = __importDefault(require("../models/adminUserModel"));
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
const authService_1 = __importDefault(require("./authService"));
const restaurantService_1 = __importDefault(require("./restaurantService"));
exports.RestaurantService = (0, restaurantService_1.default)(restaurantModel_1.default);
exports.AuthService = (0, authService_1.default)(adminUserModel_1.default);
