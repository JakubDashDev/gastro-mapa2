import mongoose, { Schema } from "mongoose";

export type RestaurantType = {
  _id: string;
  name: string;
  rating: number | string;
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
    rating: { type: Schema.Types.Mixed, required: [true, "To pole nie może być puste!"] },
    youtubeEmbed: { type: String, required: true },
    youtubeLink: { type: String, required: true },
    googleLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
