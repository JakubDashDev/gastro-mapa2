import mongoose from "mongoose";

export type RestaurantType = {
  _id: string;
  name: string;
  rating: number;
  address: {
    street: string;
    zipCode: string;
    city: string;
    country: string;
    lngLat: number[];
  };
  category: string[];
  youtubeEmbed: string;
  youtubeLink: string;
  googleLink: string;
  createdAt: Date;
  updatedAt: Date;
};

const RestaurantSchema = new mongoose.Schema<RestaurantType>(
  {
    name: { type: String, required: true, unique: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      lngLat: { type: [Number], required: true },
      _id: false,
    },
    category: { type: [String], required: true },
    rating: { type: Number, required: true },
    youtubeEmbed: { type: String, required: true },
    youtubeLink: { type: String, required: true },
    googleLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

RestaurantSchema.path("name").validate(async (value) => {
  const nameCount = await mongoose.models.Restaurant.countDocuments({ name: value });
  return !nameCount;
}, "Restauracja o tej nazwie już istnieje");


export default Restaurant;
