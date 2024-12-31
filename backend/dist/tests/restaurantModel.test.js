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
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
const restaurant_one = new restaurantModel_1.default({
    name: "Restaurant 1",
    address: { city: "Kraków", country: "Polska", street: "Krakowska", zipCode: "31-924" },
    category: ["Kebab"],
    createdAt: Date.now(),
    geometry: {
        coordinates: [21.234, 21.234],
    },
    googleLink: "google.com",
    rating: 4,
    updatedAt: Date.now(),
    youtubeEmbed: "youtube.com",
    youtubeLink: "youtube.com",
});
const restaurant_two = new restaurantModel_1.default({
    name: "Restaurant 2",
    address: { city: "Warszawa", country: "Polska", street: "Krakowska", zipCode: "31-924" },
    category: ["pizza"],
    createdAt: Date.now(),
    geometry: {
        coordinates: [21.234, 21.234],
    },
    googleLink: "google.com",
    rating: 5,
    updatedAt: Date.now(),
    youtubeEmbed: "youtube.com",
    youtubeLink: "youtube.com",
});
it("gets restaurants", () => __awaiter(void 0, void 0, void 0, function* () {
    //Arrange
    yield restaurant_one.save();
    yield restaurant_two.save();
    //Act
    const result = yield restaurantModel_1.default.find();
    //Assert
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Restaurant 1");
    expect(result[1].name).toBe("Restaurant 2");
}));
it("create restaurant", () => __awaiter(void 0, void 0, void 0, function* () {
    //Arrange
    const expected = "Restaurant 1";
    //Act
    const newRestaurant = yield restaurant_one.save();
    //Assert
    expect(newRestaurant.name).toBe(expected);
}));
it("update restaurant", () => __awaiter(void 0, void 0, void 0, function* () {
    //Arrange
    const restaurant = yield restaurant_one.save();
    const expected = "Restaurant 1.1";
    //Act
    restaurant.name = "Restaurant 1.1";
    const newRestaurant = yield restaurant.save();
    //Assert
    expect(newRestaurant.name).toBe(expected);
}));
it("delete restaurant", () => __awaiter(void 0, void 0, void 0, function* () {
    //Arrange
    const restaurant = yield restaurant_one.save();
    //Act
    const result = yield restaurant.deleteOne({ _id: restaurant._id });
    //Arrange
    expect(result.deletedCount).toBe(1);
}));
