import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookies from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import restaurantRoutes from "./routes/restaurantsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Restaurant from "./models/restaurantModel.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookies());

app.get("/", (req, res) => {
  res.send("HELLO FROM TS");
});

connectDB();

// const add = async ({ name, address, category, latlng, rating, youtubeRef }) => {
//   await Restaurant.create({
//     name,
//     address,
//     category,
//     latlng,
//     rating,
//     youtubeRef,
//   }).then(res => console.log(res))
// };

// const data = {
//   name: 'Kura Warzyw Gemüse Kebap',
//   address: {
//     street: 'Jarosława Dąbrowskiego',
//     houseNumber: '15A',
//     city: 'Warszawa',
//     zipCode: '02-558',
//     country: 'Polska',
//   },
//   category: ['kebab'],
//   latlng: {
//     lat: 52.2023,
//     lng: 21.02075,
//   },
//   rating: 4,
//   youtubeRef: 'https://www.youtube.com/embed/4v4FGVj3FiQ?si=TKJfGQv22OvJ4sS-',
// };

// add(data)

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} as ${process.env.NODE_ENV}`
  );
});
