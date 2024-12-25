export function generateCategoryQuery(categories: any[]) {
  const categoriesQuery =
    categories.length > 0
      ? {
          $or: categories.map((item: any) => ({ category: item.category })),
        }
      : {};

  return categoriesQuery;
}
