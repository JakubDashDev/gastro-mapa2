import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookies from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import restaurantRoutes from "./routes/restaurantsRoutes.js";
import adminRoutes from "./routes/userRoutes.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import monogoSanitize from "express-mongo-sanitize";

const app = express();

//Security HTTP headers
app.use(helmet());

//Body parser
app.use(express.json({ limit: "10kb" }));

//Data sanitization
app.use(monogoSanitize());

//DEV dep
app.use(morgan("dev"));

//CORS
app.use(
  cors({
    origin: "https://gastro-mapa2.vercel.app",
    credentials: true,
  })
);

//COOKIES
app.use(cookies());

//Limit request
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many request",
});
app.use(limiter);

//DB connection
connectDB();

//App routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/admin", adminRoutes);

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.status(404).json({ message: "Route not found :(" });
});

//Error middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} as ${process.env.NODE_ENV}`);
});
