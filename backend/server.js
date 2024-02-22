import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import restaurantRoutes from './routes/restaurantsRoutes.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.use('/api/restaurants', restaurantRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} as ${process.env.NODE_ENV}`
  );
});
