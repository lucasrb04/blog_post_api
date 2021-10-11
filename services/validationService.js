const userExists = (existingUser) => {
  if (existingUser) {
    return {
      number: 409,
      error: {
        message: 'User already registered',
      },
    };
  }
};

const authenticatedLogin = (existingUser, password) => {
  if (!existingUser || existingUser.password !== password) {
    return {
      number: 400,
      error: {
        message: 'Invalid fields',
      },
    };
  }
};

module.exports = {
  userExists,
  authenticatedLogin,
};