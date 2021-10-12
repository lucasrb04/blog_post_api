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

const categoryExists = (existingCategory) => {
  if (existingCategory) {
    return {
      number: 409,
      error: {
        message: 'Category already registered',
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

const validUser = (user) => {
  if (!user) {
    return {
      number: 404,
      error: {
        message: 'User does not exist',
      },
    };
  }
};

const validCategory = (user) => {
  if (!user) {
    return {
      number: 404,
      error: {
        message: 'Category does not exist',
      },
    };
  }
};

const postExists = (existingPost) => {
  if (existingPost) {
    return {
      number: 409,
      error: {
        message: 'Post already registered',
      },
    };
  }
};

module.exports = {
  userExists,
  authenticatedLogin,
  validUser,
  validCategory,
  categoryExists,
  postExists,
};