"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractKeywords = void 0;
const extractKeywords = (req) => {
    var _a;
    const keywordQuery = req.query.keyword;
    return ((_a = keywordQuery === null || keywordQuery === void 0 ? void 0 : keywordQuery.split(/\s+/).map((kw) => `"${kw}"`).join(" ")) !== null && _a !== void 0 ? _a : undefined);
};
exports.extractKeywords = extractKeywords;
