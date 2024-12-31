"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRating = void 0;
function validateRating(rating) {
    if (typeof rating === "string") {
        if (rating !== "challange ostrości") {
            throw new Error("Zakres oceny jest nieprawidłowy!");
        }
    }
    if (typeof rating === "number") {
        if (rating < 0.1 || rating > 5) {
            throw new Error("Zakres oceny jest nieprawidłowy!");
        }
    }
}
exports.validateRating = validateRating;
