import { Request, Response } from "express";
import asnycHandler from "../middleware/asyncHandler.js";
import AdminUser from "../models/adminUserModel.js";
import generateToken from "../utils/generateToken.js";

interface RequestWithUser extends Request {
  user: {
    _id: string;
    email: string;
    username: string;
  };
}

const authAdmin = asnycHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = await AdminUser.findOne({ email, username }).select("+password");

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Podane dane są nieprawidłowe!");
  }
});

const createAdmin = asnycHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const userExist = await AdminUser.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await AdminUser.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logout = asnycHandler(async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Success!" });
});

const updatePassword = asnycHandler(async (req: RequestWithUser, res: Response) => {
  const { currentPassword, password, confirmPassword } = req.body;

  const user = await AdminUser.findById(req.user._id).select("+password");

  if (!user) {
    res.status(404);
    throw new Error("Nie ma takiego użytkownika!");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Hasła muszą być takie same!");
  }

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = password;
    user.confirmPassword = confirmPassword;
    await user.save();
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Nieprawidłowe hasło!");
  }
});

const updateUser = asnycHandler(async (req: RequestWithUser, res: Response) => {
  const { username, email, password } = req.body;

  const user = await AdminUser.findOne({ _id: req.user._id }).select("+password");

  if (user && (await user.matchPassword(password))) {
    user.username = username;
    user.email = email;

    await user.save();
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Podane dane są nieprawidłowe!");
  }
});

export { authAdmin, createAdmin, logout, updatePassword, updateUser };
