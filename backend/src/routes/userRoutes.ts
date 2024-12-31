import express from "express";
import { authAdmin, logout, updatePassword, updateUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import asnycHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.route("/auth").post(asnycHandler(authAdmin));
// router.route("/").post(createAdmin);
router.route("/logout").post(logout);
router.route("/updatePassword").patch(protect, asnycHandler(updatePassword));
router.route("/updateMe").patch(protect, asnycHandler(updateUser));

export default router;
