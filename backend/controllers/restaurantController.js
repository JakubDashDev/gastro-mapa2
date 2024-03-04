import asnycHandler from '../middleware/asyncHandler.js';
import Restaurant from '../models/restaurantModel.js';

const getAllRestaurants = asnycHandler(async (req, res) => {
  const keyword = req.query.keyword;
  // const rating = req.query.ratingQuery;
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

  // const min = rating ? JSON.parse(`{${rating.split('&')[0]}}`) : {};
  // const max = rating ? JSON.parse(`{${rating.split('&')[1]}}`) : {};

  // const quryObject = Object.assign(min, max);

  // const ratingQuery = rating
  //   ? {
  //       rating: quryObject,
  //     }
  //   : {};

  const restaurants = keyword
    ? await Restaurant.find(find)
    : await Restaurant.find();

  res.json(restaurants);
});

export { getAllRestaurants };
