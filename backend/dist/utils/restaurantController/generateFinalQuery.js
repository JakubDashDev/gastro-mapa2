"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFinalQuery = void 0;
const generateCategoryQuery_1 = require("./generateCategoryQuery");
const generateRatingQuery_1 = require("./generateRatingQuery");
function generateFinalQuery(keywords, ratings, categories) {
    let finalQuery = {};
    const ratingsQuery = (0, generateRatingQuery_1.generateRatingQuery)(ratings);
    const categoriesQuery = (0, generateCategoryQuery_1.generateCategoryQuery)(categories);
    if (keywords) {
        finalQuery = Object.assign(Object.assign({}, finalQuery), { $and: [ratingsQuery, categoriesQuery], $text: { $search: keywords, $caseSensitive: false } });
    }
    else {
        finalQuery = Object.assign(Object.assign({}, finalQuery), { $and: [ratingsQuery, categoriesQuery] });
    }
    return finalQuery;
}
exports.generateFinalQuery = generateFinalQuery;
