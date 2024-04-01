import express from "express";
import { createRestaurant, getAllRestaurants } from "../controllers/restaurantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllRestaurants).post(protect, createRestaurant);
router.route("/admin").get(protect, getAllRestaurants);

export default router;
