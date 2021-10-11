const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { categoryService } = require('../services');

const getToken = (email) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ email }, secret, jwtConfig);

  return token;
};

const createCategory = rescue(async (req, res, next) => {
  const { name } = req.body;

  const createdCategory = await categoryService.createCategory(name);
  
  if (createdCategory.error) return next(createdCategory);

  res.status(201).json(createdCategory);
});

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const loggedUser = await categoryService.login(email, password);

  if (loggedUser.error) return next(loggedUser);

  const token = getToken(email);
  
  res.status(200).json({ token });
});

const getAllUsers = rescue(async (_req, res, _next) => {
  const users = await categoryService.getAllUsers();

  res.status(200).json(users);
});

const getUserById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const user = await categoryService.getUserById(id);

  if (user.error) return next(user);

  // Caso não haja nenhum erro, retornamos o product encontrado
  res.status(200).json(user);
});

module.exports = {
  createCategory,
  login,
  getAllUsers,
  getUserById,
};
