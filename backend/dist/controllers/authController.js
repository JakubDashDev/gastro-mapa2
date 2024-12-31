"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.updatePassword = exports.logout = exports.authAdmin = void 0;
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
const index_js_1 = require("../services/index.js");
const authAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_js_1.AuthService.loginAdmin(req, res);
    return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
    });
});
exports.authAdmin = authAdmin;
// const createAdmin = asnycHandler(async (req: Request, res: Response) => {
//   const user = await AuthService.createAdmin(req, res);
//   res.status(200).json(user);
// });
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Success!" });
});
exports.logout = logout;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_js_1.AuthService.updatePassword(req, res);
    (0, generateToken_js_1.default)(res, user._id);
    res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
    });
});
exports.updatePassword = updatePassword;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_js_1.AuthService.updateUser(req, res);
    res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
    });
});
exports.updateUser = updateUser;
