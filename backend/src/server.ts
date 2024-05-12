import express from "express";
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
import path from "path";

const app = express();

//Security HTTP headers
const scriptSrcUrls = ["https://api.tiles.mapbox.com/", "https://api.mapbox.com/"];
const styleSrcUrls = ["https://api.mapbox.com/", "https://api.tiles.mapbox.com/", "https://fonts.googleapis.com/"];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
  "https://www.youtube.com/",
];
const fontSrcUrls = ["fonts.googleapis.com", "fonts.gstatic.com"];
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [],
        frameSrc: ["self", "https://www.youtube.com/"],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'self'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        objectSrc: [],
        imgSrc: ["'self'", "blob:", "data:"],
        fontSrc: ["'self'", ...fontSrcUrls],
      },
    },
  })
);

//Body parser
app.use(express.json({ limit: "10kb" }));

//Data sanitization
app.use(monogoSanitize());

//CORS
app.use(
  cors({
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
  validate: {
    trustProxy: true,
  },
});
app.use(limiter);

//DB connection
connectDB();

//App routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV === "prod") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html")));
}

//Error middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} as ${process.env.NODE_ENV}`);
});
