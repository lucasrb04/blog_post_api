const displayNameValidation = (displayName, res) => {
  if (displayName.length < 8) {
    return res.status(400).json(
      { message: '"displayName" length must be at least 8 characters long' },
    );
  }
};
const emailValidation = (email, res) => {
  if (!email || email === '') { 
    return res.status(400).json({ message: '"email" is required' }); 
  }

  const emailRegex = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!emailRegex.test(email)) { 
    return res.status(400).json({ message: '"email" must be a valid email' }); 
  }
};

const passwordValidation = (password, res) => {
  if (!password || password === '') { 
    return res.status(400).json({ message: '"password" is required' }); 
  }

  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
};

const createUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  displayNameValidation(displayName, res);

  emailValidation(email, res);

  passwordValidation(password, res);

  next();
};

// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   const user = [email, password];
//   user.forEach((value) => {
//     if (!value || value === '') { 
//       return res.status(401).json({ message: 'All fields must be filled' }); 
//     }
//   });

//   next();
// };

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
  // login,
  // createRecipe,
  // validateImg,
};