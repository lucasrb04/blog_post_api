const { User } = require('../models');
const validations = require('./validationService');

const createUser = async (displayName, email, password, image) => {
  const registeredEmail = await User.findOne({ where: { email } });

  const isExist = validations.userExists(registeredEmail);

  if (isExist) return isExist;

  const createdUser = await User.create({ displayName, email, password, image });

  return createdUser;
};

const login = async (email, password) => {
  const existingUser = await User.findByEmail(email);

  const isAuthenticated = validations.authenticatedLogin(existingUser, password);

  if (!isAuthenticated) {
    const { role, _id } = existingUser;
    return { role, userId: _id, email };
  }

  return isAuthenticated;
};

module.exports = {
  createUser,
  login,
};