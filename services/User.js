const { User } = require('../models');
const validations = require('./validationService');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const createUser = async (displayName, email, password, image) => {
  const registeredEmail = await User.findOne({ where: { email } });

  const isExist = validations.userExists(registeredEmail);

  if (isExist) return isExist;

  const createdUser = await User.create({ displayName, email, password, image });

  return createdUser;
};

const login = async (email, password) => {
  const registeredEmail = await User.findOne({ where: { email } });

  const isAuthenticated = validations.authenticatedLogin(registeredEmail, password);

  if (!isAuthenticated) {
    const { role, _id } = registeredEmail;
    return { role, userId: _id, email };
  }

  return isAuthenticated;
};

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  const validUser = validations.validUser(user);

  if (validUser) return validUser;

  return user;
};

const deleteMyUser = async (userId) => {
  const user = await User.findByPk(userId);

  const validUser = validations.validUser(user);

  if (validUser) return validUser;

  await user.destroy();

  return { message: 'User deleted successfully' };
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteMyUser,
};