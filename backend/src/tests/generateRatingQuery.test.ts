import { generateRatingQuery } from "../utils/restaurantController/generateRatingQuery";

test("should generate a custom value if provided", () => {
  // Arrange
  const ratings = [
    {
      $gte: "challange ostrości" as "challange ostrości",
      $lte: "challange ostrości" as "challange ostrości",
    },
  ];

  // Act
  const ratingsQuery = generateRatingQuery(ratings);

  // Assert
  expect(ratingsQuery).toEqual({
    $or: [{ rating: "challange ostrości" }],
  });
});

test("should generate a ranges if provided", () => {
  // Arrange
  const ratings = [
    { $gte: 3, $lte: 4 },
    { $gte: 4, $lte: 5 },
  ];

  // Act
  const ratingsQuery = generateRatingQuery(ratings);

  // Assert
  expect(ratingsQuery).toEqual({
    $or: [{ rating: { $gte: 3, $lte: 4 } }, { rating: { $gte: 4, $lte: 5 } }],
  });
});

test("should generate an empty object if no ratings provided", () => {
  // Arrange
  const ratings: any = [];

  // Act
  const ratingsQuery = generateRatingQuery(ratings);

  // Assert
  expect(ratingsQuery).toEqual({});
});
