import { test, expect } from "@jest/globals";
import { extractSort } from "../utils/restaurantController/extractSort";

test("should return proper sort object based on provided string", () => {
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
  const sortToReturn = extractSort(req as any);
  const sortToReturn2 = extractSort(req2 as any);

  // Assert
  expect(sortToReturn).toEqual({ name: 1 });
  expect(sortToReturn2).toEqual({ name: -1 });
});

test("should return proper sort object when query is empty or query is invalid", () => {
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
  const sortToReturn = extractSort(req as any);
  const sortToReturn2 = extractSort(req2 as any);

  // Assert
  expect(sortToReturn).toEqual({ createdAt: -1 });
  expect(sortToReturn2).toEqual({ createdAt: -1 });
});
