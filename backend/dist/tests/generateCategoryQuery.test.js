"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateCategoryQuery_1 = require("../utils/restaurantController/generateCategoryQuery");
test("should retrun a query for category", () => {
    // Arrange
    const categories = [{ category: "Burger" }, { category: "Pizza" }];
    // Act
    const result = (0, generateCategoryQuery_1.generateCategoryQuery)(categories);
    // Assert
    expect(result).toEqual({
        $or: [{ category: "Burger" }, { category: "Pizza" }],
    });
});
test("should return an empty object if categories is empty", () => {
    // Arrange
    const categories = [];
    // Act
    const result = (0, generateCategoryQuery_1.generateCategoryQuery)(categories);
    // Assert
    expect(result).toEqual({});
});
