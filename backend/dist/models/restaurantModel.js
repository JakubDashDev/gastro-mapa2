"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const RestaurantSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
        _id: false,
    },
    geometry: {
        coordinates: { type: [Number], required: true },
    },
    category: { type: [String], required: true },
    rating: { type: mongoose_1.Schema.Types.Mixed, required: [true, "To pole nie może być puste!"] },
    youtubeEmbed: { type: String, required: true },
    youtubeLink: { type: String, required: true },
    googleLink: { type: String, required: true },
}, { timestamps: true });
RestaurantSchema.index({ name: "text", "address.city": "text", category: "text" });
const Restaurant = mongoose_1.default.model("Restaurant", RestaurantSchema);
exports.default = Restaurant;
