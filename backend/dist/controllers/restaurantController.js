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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestuarant = exports.updateRestaurant = exports.createRestaurant = exports.getAllRestaurants = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const services_1 = __importDefault(require("../services/"));
const getAllRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurants = yield services_1.default.listRestaurants(req);
    res.json(restaurants);
});
exports.getAllRestaurants = getAllRestaurants;
const createRestaurant = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield services_1.default.createRestaurant(req);
    res.status(201).json(restaurant);
}));
exports.createRestaurant = createRestaurant;
const updateRestaurant = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield services_1.default.updateRestaurant(req);
    res.status(200).json(restaurant);
}));
exports.updateRestaurant = updateRestaurant;
const deleteRestuarant = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield services_1.default.deleteRestuarant(req);
    if (restaurant.deletedCount > 0)
        res.status(200).json({ message: "Restauracja została usunięta!" });
}));
exports.deleteRestuarant = deleteRestuarant;
