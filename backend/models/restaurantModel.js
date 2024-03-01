import mongoose, { Schema } from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  houseNumber: { type: Schema.Types.Mixed, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  street: { type: String, required: true },
  country: { type: String, required: true },
});

const latLngSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const youtubeRefSchema = new mongoose.Schema({
  link: { type: String, required: true },
  timestamp: { type: Number },
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: addressSchema,
  type: [String],
  latlng: latLngSchema,
  rating: { type: Number, required: true },
  youtubeRef: youtubeRefSchema,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
