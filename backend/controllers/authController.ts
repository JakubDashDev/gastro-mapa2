import { Request, Response } from "express";
import asnycHandler from "../middleware/asyncHandler.js";
import AdminUser from "../models/AdminUserModel.js";
import generateToken from "../utils/generateToken.js";

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
    throw new Error("Invalid email or password");
  }
});

// const createAdmin = asnycHandler(async (req, res) => {
//   const { email, username, password } = req.body;

//   const userExist = await AdminUser.findOne({ email });
//   if (userExist) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   const user = await AdminUser.create({
//     username,
//     email,
//     password,
//   });

//   if (user) {
//     res.status(201).json(user);
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

export { authAdmin };
