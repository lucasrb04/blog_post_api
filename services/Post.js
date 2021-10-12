const { BlogPost, User, Category } = require('../models');
const validations = require('./validationService');

const createPost = async (title, content, categoryIds, userId) => {
  const registeredPost = await BlogPost.findOne({ where: { title } });

  const isExist = validations.postExists(registeredPost);
  if (isExist) return isExist;

  const createdPost = await BlogPost.create({ title, content, categoryIds, userId });

  return createdPost;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
    {
      model: Category,
      as: 'categories',
      attributes: { exclude: ['PostsCategory'] },
    }],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id);

  const validPost = validations.validPost(post);

  if (validPost) return validPost;

  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};