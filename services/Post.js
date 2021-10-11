const { Post } = require('../models');
const validations = require('./validationService');

const createPost = async (title, content, categoryIds) => {
  const registeredPost = await Post.findOne({ where: { title } });

  const isExist = validations.postExists(registeredPost);

  if (isExist) return isExist;

  const createdPost = await Post.create({ title, content, categoryIds });

  return createdPost;
};

const getAllPosts = async () => {
  const posts = await Post.findAll();

  return posts;
};

const getPostById = async (id) => {
  const post = await Post.findByPk(id);

  const validPost = validations.validPost(post);

  if (validPost) return validPost;

  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};