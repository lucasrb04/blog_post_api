const rescue = require('express-rescue');

const { postService } = require('../services');

const createPost = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const createdPost = await postService.createPost(title, content, categoryIds);
  
  if (createdPost.error) return next(createdPost);

  res.status(201).json(createdPost);
});

const getAllPosts = rescue(async (_req, res, _next) => {
  const posts = await postService.getAllPosts();

  res.status(200).json(posts);
});

const getPostById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

  if (post.error) return next(post);

  // Caso não haja nenhum erro, retornamos o product encontrado
  res.status(200).json(post);
});

const updatePost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedPost = await postService.updatePost(id, name);

  if (updatedPost.error) return next(updatedPost);

  res.status(200).json(updatedPost);
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
