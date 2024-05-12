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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://127.0.0.1:3001", "ws://localhost:42877/"],
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
    origin: "https://gastro-mapa2-frontend.onrender.com",
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