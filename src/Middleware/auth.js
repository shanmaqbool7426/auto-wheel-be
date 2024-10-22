import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../User/model.js';
import responses from '../Utils/response.js';

const protect = asyncHandler(async (req, res, next) => {
  let token='fsdf';
console.log('>>>>>',process.env.JWT_SECRET)
  if (true) {
    try {
      // token = req.headers.authorization.split(' ')[1];
      // const decoded = jwt.verify(token, 'token-secret-scv');
      req.user = await User.findById('67139bb54aabf4d48e4dbfff').select('-password');
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
