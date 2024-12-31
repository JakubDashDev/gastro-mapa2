import { Request, Response } from "express";
import asnycHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { AuthService } from "../services/index.js";

export interface RequestWithUser extends Request {
  user: {
    _id: string;
    email: string;
    username: string;
  };
}

const authAdmin = async (req: Request, res: Response) => {
  const user = await AuthService.loginAdmin(req, res);

  return res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
};

// const createAdmin = asnycHandler(async (req: Request, res: Response) => {
//   const user = await AuthService.createAdmin(req, res);

//   res.status(200).json(user);
// });

const logout = async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Success!" });
};

const updatePassword = async (req: RequestWithUser, res: Response) => {
  const user = await AuthService.updatePassword(req, res);

  generateToken(res, user._id);

  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
};

const updateUser = async (req: RequestWithUser, res: Response) => {
  const user = await AuthService.updateUser(req, res);

  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
};

export { authAdmin, logout, updatePassword, updateUser };
