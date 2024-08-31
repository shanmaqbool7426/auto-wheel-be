import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, 'token-secret-scv', {
    expiresIn: '30d',
  });
};

export default generateToken;
