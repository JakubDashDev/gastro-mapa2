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
const extractSort_1 = require("../utils/restaurantController/extractSort");
const extractKeywords_1 = require("../utils/restaurantController/extractKeywords");
const extractFilters_1 = require("../utils/restaurantController/extractFilters");
const generateFinalQuery_1 = require("../utils/restaurantController/generateFinalQuery");
const validateRating_1 = require("../utils/restaurantController/validateRating");
const listRestaurants = (Restaurant) => (req) => {
    const { categories, ratings } = (0, extractFilters_1.extractFilters)(req);
    const sort = (0, extractSort_1.extractSort)(req);
    const keywords = (0, extractKeywords_1.extractKeywords)(req);
    const finalQuery = (0, generateFinalQuery_1.generateFinalQuery)(keywords, ratings, categories);
    return Restaurant.find(finalQuery).sort(sort).lean();
};
const createRestaurant = (Restaurant) => (req) => {
    const { name, rating, youtubeLink, youtubeEmbed, googleLink, category, address, geometry } = req.body;
    (0, validateRating_1.validateRating)(rating);
    const restaurant = new Restaurant({
        name,
        rating,
        youtubeLink,
        googleLink,
        youtubeEmbed,
        category: category,
        address,
        geometry,
    });
    return restaurant.save();
};
const updateRestaurant = (Restaurant) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, rating, youtubeLink, youtubeEmbed, googleLink, category, address, geometry } = req.body;
    const currentRestaurant = yield Restaurant.findById(req.params.id);
    if (!currentRestaurant)
        throw new Error("Nie znaleziono restauracji");
    (0, validateRating_1.validateRating)(rating);
    //prettier-ignore
    currentRestaurant.name = name,
        currentRestaurant.rating = rating,
        currentRestaurant.address = address,
        currentRestaurant.category = category,
        currentRestaurant.googleLink = googleLink,
        currentRestaurant.youtubeLink = youtubeLink,
        currentRestaurant.youtubeEmbed = `https://www.youtube.com/embed/${youtubeLink.split("https://youtu.be/")[1]}`;
    currentRestaurant.geometry = geometry;
    return currentRestaurant.save();
});
const deleteRestuarant = (Restaurant) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    const currentRestaurant = yield Restaurant.findById(req.params.id);
    if (!currentRestaurant)
        throw new Error("Nie znaleziono restauracji");
    return currentRestaurant.deleteOne({ _id: currentRestaurant.id });
});
exports.default = (Restaurant) => {
    return {
        listRestaurants: listRestaurants(Restaurant),
        createRestaurant: createRestaurant(Restaurant),
        updateRestaurant: updateRestaurant(Restaurant),
        deleteRestuarant: deleteRestuarant(Restaurant),
    };
};
