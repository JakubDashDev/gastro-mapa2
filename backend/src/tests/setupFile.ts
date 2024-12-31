import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(process.env["MONGODB"] as string);
});

afterAll(async () => {
  await mongoose.disconnect();
});
