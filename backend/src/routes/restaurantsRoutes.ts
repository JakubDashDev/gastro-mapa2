import express from "express";
import { getAllRestaurants } from "../controllers/restaurantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllRestaurants);
router.route("/admin").get(protect, getAllRestaurants);

export default router;
