import { Request, Response } from "express";
import { Rating } from "./generateRatingQuery";
import { Category } from "./generateCategoryQuery";

export function extractFilters(req: Request) {
  const filtersQuery = req.query.filters as string;

  let filters = [];

  try {
    filters = JSON.parse(filtersQuery);
  } catch (e) {
    return { ratings: [], categories: [] };
  }

  const ratings = (filters?.filter((item: any) => item.hasOwnProperty("$gte")) as Rating[]) ?? [];
  const categories = filters?.filter((item: any) => item.hasOwnProperty("category") as Category[]) ?? [];

  return { ratings, categories };
}
