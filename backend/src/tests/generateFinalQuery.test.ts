import { generateFinalQuery } from "../utils/restaurantController/generateFinalQuery";

const keyword = "keyword";
const rating = [{ $gte: 3, $lte: 3.9 }];
const category = [{ category: "kebab" }];

test("return query with all filters", () => {
  const result = generateFinalQuery(keyword, rating, category);

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
  const result = generateFinalQuery(keyword, [], []);

  expect(result).toEqual({
    $and: [{}, {}],
    $text: { $search: "keyword", $caseSensitive: false },
  });
});

test("return query with only rating", () => {
  const result = generateFinalQuery("", rating, []);

  expect(result).toEqual({
    $and: [{ $or: [{ rating: { $gte: 3, $lte: 3.9 } }] }, {}],
  });
});

test("return query with only category", () => {
  const result = generateFinalQuery("", [], category);

  expect(result).toEqual({
    $and: [{}, { $or: [{ category: "kebab" }] }],
  });
});

test("return query without keyword", () => {
  const result = generateFinalQuery("", rating, category);

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
  const result = generateFinalQuery("", [], []);

  expect(result).toEqual({
    $and: [{}, {}],
  });
});
