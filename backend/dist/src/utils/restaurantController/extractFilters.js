"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilters = void 0;
function getFilters(req) {
    var _a, _b;
    const filtersQuery = req.query.filters;
    const filters = filtersQuery && JSON.parse(filtersQuery);
    const ratings = (_a = filters === null || filters === void 0 ? void 0 : filters.filter((item) => item.hasOwnProperty("$gte"))) !== null && _a !== void 0 ? _a : [];
    const categories = (_b = filters === null || filters === void 0 ? void 0 : filters.filter((item) => item.hasOwnProperty("category"))) !== null && _b !== void 0 ? _b : [];
    return { ratings, categories };
}
exports.getFilters = getFilters;
