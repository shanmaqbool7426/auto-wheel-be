import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../User/model.js';
import responses from '../Utils/response.js';

const protect = asyncHandler(async (req, res, next) => {

  let token = req.headers.authorization
  if (token) {
    console.log('token',token)
    try {
      const decoded = jwt.verify(token, 'token-secret-scv');

      req.user = await User.findById(decoded?.id).select('-password');
      console.log('>>>>>>>>>>>>',req.user)
      // if (!req.user) {
      //   return responses.unauthorized(res, 'Not authorized, user not found');
      // }
      next();
    } catch (error) {
      console.log('error',error)
      return responses.unauthorized(res, 'Not authorized, token failed');
    }
  }
  if (!token) {
    return responses.unauthorized(res, 'Not authorized, no token provided');
  }
});

export { protect };
