const rescue = require('express-rescue');

const { postService } = require('../services');

const createPost = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;

  const createdPost = await postService.createPost(title, content, categoryIds, userId);
  
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
  const { title, content, categoryIds } = req.body;
  const { userId } = req;

  const postToUpdate = { postId: id, title, content, categoryIds, userId };

  const updatedPost = await postService.updatePost(postToUpdate);

  if (updatedPost.error) return next(updatedPost);

  res.status(200).json(updatedPost);
});

const deletePost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  const postToDelete = { postId: id, userId };

  const deletedPost = await postService.deletePost(postToDelete);
  if (deletedPost.error) return next(deletedPost);
  res.status(204).json();
});

const searchPosts = rescue(async (req, res, next) => {
  const { q } = req.query;

  const posts = await postService.searchPosts(q);

  if (posts.error) return next(posts);

  res.status(200).json(posts);
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};
