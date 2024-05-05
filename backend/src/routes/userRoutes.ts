import express from "express";
import { authAdmin, createAdmin, logout, updatePassword, updateUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/auth").post(authAdmin);
router.route("/").post(createAdmin);
router.route("/logout").post(logout);
router.route("/updatePassword").patch(protect, updatePassword);
router.route("/updateMe").patch(protect, updateUser);

export default router;
