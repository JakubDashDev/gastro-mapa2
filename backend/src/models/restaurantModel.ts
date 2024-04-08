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
    latLng: number[];
  };
  category: string[];
  youtubeEmbed: string;
  youtubeLink: string;
  googleLink: string;
  createdAt: Date;
  updatedAt: Date;
};

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  latLng: { type: [Number], required: true },
});

const RestaurantSchema = new mongoose.Schema<RestaurantType>(
  {
    name: { type: String, required: true, unique: true },
    address: AddressSchema,
    category: { type: [String], required: true },
    rating: { type: Number, required: true },
    youtubeEmbed: { type: String, required: true },
    youtubeLink: { type: String, required: true },
    googleLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
