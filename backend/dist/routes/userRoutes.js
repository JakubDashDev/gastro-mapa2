"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = require("../controllers/authController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const asyncHandler_js_1 = __importDefault(require("../middleware/asyncHandler.js"));
const router = express_1.default.Router();
router.route("/auth").post((0, asyncHandler_js_1.default)(authController_js_1.authAdmin));
// router.route("/").post(createAdmin);
router.route("/logout").post(authController_js_1.logout);
router.route("/updatePassword").patch(authMiddleware_js_1.protect, (0, asyncHandler_js_1.default)(authController_js_1.updatePassword));
router.route("/updateMe").patch(authMiddleware_js_1.protect, (0, asyncHandler_js_1.default)(authController_js_1.updateUser));
exports.default = router;
