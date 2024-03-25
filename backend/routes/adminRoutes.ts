import express from 'express';
import { authAdmin } from '../controllers/authController.js';
import { getAllRestaurants } from '../controllers/restaurantController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/auth').post(authAdmin);
router.route('/').get(protect, getAllRestaurants);

export default router;
