import mongoose, { Schema } from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  houseNumber: { type: Schema.Types.Mixed, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
});

const latLngSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: addressSchema,
    category: { type: [String], required: true },
    latlng: latLngSchema,
    rating: { type: Number, required: true },
    youtubeRef: { type: String, required: true },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
