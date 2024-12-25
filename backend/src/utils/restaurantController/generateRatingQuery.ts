export interface Rating {
  $gte: number | "challange ostrości";
  $lte: number | "challange ostrości";
}

interface RatingQueryResult {
  $or: [
    {
      rating: "challange ostrości" | Rating;
    }
  ];
}

export function generateRatingQuery(ratings: Rating[] | []): RatingQueryResult | {} {
  const ratingsQuery =
    ratings.length > 0
      ? {
          $or: ratings.map((item) => {
            if (item.$gte === "challange ostrości" && item.$lte === "challange ostrości") {
              return { rating: "challange ostrości" };
            }
            return { rating: item };
          }),
        }
      : {};

  return ratingsQuery;
}
