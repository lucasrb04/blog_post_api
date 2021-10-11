const express = require('express');

const { validations, authJWT } = require('./middlewares');
const { userController } = require('./controllers');

const router = express.Router();

router.post('/user', validations.createUser, userController.createUser);
router.post('/login', validations.login, userController.login);
router.get('/user', authJWT, userController.getAllUsers);

module.exports = router;

// router.post('/', productsController.create);
// router.get('/:id', productsController.getById);
// router.put('/:id', productsController.update);
// router.delete('/:id', productsController.deleteOne);

// router.post('user', validate.createUser, userController.createUser);
// router.get('images/:id.jpeg', recipeController.getImage);

// router.get('recipes', recipeController.getAllRecipes);
// router.post('recipes', authJWT, validate.createRecipe, recipeController.createRecipe);
// router.get('recipes/:id', recipeController.getRecipeById);
// router.put('recipes/:id', authJWT, recipeController.updateRecipe);
// router.delete('recipes/:id', authJWT, recipeController.deleteRecipe);