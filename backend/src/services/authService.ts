import { Request, Response } from "express";
import AdminUserModel from "../models/adminUserModel";
import generateToken from "../utils/generateToken";
import { RequestWithUser } from "../controllers/authController";

export const loginAdmin = (AdminUser: typeof AdminUserModel) => async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = await AdminUser.findOne({ email, username }).select("+password");

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    return user;
  } else {
    throw new Error("Podane dane są nieprawidłowe!");
  }
};

export const createAdmin = (AdminUser: typeof AdminUserModel) => async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const userExist = await AdminUser.findOne({ email });

  if (userExist) {
    throw new Error("User already exists");
  }

  const user = await AdminUser.create({
    username,
    email,
    password,
  });

  if (user) {
    return user;
  } else {
    throw new Error("Invalid user data");
  }
};

export const updatePassword = (AdminUser: typeof AdminUserModel) => async (req: RequestWithUser, res: Response) => {
  const { currentPassword, password, confirmPassword } = req.body;

  const user = await AdminUser.findById(req.user._id).select("+password");

  if (!user) {
    throw new Error("Nie ma takiego użytkownika!");
  }

  if (password !== confirmPassword) {
    throw new Error("Hasła muszą być takie same!");
  }

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = password;
    user.confirmPassword = confirmPassword;
    return user.save();
  } else {
    throw new Error("Nieprawidłowe hasło!");
  }
};

export const updateUser = (AdminUser: typeof AdminUserModel) => async (req: RequestWithUser, res: Response) => {
  const { username, email, password } = req.body;

  const user = await AdminUser.findOne({ _id: req.user._id }).select("+password");

  if (user && (await user.matchPassword(password))) {
    user.username = username;
    user.email = email;

    return user.save();
  } else {
    throw new Error("Podane dane są nieprawidłowe!");
  }
};

export default (AdminUser: typeof AdminUserModel) => {
  return {
    loginAdmin: loginAdmin(AdminUser),
    createAdmin: createAdmin(AdminUser),
    updatePassword: updatePassword(AdminUser),
    updateUser: updateUser(AdminUser),
  };
};
