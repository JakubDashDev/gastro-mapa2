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
const asyncHandler_js_1 = __importDefault(require("../middleware/asyncHandler.js"));
const restaurantModel_js_1 = __importDefault(require("../models/restaurantModel.js"));
const getAllRestaurants = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    const filters = req.query.filters;
    const find = keyword
        ? {
            $or: [
                {
                    name: { $regex: req.query.keyword, $options: "i" },
                },
                {
                    type: { $regex: req.query.keyword, $options: "i" },
                },
                {
                    "address.city": { $regex: req.query.keyword, $options: "i" },
                },
                {
                    rating: keyword === "muala" && 5,
                },
            ],
        }
        : {};
    const filtersArray = filters && JSON.parse(filters);
    const ratings = filtersArray === null || filtersArray === void 0 ? void 0 : filtersArray.filter((item) => item.hasOwnProperty("$gte"));
    const categories = filtersArray === null || filtersArray === void 0 ? void 0 : filtersArray.filter((item) => item.hasOwnProperty("category"));
    const filter = filtersArray
        ? {
            $and: [
                ratings.length > 0
                    ? {
                        $or: ratings.map((item) => {
                            //NOTE: handling custom value of rating
                            if (item.$gte === "challange ostrości" && item.$lte === "challange ostrości") {
                                return { rating: "challange ostrości" };
                            }
                            return { rating: item };
                        }),
                    }
                    : {},
                categories.length > 0
                    ? {
                        $or: categories.map((item) => ({ category: { $regex: item.category, $options: "i" } })),
                    }
                    : {},
            ],
        }
        : {};
    const restaurants = keyword
        ? yield restaurantModel_js_1.default.find(find)
        : filters
            ? yield restaurantModel_js_1.default.find(filter)
            : yield restaurantModel_js_1.default.find();
    //
    res.json(restaurants);
}));
exports.getAllRestaurants = getAllRestaurants;
const createRestaurant = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, rating, youtubeLink, youtubeEmbed, googleLink, category, address } = req.body;
    if (typeof rating === "string") {
        if (rating !== "challange ostrości") {
            res.status(400);
            throw new Error("Zakres oceny jest nieprawdidłowy!");
        }
    }
    if (typeof rating === "number") {
        if (rating < 0.1 || rating > 5) {
            res.status(400);
            throw new Error("Zakres oceny jest nieprawdidłowy!");
        }
    }
    const restaurant = new restaurantModel_js_1.default({
        name,
        rating,
        youtubeLink,
        googleLink,
        youtubeEmbed,
        category: category,
        address,
    });
    const createdRestaurant = yield restaurant.save();
    res.status(201).json(createdRestaurant);
}));
exports.createRestaurant = createRestaurant;
const updateRestaurant = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, rating, address, category, googleLink, youtubeLink, youtubeEmbed } = req.body;
    const restaurant = yield restaurantModel_js_1.default.findById(req.params.id);
    const youtubeId = youtubeLink.split("https://youtu.be/")[1];
    //prettier-ignore
    if (restaurant) {
        restaurant.name = name,
            restaurant.rating = rating,
            restaurant.address = address,
            restaurant.category = category,
            restaurant.googleLink = googleLink,
            restaurant.youtubeLink = youtubeLink,
            restaurant.youtubeEmbed = `https://www.youtube.com/embed/${youtubeId}`;
        if (typeof rating === "string") {
            if (rating !== "challange ostrości") {
                res.status(400);
                throw new Error("Zakres oceny jest nieprawdidłowy!");
            }
        }
        if (typeof rating === "number") {
            if (rating < 0.1 || rating > 5) {
                res.status(400);
                throw new Error("Zakres oceny jest nieprawdidłowy!");
            }
        }
        const updatedRestaurant = yield restaurant.save();
        res.status(200).json(updatedRestaurant);
    }
    else {
        res.status(404);
        throw new Error("Nie znaleziono restauracji");
    }
}));
exports.updateRestaurant = updateRestaurant;
const deleteRestuarant = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurantModel_js_1.default.findById(req.params.id);
    if (restaurant) {
        yield restaurant.deleteOne({ _id: restaurant._id });
        res.status(200).json({ message: "Restauracja została usunięta!" });
    }
    else {
        res.status(404);
        throw new Error("Nie znaleziono restauracji");
    }
}));
exports.deleteRestuarant = deleteRestuarant;
