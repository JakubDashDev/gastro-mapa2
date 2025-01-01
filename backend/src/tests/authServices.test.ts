import { Request, Response } from "express";
import AdminUserModel from "../models/adminUserModel";
import { AuthService } from "../services";
import authService from "../services/authService";
import generateToken from "../utils/generateToken";
import { RequestWithUser } from "../controllers/authController";

jest.mock("../utils/generateToken");

describe("loginAdmin", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  const user = {
    _id: "1",
    username: "admin",
    email: "admin@admin.com",
    password: "12345678",
    matchPassword: jest.fn().mockResolvedValue(true),
  };

  beforeEach(() => {
    req = {
      body: {
        ...user,
      },
    };
    res = {
      cookie: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("on success generate token and return user", async () => {
    //Arrange
    const MockModel = {
      findOne: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
      }),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    //Act
    const result = await service.loginAdmin(req as Request, res as Response);

    //Assert
    expect(MockModel.findOne).toHaveBeenCalledWith({ email: user.email, username: user.username });
    expect(user.matchPassword).toHaveBeenCalledWith(user.password);
    expect(generateToken).toHaveBeenCalledWith(res, user._id);
    expect(result).toEqual(user);
  });

  it("throws error if user not found", async () => {
    //Arrange
    const MockModel = {
      findOne: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      }),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    //Act & Assert
    try {
      await service.loginAdmin(req as Request, res as Response);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Podane dane są nieprawidłowe!");
      }
      expect(error).toBeDefined();
    }
  });

  it("throws error if invalid password provided", async () => {
    //Arrange
    user.matchPassword.mockResolvedValue(false);
    const MockModel = {
      findOne: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      }),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    try {
      await service.loginAdmin(req as Request, res as Response);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Podane dane są nieprawidłowe!");
      }
      expect(error).toBeDefined();
    }
  });
});

describe("update password", () => {
  let req: Partial<RequestWithUser>;
  let res: Partial<Response>;
  let save = jest.fn(function () {
    const { save, matchPassword, ...rest } = this;
    rest.password = req.body.password;
    rest.confirmPassword = req.body.confirmPassword;
    return { ...rest };
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
      user: {
        ...user,
      },
    };
    res = {
      cookie: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("on success return user with new password", async () => {
    //Arrange
    const MockModel = {
      findById: jest.fn(() => ({
        select: jest.fn(() => user),
      })),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    //Act
    const result = await service.updatePassword(req as RequestWithUser, res as Response);

    //Assert
    expect(MockModel.findById).toHaveBeenCalledWith(user._id);
    expect(user.matchPassword).toHaveBeenCalledWith(req.body.currentPassword);
    expect(save).toHaveBeenCalled();
    expect(result.password).toBe("87654321");
  });

  it("throws error if user not found", async () => {
    //Arrange
    const MockModel = {
      findById: jest.fn(() => ({
        select: jest.fn(() => null),
      })),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    //Act & Assert
    try {
      await service.updatePassword(req as RequestWithUser, res as Response);
    } catch (error) {
      expect(error).toBeDefined();

      if (error instanceof Error) {
        expect(error.message).toBe("Nie ma takiego użytkownika!");
      }
    }
  });

  it("throws error if provided password is wrong", async () => {
    //Arrange
    user.matchPassword.mockResolvedValue(false);

    const MockModel = {
      findById: jest.fn(() => ({
        select: jest.fn(() => user),
      })),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    try {
      await service.updatePassword(req as RequestWithUser, res as Response);
    } catch (error) {
      expect(error).toBeDefined();

      if (error instanceof Error) {
        expect(error.message).toBe("Nieprawidłowe hasło!");
      }
    }
  });

  it("throws error if provided passwords are not the same", async () => {
    //Arrange
    req.body.confirmPassword = "wrong!";

    const MockModel = {
      findById: jest.fn(() => ({
        select: jest.fn(() => user),
      })),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    //Act & Assert
    try {
      await service.updatePassword(req as RequestWithUser, res as Response);
    } catch (error) {
      expect(error).toBeDefined();

      if (error instanceof Error) {
        expect(error.message).toBe("Hasła muszą być takie same!");
      }
    }
  });
});

describe("update user", () => {
  let req: Partial<RequestWithUser>;
  let res: Partial<Response>;
  let save = jest.fn(function () {
    const { save, matchPassword, ...rest } = this;
    rest.username = req.body.username;
    rest.email = req.body.email;
    return { ...rest };
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
      user: {
        ...user,
      },
    };
    res = {
      cookie: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("on success calls save method", async () => {
    //Arrange
    const MockModel = {
      findOne: jest.fn(() => ({
        select: jest.fn(() => user),
      })),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    //Act
    const result = await service.updateUser(req as RequestWithUser, res as Response);

    //Assert
    expect(MockModel.findOne).toHaveBeenCalledWith({ _id: "1" });
    expect(user.matchPassword).toHaveBeenCalledWith(req.body.password);
    expect(result.username).toBe(req.body.username);
    expect(save).toHaveBeenCalled();
  });

  it("throws error if user not found", async () => {
    //Arrange
    const MockModel = {
      findOne: jest.fn(() => ({
        select: jest.fn(() => null),
      })),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    //Act & Assert
    try {
      await service.updateUser(req as RequestWithUser, res as Response);
    } catch (error) {
      expect(error).toBeDefined();

      if (error instanceof Error) {
        expect(error.message).toBe("Podane dane są nieprawidłowe!");
      }
    }
  });

  it("throws error if provided password is wrong", async () => {
    //Arrange
    req.body.password = "wrong!";

    const MockModel = {
      findOne: jest.fn(() => ({
        select: jest.fn(() => user),
      })),
    } as unknown as typeof AdminUserModel;

    const service = authService(MockModel);

    try {
      await service.updateUser(req as RequestWithUser, res as Response);
    } catch (error) {
      expect(error).toBeDefined();

      if (error instanceof Error) {
        expect(error.message).toBe("Podane dane są nieprawidłowe!");
      }
    }
  });
});
