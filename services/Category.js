const { Category } = require('../models');
const validations = require('./validationService');

const createCategory = async (name) => {
  const registeredCategory = await Category.findOne({ where: { name } });

  console.log('cheguei');
  const isExist = validations.categoryExists(registeredCategory);

  if (isExist) return isExist;

  const createdCategory = await Category.create({ name });

  return createdCategory;
};

const login = async (email, password) => {
  const registeredEmail = await Category.findOne({ where: { email } });

  const isAuthenticated = validations.authenticatedLogin(registeredEmail, password);

  if (!isAuthenticated) {
    const { role, _id } = registeredEmail;
    return { role, userId: _id, email };
  }

  return isAuthenticated;
};

const getAllUsers = async () => {
  const users = await Category.findAll();

  return users;
};

const getUserById = async (id) => {
  const user = await Category.findByPk(id);

  const validUser = validations.validUser(user);

  if (validUser) return validUser;

  return user;
};

module.exports = {
  createCategory,
  login,
  getAllUsers,
  getUserById,
};