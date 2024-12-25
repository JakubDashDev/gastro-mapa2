import { test } from "@jest/globals";
import { getFilters } from "../utils/restaurantController/extractFilters";
import { Request } from "express";

test("should return an array of filters", () => {
  // Arrange
  const req = {
    query: {
      filters: '[{"$gte": 4}, {"category": "Italian"}]',
    },
  } as Partial<Request> as Request;

  // Act
  const filters = getFilters(req);

  // Assert
  expect(filters).toEqual({
    ratings: [{ $gte: 4 }],
    categories: [{ category: "Italian" }],
  });
});

test("should return an empty array if no filters are provided", () => {
  // Arrange
  const req = {
    query: {},
  } as Partial<Request> as Request;

  // Act
  const filters = getFilters(req);

  // Assert
  expect(filters).toEqual({ ratings: [], categories: [] });
});

test("should return an empty array if filters are not valid", () => {
  // Arrange
  const req = {
    query: {
      filters: "invalid",
    },
  } as Partial<Request> as Request;

  // Act
  const filters = getFilters(req);

  // Assert
  expect(filters).toEqual({ ratings: [], categories: [] });
});
