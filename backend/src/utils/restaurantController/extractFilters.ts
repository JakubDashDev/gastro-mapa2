import { Request, Response } from "express";

export function getFilters(req: Request) {
  const filtersQuery = req.query.filters as string;

  let filters = [];

  try {
    filters = JSON.parse(filtersQuery);
  } catch (e) {
    return { ratings: [], categories: [] };
  }

  const ratings = filters?.filter((item: any) => item.hasOwnProperty("$gte")) ?? [];
  const categories = filters?.filter((item: any) => item.hasOwnProperty("category")) ?? [];

  return { ratings, categories };
}
