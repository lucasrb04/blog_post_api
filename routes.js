const express = require('express');

const { validations, authJWT } = require('./middlewares');
const { userController, categoryController, postController } = require('./controllers');

const router = express.Router();

router.post('/login', validations.login, userController.login);

router.post('/user', validations.createUser, userController.createUser);
router.get('/user', authJWT, userController.getAllUsers);
router.get('/user/:id', authJWT, userController.getUserById);

router.post('/categories', validations.createCategory, authJWT, categoryController.createCategory);
router.get('/categories', authJWT, categoryController.getAllCategories);

router.post('/post', validations.createPost, authJWT, postController.createPost);
router.get('/post', authJWT, postController.getAllPosts);
router.get('/post/:id', authJWT, postController.getPostById);
router.put('/post/:id', validations.updatePost, authJWT, postController.updatePost);
router.delete('/post/:id', authJWT, postController.deletePost);

module.exports = router;
