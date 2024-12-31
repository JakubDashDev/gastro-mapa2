import AdminUser from "../models/adminUserModel";
import Restaurant from "../models/restaurantModel";
import AuthServiceFn from "./authService";
import RestaurantServiceFn from "./restaurantService";

export const RestaurantService = RestaurantServiceFn(Restaurant);
export const AuthService = AuthServiceFn(AdminUser);
