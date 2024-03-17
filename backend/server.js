import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookies from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import restaurantRoutes from './routes/restaurantsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookies());

connectDB();

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} as ${process.env.NODE_ENV}`
  );
});
