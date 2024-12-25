import { Category, generateCategoryQuery } from "./generateCategoryQuery";
import { generateRatingQuery, Rating } from "./generateRatingQuery";

export function generateFinalQuery(keywords: string, ratings: Rating[], categories: Category[]) {
  let finalQuery = {};

  const ratingsQuery = generateRatingQuery(ratings);
  const categoriesQuery = generateCategoryQuery(categories);

  if (keywords) {
    finalQuery = {
      ...finalQuery,
      $and: [ratingsQuery, categoriesQuery],
      $text: { $search: keywords, $caseSensitive: false },
    };
  } else {
    finalQuery = {
      ...finalQuery,
      $and: [ratingsQuery, categoriesQuery],
    };
  }

  return finalQuery;
}
