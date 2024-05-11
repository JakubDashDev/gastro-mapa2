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
exports.updateUser = exports.updatePassword = exports.logout = exports.createAdmin = exports.authAdmin = void 0;
const asyncHandler_js_1 = __importDefault(require("../middleware/asyncHandler.js"));
const adminUserModel_js_1 = __importDefault(require("../models/adminUserModel.js"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
const authAdmin = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield adminUserModel_js_1.default.findOne({ email, username }).select("+password");
    if (user && (yield user.matchPassword(password))) {
        (0, generateToken_js_1.default)(res, user._id);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }
    else {
        res.status(401);
        throw new Error("Podane dane są nieprawidłowe!");
    }
}));
exports.authAdmin = authAdmin;
const createAdmin = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const userExist = yield adminUserModel_js_1.default.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = yield adminUserModel_js_1.default.create({
        username,
        email,
        password,
    });
    if (user) {
        res.status(201).json(user);
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
exports.createAdmin = createAdmin;
const logout = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Success!" });
}));
exports.logout = logout;
const updatePassword = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, password, confirmPassword } = req.body;
    const user = yield adminUserModel_js_1.default.findById(req.user._id).select("+password");
    if (!user) {
        res.status(404);
        throw new Error("Nie ma takiego użytkownika!");
    }
    if (password !== confirmPassword) {
        res.status(400);
        throw new Error("Hasła muszą być takie same!");
    }
    if (user && (yield user.matchPassword(currentPassword))) {
        user.password = password;
        user.confirmPassword = confirmPassword;
        yield user.save();
        (0, generateToken_js_1.default)(res, user._id);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }
    else {
        res.status(400);
        throw new Error("Nieprawidłowe hasło!");
    }
}));
exports.updatePassword = updatePassword;
const updateUser = (0, asyncHandler_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield adminUserModel_js_1.default.findOne({ _id: req.user._id }).select("+password");
    if (user && (yield user.matchPassword(password))) {
        user.username = username;
        user.email = email;
        yield user.save();
        res.status(200).json(user);
    }
    else {
        res.status(400);
        throw new Error("Podane dane są nieprawidłowe!");
    }
}));
exports.updateUser = updateUser;
