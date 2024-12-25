export interface Category {
  category: string;
}

interface CategoryQueryResult {
  $or: [
    {
      category: string;
    }
  ];
}

export function generateCategoryQuery(categories: Category[]): CategoryQueryResult | {} {
  const categoriesQuery =
    categories.length > 0
      ? {
          $or: categories.map((item) => ({ category: item.category })),
        }
      : {};

  return categoriesQuery;
}
