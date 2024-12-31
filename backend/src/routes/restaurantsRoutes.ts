import express from "express";
import {
  createRestaurant,
  deleteRestuarant,
  getAllRestaurants,
  updateRestaurant,
} from "../controllers/restaurantController.js";
import { protect } from "../middleware/authMiddleware.js";
import asnycHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.route("/:query?").get(asnycHandler(getAllRestaurants)).post(protect, asnycHandler(createRestaurant));
router.route("/admin/:query?").get(protect, asnycHandler(getAllRestaurants));
router.route("/:id").put(protect, asnycHandler(updateRestaurant)).delete(protect, asnycHandler(deleteRestuarant));

export default router;
