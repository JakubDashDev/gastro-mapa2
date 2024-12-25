import { test } from "@jest/globals";
import { extractKeywords } from "../utils/restaurantController/extractKeywords";

test("should return string where every word is seperated", () => {
  const req = {
    query: {
      keyword: "test keyword 2115",
    },
  } as any;

  const result = extractKeywords(req);

  expect(result).toBe('"test" "keyword" "2115"');
});

test("should return empty string if no keyword is provided", () => {
  const req = {
    query: {},
  } as any;

  const result = extractKeywords(req);
  expect(result).toBe("");
});
