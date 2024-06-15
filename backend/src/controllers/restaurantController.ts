import { Request, Response } from "express";
import asnycHandler from "../middleware/asyncHandler.js";
import Restaurant, { RestaurantType } from "../models/restaurantModel.js";

const getAllRestaurants = asnycHandler(async (req: Request, res: Response) => {
  const keywordQuery = req.query.keyword as string;
  const filtersQuery = req.query.filters as string;
  const sort = req.query.sort ? JSON.parse(req.query.sort as string) : "Od: najnowszych";

  let sortFinal = {};
  if (sort === "Alfabetycznie (A-Z)") sortFinal = { name: 1 };
  if (sort === "Alfabetycznie (Z-A)") sortFinal = { name: -1 };
  if (sort === "Ocena: malejąco") sortFinal = { rating: -1 };
  if (sort === "Ocena: rosnąco") sortFinal = { rating: 1 };
  if (sort === "Od: najnowszych") sortFinal = { createdAt: -1 };
  if (sort === "Od: najstarszych") sortFinal = { createdAt: 1 };

  const keywords = keywordQuery
    ?.split(/\s+/)
    .map((kw) => `"${kw}"`)
    .join(" ");

  const filters = filtersQuery && JSON.parse(filtersQuery as string);
  const ratings = filters?.filter((item: any) => item.hasOwnProperty("$gte"));
  const categories = filters?.filter((item: any) => item.hasOwnProperty("category"));

  let finalQuery = {};
  if ((keywordQuery && filtersQuery) || filtersQuery)
    finalQuery = {
      ...finalQuery,
      $and: [
        ratings.length > 0
          ? {
              $or: ratings.map((item: any) => {
                //NOTE: handling custom value of rating
                if (item.$gte === "challange ostrości" && item.$lte === "challange ostrości") {
                  return { rating: "challange ostrości" };
                }
                return { rating: item };
              }),
            }
          : {},
        categories.length > 0
          ? {
              $or: categories.map((item: any) => ({ category: item.category })),
            }
          : {},
      ],
    };
  if (keywordQuery) finalQuery = { ...finalQuery, $text: { $search: keywords, $caseSensitive: false } };
  if (!keywordQuery && !filtersQuery) finalQuery = {};

  const restaurants = await Restaurant.find(finalQuery).sort(sortFinal).lean();

  res.json(restaurants);
});

interface CustomRequest<T> extends Request {
  body: T;
}
const createRestaurant = asnycHandler(async (req: CustomRequest<RestaurantType>, res: Response) => {
  const { name, rating, youtubeLink, youtubeEmbed, googleLink, category, address, geometry } = req.body;

  if (typeof rating === "string") {
    if (rating !== "challange ostrości") {
      res.status(400);
      throw new Error("Zakres oceny jest nieprawdidłowy!");
    }
  }

  if (typeof rating === "number") {
    if (rating < 0.1 || rating > 5) {
      res.status(400);
      throw new Error("Zakres oceny jest nieprawdidłowy!");
    }
  }

  const restaurant = new Restaurant({
    name,
    rating,
    youtubeLink,
    googleLink,
    youtubeEmbed,
    category: category,
    address,
    geometry,
  });

  const createdRestaurant = await restaurant.save();
  res.status(201).json(createdRestaurant);
});

const updateRestaurant = asnycHandler(async (req: CustomRequest<RestaurantType>, res: Response) => {
  const { name, rating, address, category, googleLink, youtubeLink, geometry } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);

  const youtubeId = youtubeLink.split("https://youtu.be/")[1];

  //prettier-ignore
  if(restaurant){
    restaurant.name = name,
    restaurant.rating = rating,
    restaurant.address = address,
    restaurant.category = category,
    restaurant.googleLink = googleLink,
    restaurant.youtubeLink = youtubeLink,
    restaurant.youtubeEmbed = `https://www.youtube.com/embed/${youtubeId}`
    restaurant.geometry = geometry

    if(typeof rating === "string"){
      if(rating !== "challange ostrości"){
        res.status(400)
        throw new Error("Zakres oceny jest nieprawdidłowy!")
      }
    }
    
    if(typeof rating === "number"){
      if(rating < 0.1 || rating > 5){
        res.status(400)
        throw new Error("Zakres oceny jest nieprawdidłowy!")
      }
    }

    const updatedRestaurant = await restaurant.save()
    res.status(200).json(updatedRestaurant)
  } else {
    res.status(404)
    throw new Error("Nie znaleziono restauracji")
  }
});

const deleteRestuarant = asnycHandler(async (req: CustomRequest<RestaurantType>, res: Response) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    await restaurant.deleteOne({ _id: restaurant._id });
    res.status(200).json({ message: "Restauracja została usunięta!" });
  } else {
    res.status(404);
    throw new Error("Nie znaleziono restauracji");
  }
});

export { getAllRestaurants, createRestaurant, updateRestaurant, deleteRestuarant };
