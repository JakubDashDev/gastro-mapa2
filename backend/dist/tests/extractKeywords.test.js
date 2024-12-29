"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const extractKeywords_1 = require("../utils/restaurantController/extractKeywords");
(0, globals_1.test)("should return string where every word is seperated", () => {
    const req = {
        query: {
            keyword: "test keyword 2115",
        },
    };
    const result = (0, extractKeywords_1.extractKeywords)(req);
    expect(result).toBe('"test" "keyword" "2115"');
});
(0, globals_1.test)("should return undefined if no keyword is provided", () => {
    const req = {
        query: {},
    };
    const result = (0, extractKeywords_1.extractKeywords)(req);
    expect(result).toBe(undefined);
});
