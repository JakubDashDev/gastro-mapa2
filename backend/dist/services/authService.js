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
exports.updateUser = exports.updatePassword = exports.createAdmin = exports.loginAdmin = void 0;
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const loginAdmin = (AdminUser) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield AdminUser.findOne({ email, username }).select("+password");
    if (user && (yield user.matchPassword(password))) {
        (0, generateToken_1.default)(res, user._id);
        return user;
    }
    else {
        throw new Error("Podane dane są nieprawidłowe!");
    }
});
exports.loginAdmin = loginAdmin;
const createAdmin = (AdminUser) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const userExist = yield AdminUser.findOne({ email });
    if (userExist) {
        throw new Error("User already exists");
    }
    const user = yield AdminUser.create({
        username,
        email,
        password,
    });
    if (user) {
        return user;
    }
    else {
        throw new Error("Invalid user data");
    }
});
exports.createAdmin = createAdmin;
const updatePassword = (AdminUser) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, password, confirmPassword } = req.body;
    const user = yield AdminUser.findById(req.user._id).select("+password");
    if (!user) {
        throw new Error("Nie ma takiego użytkownika!");
    }
    if (password !== confirmPassword) {
        throw new Error("Hasła muszą być takie same!");
    }
    if (user && (yield user.matchPassword(currentPassword))) {
        user.password = password;
        user.confirmPassword = confirmPassword;
        return user.save();
    }
    else {
        throw new Error("Nieprawidłowe hasło!");
    }
});
exports.updatePassword = updatePassword;
const updateUser = (AdminUser) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield AdminUser.findOne({ _id: req.user._id }).select("+password");
    if (user && (yield user.matchPassword(password))) {
        user.username = username;
        user.email = email;
        return user.save();
    }
    else {
        throw new Error("Podane dane są nieprawidłowe!");
    }
});
exports.updateUser = updateUser;
exports.default = (AdminUser) => {
    return {
        loginAdmin: (0, exports.loginAdmin)(AdminUser),
        createAdmin: (0, exports.createAdmin)(AdminUser),
        updatePassword: (0, exports.updatePassword)(AdminUser),
        updateUser: (0, exports.updateUser)(AdminUser),
    };
};
