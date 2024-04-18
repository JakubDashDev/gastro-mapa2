import express from "express";
import {
  createRestaurant,
  deleteRestuarant,
  getAllRestaurants,
  updateRestaurant,
} from "../controllers/restaurantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllRestaurants).post(protect, createRestaurant);
router.route("/admin").get(protect, getAllRestaurants);
router.route("/:id").put(protect, updateRestaurant).delete(protect, deleteRestuarant);

export default router;
