"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCategoryQuery = void 0;
function generateCategoryQuery(categories) {
    const categoriesQuery = categories.length > 0
        ? {
            $or: categories.map((item) => ({ category: item.category })),
        }
        : {};
    return categoriesQuery;
}
exports.generateCategoryQuery = generateCategoryQuery;
