import { Request, Response } from "express";
import asnycHandler from "../middleware/asyncHandler.js";
import Restaurant, { RestaurantType } from "../models/restaurantModel.js";

const getAllRestaurants = asnycHandler(async (req: Request, res: Response) => {
  const keyword = req.query.keyword;
  const filters = req.query.filters;
  const find = keyword
    ? {
        $or: [
          {
            name: { $regex: req.query.keyword, $options: "i" },
          },
          {
            category: { $regex: req.query.keyword, $options: "i" },
          },
          {
            "address.city": { $regex: req.query.keyword, $options: "i" },
          },
          {
            rating: keyword === "muala" && 5,
          },
        ],
      }
    : {};

  type filterType = { $gte?: number | string; $lte?: number | string; category?: string };
  const filtersArray: filterType[] = filters && JSON.parse(filters as string);
  const ratings = filtersArray?.filter((item) => item.hasOwnProperty("$gte"));
  const categories = filtersArray?.filter((item) => item.hasOwnProperty("category"));

  const filter = filtersArray
    ? {
        $and: [
          ratings.length > 0
            ? {
                $or: ratings.map((item) => {
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
                $or: categories.map((item) => ({ category: { $regex: item.category, $options: "i" } })),
              }
            : {},
        ],
      }
    : {};

  const restaurants = keyword
    ? await Restaurant.find(find)
    : filters
    ? await Restaurant.find(filter)
    : await Restaurant.find();
  //
  res.json(restaurants);
});

interface CustomRequest<T> extends Request {
  body: T;
}
const createRestaurant = asnycHandler(async (req: CustomRequest<RestaurantType>, res: Response) => {
  const { name, rating, youtubeLink, youtubeEmbed, googleLink, category, address } = req.body;

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
  });

  const createdRestaurant = await restaurant.save();
  res.status(201).json(createdRestaurant);
});

const updateRestaurant = asnycHandler(async (req: CustomRequest<RestaurantType>, res: Response) => {
  const { name, rating, address, category, googleLink, youtubeLink, youtubeEmbed } = req.body;

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
