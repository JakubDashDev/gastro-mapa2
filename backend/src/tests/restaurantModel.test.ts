import Restaurant from "../models/restaurantModel";
const restaurant_one = new Restaurant({
  name: "Restaurant 1",
  address: { city: "Kraków", country: "Polska", street: "Krakowska", zipCode: "31-924" },
  category: ["Kebab"],
  createdAt: Date.now(),
  geometry: {
    coordinates: [21.234, 21.234],
  },
  googleLink: "google.com",
  rating: 4,
  updatedAt: Date.now(),
  youtubeEmbed: "youtube.com",
  youtubeLink: "youtube.com",
});

const restaurant_two = new Restaurant({
  name: "Restaurant 2",
  address: { city: "Warszawa", country: "Polska", street: "Krakowska", zipCode: "31-924" },
  category: ["pizza"],
  createdAt: Date.now(),
  geometry: {
    coordinates: [21.234, 21.234],
  },
  googleLink: "google.com",
  rating: 5,
  updatedAt: Date.now(),
  youtubeEmbed: "youtube.com",
  youtubeLink: "youtube.com",
});

it("gets restaurants", async () => {
  //Arrange
  await restaurant_one.save();
  await restaurant_two.save();

  //Act
  const result = await Restaurant.find();

  //Assert
  expect(result).toHaveLength(2);
  expect(result[0].name).toBe("Restaurant 1");
  expect(result[1].name).toBe("Restaurant 2");
});

it("create restaurant", async () => {
  //Arrange
  const expected = "Restaurant 1";

  //Act
  const newRestaurant = await restaurant_one.save();

  //Assert
  expect(newRestaurant.name).toBe(expected);
});

it("update restaurant", async () => {
  //Arrange
  const restaurant = await restaurant_one.save();
  const expected = "Restaurant 1.1";

  //Act
  restaurant.name = "Restaurant 1.1";
  const newRestaurant = await restaurant.save();

  //Assert
  expect(newRestaurant.name).toBe(expected);
});

it("delete restaurant", async () => {
  //Arrange
  const restaurant = await restaurant_one.save();

  //Act
  const result = await restaurant.deleteOne({ _id: restaurant._id });

  //Arrange
  expect(result.deletedCount).toBe(1);
});
