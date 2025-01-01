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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
jest.mock("../utils/generateToken");
describe("loginAdmin", () => {
    let req;
    let res;
    const user = {
        _id: "1",
        username: "admin",
        email: "admin@admin.com",
        password: "12345678",
        matchPassword: jest.fn().mockResolvedValue(true),
    };
    beforeEach(() => {
        req = {
            body: Object.assign({}, user),
        };
        res = {
            cookie: jest.fn(),
        };
        jest.clearAllMocks();
    });
    it("on success generate token and return user", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const MockModel = {
            findOne: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue(user),
            }),
        };
        const service = (0, authService_1.default)(MockModel);
        //Act
        const result = yield service.loginAdmin(req, res);
        //Assert
        expect(MockModel.findOne).toHaveBeenCalledWith({ email: user.email, username: user.username });
        expect(user.matchPassword).toHaveBeenCalledWith(user.password);
        expect(generateToken_1.default).toHaveBeenCalledWith(res, user._id);
        expect(result).toEqual(user);
    }));
    it("throws error if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const MockModel = {
            findOne: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue(null),
            }),
        };
        const service = (0, authService_1.default)(MockModel);
        //Act & Assert
        try {
            yield service.loginAdmin(req, res);
        }
        catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe("Podane dane są nieprawidłowe!");
            }
            expect(error).toBeDefined();
        }
    }));
    it("throws error if invalid password provided", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        user.matchPassword.mockResolvedValue(false);
        const MockModel = {
            findOne: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue(null),
            }),
        };
        const service = (0, authService_1.default)(MockModel);
        try {
            yield service.loginAdmin(req, res);
        }
        catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe("Podane dane są nieprawidłowe!");
            }
            expect(error).toBeDefined();
        }
    }));
});
describe("update password", () => {
    let req;
    let res;
    let save = jest.fn(function () {
        const _a = this, { save, matchPassword } = _a, rest = __rest(_a, ["save", "matchPassword"]);
        rest.password = req.body.password;
        rest.confirmPassword = req.body.confirmPassword;
        return Object.assign({}, rest);
    });
    const user = {
        _id: "1",
        username: "admin",
        email: "admin@admin.com",
        password: "12345678",
        matchPassword: jest.fn().mockResolvedValue(true),
        save,
    };
    beforeEach(() => {
        req = {
            body: {
                currentPassword: "12345678",
                confirmPassword: "87654321",
                password: "87654321",
            },
            user: Object.assign({}, user),
        };
        res = {
            cookie: jest.fn(),
        };
        jest.clearAllMocks();
    });
    it("on success return user with new password", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const MockModel = {
            findById: jest.fn(() => ({
                select: jest.fn(() => user),
            })),
        };
        const service = (0, authService_1.default)(MockModel);
        //Act
        const result = yield service.updatePassword(req, res);
        //Assert
        expect(MockModel.findById).toHaveBeenCalledWith(user._id);
        expect(user.matchPassword).toHaveBeenCalledWith(req.body.currentPassword);
        expect(save).toHaveBeenCalled();
        expect(result.password).toBe("87654321");
    }));
    it("throws error if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const MockModel = {
            findById: jest.fn(() => ({
                select: jest.fn(() => null),
            })),
        };
        const service = (0, authService_1.default)(MockModel);
        //Act & Assert
        try {
            yield service.updatePassword(req, res);
        }
        catch (error) {
            expect(error).toBeDefined();
            if (error instanceof Error) {
                expect(error.message).toBe("Nie ma takiego użytkownika!");
            }
        }
    }));
    it("throws error if provided password is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        user.matchPassword.mockResolvedValue(false);
        const MockModel = {
            findById: jest.fn(() => ({
                select: jest.fn(() => user),
            })),
        };
        const service = (0, authService_1.default)(MockModel);
        try {
            yield service.updatePassword(req, res);
        }
        catch (error) {
            expect(error).toBeDefined();
            if (error instanceof Error) {
                expect(error.message).toBe("Nieprawidłowe hasło!");
            }
        }
    }));
    it("throws error if provided passwords are not the same", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        req.body.confirmPassword = "wrong!";
        const MockModel = {
            findById: jest.fn(() => ({
                select: jest.fn(() => user),
            })),
        };
        const service = (0, authService_1.default)(MockModel);
        //Act & Assert
        try {
            yield service.updatePassword(req, res);
        }
        catch (error) {
            expect(error).toBeDefined();
            if (error instanceof Error) {
                expect(error.message).toBe("Hasła muszą być takie same!");
            }
        }
    }));
});
describe("update user", () => {
    let req;
    let res;
    let save = jest.fn(function () {
        const _a = this, { save, matchPassword } = _a, rest = __rest(_a, ["save", "matchPassword"]);
        rest.username = req.body.username;
        rest.email = req.body.email;
        return Object.assign({}, rest);
    });
    let matchPassword = jest.fn(function () {
        return this.password === req.body.password;
    });
    const user = {
        _id: "1",
        username: "admin",
        email: "admin@admin.com",
        password: "12345678",
        matchPassword,
        save,
    };
    beforeEach(() => {
        req = {
            body: {
                username: "new username",
                email: "email@email.com",
                password: "12345678",
            },
            user: Object.assign({}, user),
        };
        res = {
            cookie: jest.fn(),
        };
        jest.clearAllMocks();
    });
    it("on success calls save method", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const MockModel = {
            findOne: jest.fn(() => ({
                select: jest.fn(() => user),
            })),
        };
        const service = (0, authService_1.default)(MockModel);
        //Act
        const result = yield service.updateUser(req, res);
        //Assert
        expect(MockModel.findOne).toHaveBeenCalledWith({ _id: "1" });
        expect(user.matchPassword).toHaveBeenCalledWith(req.body.password);
        expect(result.username).toBe(req.body.username);
        expect(save).toHaveBeenCalled();
    }));
    it("throws error if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        const MockModel = {
            findOne: jest.fn(() => ({
                select: jest.fn(() => null),
            })),
        };
        const service = (0, authService_1.default)(MockModel);
        //Act & Assert
        try {
            yield service.updateUser(req, res);
        }
        catch (error) {
            expect(error).toBeDefined();
            if (error instanceof Error) {
                expect(error.message).toBe("Podane dane są nieprawidłowe!");
            }
        }
    }));
    it("throws error if provided password is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        //Arrange
        req.body.password = "wrong!";
        const MockModel = {
            findOne: jest.fn(() => ({
                select: jest.fn(() => user),
            })),
        };
        const service = (0, authService_1.default)(MockModel);
        try {
            yield service.updateUser(req, res);
        }
        catch (error) {
            expect(error).toBeDefined();
            if (error instanceof Error) {
                expect(error.message).toBe("Podane dane są nieprawidłowe!");
            }
        }
    }));
});
