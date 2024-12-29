"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRatingQuery = void 0;
function generateRatingQuery(ratings) {
    const ratingsQuery = ratings.length > 0
        ? {
            $or: ratings.map((item) => {
                if (item.$gte === "challange ostrości" && item.$lte === "challange ostrości") {
                    return { rating: "challange ostrości" };
                }
                return { rating: item };
            }),
        }
        : {};
    return ratingsQuery;
}
exports.generateRatingQuery = generateRatingQuery;
