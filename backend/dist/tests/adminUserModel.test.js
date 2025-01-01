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
const adminUserModel_1 = __importDefault(require("../models/adminUserModel"));
const one = new adminUserModel_1.default({
    email: "test1@test.com",
    password: "12345678",
    username: "test1",
});
const two = new adminUserModel_1.default({
    email: "test2@test.com",
    password: "12345678",
    username: "test2",
});
it("gets user by id", () => __awaiter(void 0, void 0, void 0, function* () {
    //Arrange
    const user_one = yield one.save();
    //Act
    const result = yield adminUserModel_1.default.findById(user_one._id);
    //Assert
    expect(result).toBeDefined();
    expect(result === null || result === void 0 ? void 0 : result.email).toBe(user_one.email);
}));
it("update password", () => __awaiter(void 0, void 0, void 0, function* () {
    //Arrange
    const user_one = yield one.save();
    //Act
    user_one.password = "87654321";
    const newUser = yield user_one.save();
    //Assert
    expect(newUser.passwordChangeAt).toBeDefined();
}));
it("update user", () => __awaiter(void 0, void 0, void 0, function* () {
    //Arrange
    const user_one = yield one.save();
    //Act
    user_one.email = "new@new.com";
    user_one.username = "newUsername";
    //Assert
    expect(user_one.email).toBe("new@new.com");
    expect(user_one.username).toBe("newUsername");
}));
