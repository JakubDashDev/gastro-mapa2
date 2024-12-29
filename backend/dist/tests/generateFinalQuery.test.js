"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateFinalQuery_1 = require("../utils/restaurantController/generateFinalQuery");
const keyword = "keyword";
const rating = [{ $gte: 3, $lte: 3.9 }];
const category = [{ category: "kebab" }];
test("return query with all filters", () => {
    const result = (0, generateFinalQuery_1.generateFinalQuery)(keyword, rating, category);
    expect(result).toEqual({
        $and: [
            {
                $or: [{ rating: { $gte: 3, $lte: 3.9 } }],
            },
            {
                $or: [{ category: "kebab" }],
            },
        ],
        $text: { $search: "keyword", $caseSensitive: false },
    });
});
test("return query with only keyword", () => {
    const result = (0, generateFinalQuery_1.generateFinalQuery)(keyword, [], []);
    expect(result).toEqual({
        $and: [{}, {}],
        $text: { $search: "keyword", $caseSensitive: false },
    });
});
test("return query with only rating", () => {
    const result = (0, generateFinalQuery_1.generateFinalQuery)("", rating, []);
    expect(result).toEqual({
        $and: [{ $or: [{ rating: { $gte: 3, $lte: 3.9 } }] }, {}],
    });
});
test("return query with only category", () => {
    const result = (0, generateFinalQuery_1.generateFinalQuery)("", [], category);
    expect(result).toEqual({
        $and: [{}, { $or: [{ category: "kebab" }] }],
    });
});
test("return query without keyword", () => {
    const result = (0, generateFinalQuery_1.generateFinalQuery)("", rating, category);
    expect(result).toEqual({
        $and: [
            {
                $or: [{ rating: { $gte: 3, $lte: 3.9 } }],
            },
            {
                $or: [{ category: "kebab" }],
            },
        ],
    });
});
test("return query with no filters", () => {
    const result = (0, generateFinalQuery_1.generateFinalQuery)("", [], []);
    expect(result).toEqual({
        $and: [{}, {}],
    });
});
