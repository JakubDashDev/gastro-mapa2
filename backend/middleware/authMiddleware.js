import AdminUser from '../models/AdminUserModel.js';
import asnycHandler from './asyncHandler.js';
import jwt from 'jsonwebtoken';

const protect = asnycHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = await AdminUser.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
