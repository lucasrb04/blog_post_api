const displayNameValidation = (displayName, res) => {
  if (displayName.length < 8) {
    return res.status(400).json(
      { message: '"displayName" length must be at least 8 characters long' },
    );
  }
};
const emailValidation = (email, res) => {
  if (email === undefined) { 
    return res.status(400).json({ message: '"email" is required' }); 
  }

  if (email === '') { 
    return res.status(400).json({ message: '"email" is not allowed to be empty' }); 
  }

  const emailRegex = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!emailRegex.test(email)) { 
    return res.status(400).json({ message: '"email" must be a valid email' }); 
  }
};

const passwordValidation = (password, res) => {
  if (password === undefined) { 
    return res.status(400).json({ message: '"password" is required' }); 
  }

  if (password === '') { 
    return res.status(400).json({ message: '"password" is not allowed to be empty' }); 
  }

  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
};

const nameValidation = (name, res) => {
  if (name === undefined) { 
    return res.status(400).json({ message: '"name" is required' }); 
  }
};

const createUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  displayNameValidation(displayName, res);

  emailValidation(email, res);

  passwordValidation(password, res);

  next();
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  emailValidation(email, res);

  passwordValidation(password, res);

  next();
};

const createCategorie = (req, res, next) => {
  const { name } = req.body;

  nameValidation(name, res);

  next();
};

// const createRecipe = (req, res, next) => {
//   const { name, ingredients, preparation } = req.body;
//   const recipe = [name, ingredients, preparation];
//   existingFields(recipe, res);

//   next();
// };

// const validateImg = (req, res, next) => {
//   if (req.file.mimetype !== 'image/jpeg') {
//     return res.status(400).json({ message: 'Wrong file format' }); 
//   }
//   next();
// };

module.exports = {
  createUser,
  login,
  createCategorie,
  // createRecipe,
  // validateImg,
};