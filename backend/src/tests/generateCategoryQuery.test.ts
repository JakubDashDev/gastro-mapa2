import { generateCategoryQuery } from "../utils/restaurantController/generateCategoryQuery";

test("should retrun a query for category", () => {
  // Arrange
  const categories = [{ category: "Burger" }, { category: "Pizza" }];

  // Act
  const result = generateCategoryQuery(categories);

  // Assert
  expect(result).toEqual({
    $or: [{ category: "Burger" }, { category: "Pizza" }],
  });
});

test("should return an empty object if categories is empty", () => {
  // Arrange
  const categories: any = [];

  // Act
  const result = generateCategoryQuery(categories);

  // Assert
  expect(result).toEqual({});
});
