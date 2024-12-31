import { Request } from "express";
import RestaurantModel from "../models/restaurantModel";
import { extractSort } from "../utils/restaurantController/extractSort";
import { extractKeywords } from "../utils/restaurantController/extractKeywords";
import { extractFilters } from "../utils/restaurantController/extractFilters";
import { generateFinalQuery } from "../utils/restaurantController/generateFinalQuery";
import { validateRating } from "../utils/restaurantController/validateRating";

const listRestaurants = (Restaurant: typeof RestaurantModel) => (req: Request) => {
  const { categories, ratings } = extractFilters(req);
  const sort = extractSort(req);
  const keywords = extractKeywords(req);

  const finalQuery = generateFinalQuery(keywords, ratings, categories);

  return Restaurant.find(finalQuery).sort(sort).lean();
};

const createRestaurant = (Restaurant: typeof RestaurantModel) => (req: Request) => {
  const { name, rating, youtubeLink, youtubeEmbed, googleLink, category, address, geometry } = req.body;

  validateRating(rating);

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

  return restaurant.save();
};

const updateRestaurant = (Restaurant: typeof RestaurantModel) => async (req: Request) => {
  const { name, rating, youtubeLink, youtubeEmbed, googleLink, category, address, geometry } = req.body;

  const currentRestaurant = await Restaurant.findById(req.params.id);

  if (!currentRestaurant) throw new Error("Nie znaleziono restauracji");

  validateRating(rating);

  //prettier-ignore
  currentRestaurant.name = name,
  currentRestaurant.rating = rating,
  currentRestaurant.address = address,
  currentRestaurant.category = category,
  currentRestaurant.googleLink = googleLink,
  currentRestaurant.youtubeLink = youtubeLink,
  currentRestaurant.youtubeEmbed = `https://www.youtube.com/embed/${youtubeLink.split("https://youtu.be/")[1]}`
  currentRestaurant.geometry = geometry;

  return currentRestaurant.save();
};

const deleteRestuarant = (Restaurant: typeof RestaurantModel) => async (req: Request) => {
  const currentRestaurant = await Restaurant.findById(req.params.id);

  if (!currentRestaurant) throw new Error("Nie znaleziono restauracji");

  return currentRestaurant.deleteOne();
};

export default (Restaurant: typeof RestaurantModel) => {
  return {
    listRestaurants: listRestaurants(Restaurant),
    createRestaurant: createRestaurant(Restaurant),
    updateRestaurant: updateRestaurant(Restaurant),
    deleteRestuarant: deleteRestuarant(Restaurant),
  };
};
