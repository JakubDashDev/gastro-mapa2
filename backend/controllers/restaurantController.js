import asnycHandler from '../middleware/asyncHandler.js';
import Restaurant from '../models/restaurantModel.js';

const getAllRestaurants = asnycHandler(async (req, res) => {
  const keyword = req.query.keyword;
  const find = keyword
    ? {
        $or: [
          {
            name: { $regex: new RegExp('^' + keyword.toLowerCase(), 'i') },
          },
          {
            type: { $regex: new RegExp('^' + keyword.toLowerCase(), 'i') },
          },
          {
            'address.city': {
              $regex: new RegExp('^' + keyword.toLowerCase(), 'i'),
            },
          },
          {
            rating: { $regex: new RegExp('^' + keyword.toLowerCase(), 'i') },
          },
        ],
      }
    : {};
  const restaurants = await Restaurant.find(find);

  res.json(restaurants);
});

export { getAllRestaurants };
