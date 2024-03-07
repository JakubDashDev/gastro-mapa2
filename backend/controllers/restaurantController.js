import asnycHandler from '../middleware/asyncHandler.js';
import Restaurant from '../models/restaurantModel.js';

const getAllRestaurants = asnycHandler(async (req, res) => {
  const keyword = req.query.keyword;
  const filters = req.query.filters;
  const find = keyword
    ? {
        $or: [
          {
            name: { $regex: req.query.keyword, $options: 'i' },
          },
          {
            type: { $regex: req.query.keyword, $options: 'i' },
          },
          {
            'address.city': { $regex: req.query.keyword, $options: 'i' },
          },
          {
            rating: keyword === 'muala' && 5,
          },
        ],
      }
    : {};

  const filtersArray = filters && JSON.parse(filters);
  const ratings = filtersArray?.filter((item) => item.type === 'rating');
  const categories = filtersArray?.filter((item) => item.type === 'category');


  const filter = filtersArray
    ? {
        $and: [
          ratings.length > 0
            ? {
                $or: ratings.map((item) => {
                  return { rating: item.value };
                }),
              }
            : {},
          categories.length > 0
            ? {
                $or: categories.map((item) => {
                  return { type: { $regex: item.value, $options: 'i' } };
                }),
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

export { getAllRestaurants };
