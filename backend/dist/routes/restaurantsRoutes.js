"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantController_js_1 = require("../controllers/restaurantController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.route("/:query?").get(restaurantController_js_1.getAllRestaurants).post(authMiddleware_js_1.protect, restaurantController_js_1.createRestaurant);
router.route("/admin/:query?").get(authMiddleware_js_1.protect, restaurantController_js_1.getAllRestaurants);
router.route("/:id").put(authMiddleware_js_1.protect, restaurantController_js_1.updateRestaurant).delete(authMiddleware_js_1.protect, restaurantController_js_1.deleteRestuarant);
exports.default = router;
