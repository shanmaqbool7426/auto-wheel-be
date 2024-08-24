import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../User/model';
import responses from '../Utils/response';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return responses.unauthorized(res, 'Not authorized, user not found');
      }
      next();
    } catch (error) {
      return responses.unauthorized(res, 'Not authorized, token failed');
    }
  }
  if (!token) {
    return responses.unauthorized(res, 'Not authorized, no token provided');
  }
});

export { protect };
