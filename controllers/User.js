const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { userService } = require('../services');

const getToken = (email) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ email }, secret, jwtConfig);

  return token;
};

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const createdUser = await userService.createUser(displayName, email, password, image);
  
  if (createdUser.error) return next(createdUser);
  
  const token = getToken(email);
  
  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo Produto
  res.status(201).json({ token });
});

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const loggedUser = await userService.login(email, password);

  if (loggedUser.error) return next(loggedUser);

  const token = getToken(email);
  
  res.status(200).json({ token });
});

module.exports = {
  createUser,
  login,
};
