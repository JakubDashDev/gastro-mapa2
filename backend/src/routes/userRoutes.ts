import express from "express";
import {
  authAdmin,
  createAdmin,
  logout,
} from "../controllers/authController.js";
import { getAllRestaurants } from "../controllers/restaurantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/auth").post(authAdmin);
router.route("/").post(createAdmin);
router.route("/logout").post(logout);

export default router;