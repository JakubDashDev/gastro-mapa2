import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookies from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import restaurantRoutes from "./routes/restaurantsRoutes.js";
import adminRoutes from "./routes/userRoutes.js";

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

connectDB();

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/admin", adminRoutes);

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.status(404).json({ message: "Route not found :(" });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} as ${process.env.NODE_ENV}`);
});
