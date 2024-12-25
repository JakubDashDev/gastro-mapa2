"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const extractSort_1 = require("../utils/restaurantController/extractSort");
(0, globals_1.test)("should return proper sort object based on provided string", () => {
    // Arrange
    const req = {
        query: {
            sort: "Alfabetycznie (A-Z)",
        },
    };
    const req2 = {
        query: {
            sort: "Alfabetycznie (Z-A)",
        },
    };
    // Act
    const sortToReturn = (0, extractSort_1.extractSort)(req);
    const sortToReturn2 = (0, extractSort_1.extractSort)(req2);
    // Assert
    (0, globals_1.expect)(sortToReturn).toEqual({ name: 1 });
    (0, globals_1.expect)(sortToReturn2).toEqual({ name: -1 });
});
(0, globals_1.test)("should return proper sort object when query is empty or query is invalid", () => {
    // Arrange
    const req = {
        query: {},
    };
    const req2 = {
        query: {
            sort: "Invalid",
        },
    };
    // Act
    const sortToReturn = (0, extractSort_1.extractSort)(req);
    const sortToReturn2 = (0, extractSort_1.extractSort)(req2);
    // Assert
    (0, globals_1.expect)(sortToReturn).toEqual({ createdAt: -1 });
    (0, globals_1.expect)(sortToReturn2).toEqual({ createdAt: -1 });
});
