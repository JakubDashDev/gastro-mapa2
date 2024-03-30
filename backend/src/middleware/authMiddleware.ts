import { NextFunction, Request, Response } from "express";
import AdminUser from "../models/adminUserModel.js";
import asnycHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

interface RequestWithUser extends Request {
  user: any;
}

const protect = asnycHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const { userId } = (await jwt.verify(
          token,
          process.env.JWT_SECRET!
        )) as JwtPayload;

        req.user = await AdminUser.findById(userId).select("-password");

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
