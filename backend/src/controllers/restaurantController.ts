import { Request, Response } from "express";
import asnycHandler from "../middleware/asyncHandler";
import { RestaurantType } from "../models/restaurantModel";
import { RestaurantService } from "../services/";

const getAllRestaurants = async (req: Request, res: Response) => {
  const restaurants = await RestaurantService.listRestaurants(req);

  res.json(restaurants);
};

interface CustomRequest<T> extends Request {
  body: T;
}
const createRestaurant = asnycHandler(async (req: CustomRequest<RestaurantType>, res: Response) => {
  const restaurant = await RestaurantService.createRestaurant(req);

  res.status(201).json(restaurant);
});

const updateRestaurant = async (req: CustomRequest<RestaurantType>, res: Response) => {
  const restaurant = await RestaurantService.updateRestaurant(req);

  res.status(200).json(restaurant);
};

const deleteRestuarant = async (req: CustomRequest<RestaurantType>, res: Response) => {
  const restaurant = await RestaurantService.deleteRestuarant(req);

  if (restaurant.deletedCount > 0) res.status(200).json({ message: "Restauracja została usunięta!" });
};

export { getAllRestaurants, createRestaurant, updateRestaurant, deleteRestuarant };
