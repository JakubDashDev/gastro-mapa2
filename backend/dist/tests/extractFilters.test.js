"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const extractFilters_1 = require("../utils/restaurantController/extractFilters");
(0, globals_1.test)("should return an array of filters", () => {
    // Arrange
    const req = {
        query: {
            filters: '[{"$gte": 4}, {"category": "Italian"}]',
        },
    };
    // Act
    const filters = (0, extractFilters_1.extractFilters)(req);
    // Assert
    expect(filters).toEqual({
        ratings: [{ $gte: 4 }],
        categories: [{ category: "Italian" }],
    });
});
(0, globals_1.test)("should return an empty array if no filters are provided", () => {
    // Arrange
    const req = {
        query: {},
    };
    // Act
    const filters = (0, extractFilters_1.extractFilters)(req);
    // Assert
    expect(filters).toEqual({ ratings: [], categories: [] });
});
(0, globals_1.test)("should return an empty array if filters are not valid", () => {
    // Arrange
    const req = {
        query: {
            filters: "invalid",
        },
    };
    // Act
    const filters = (0, extractFilters_1.extractFilters)(req);
    // Assert
    expect(filters).toEqual({ ratings: [], categories: [] });
});
