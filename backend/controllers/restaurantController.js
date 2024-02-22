import asnycHandler from '../middleware/asyncHandler.js';
import Restaurant from '../models/restaurantModel.js';

const getAllRestaurants = asnycHandler(async (req, res) => {
  const restaurants = await Restaurant.find();

  res.json(restaurants);
});

export { getAllRestaurants };
