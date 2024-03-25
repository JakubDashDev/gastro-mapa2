import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const generateToken = (res: Response, userId: ObjectId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    // sameSite: 'strict',
    maxAge: 86400000, // 1 day
  });
};

export default generateToken;
