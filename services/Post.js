const { BlogPost, User, Category, PostsCategories } = require('../models');
const validations = require('./validationService');

const createPost = async (title, content, categoryIds, userId) => {
  const registeredPost = await BlogPost.findOne({ where: { title } });

  const isExist = validations.postExists(registeredPost);
  if (isExist) return isExist;

  const createdPost = await BlogPost.create({ title, content, userId });
// https://oieduardorabelo.medium.com/javascript-armadilhas-do-asyn-await-em-loops-1cdad44db7f0
  categoryIds.map(async (categoryId) => {
    await PostsCategories.create({ postId: createdPost.id, categoryId });
  });
  
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
      // para não exibir os valores da tabela PostCategory, usamos o seguinte atributo. (tabela de conexão)
      // https://www.youtube.com/watch?v=p83qrlaCRw4 minuto: 14:50
      through: { attributes: [] },
    }],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
    {
      model: Category,
      as: 'categories',
      // para não exibir os valores da tabela PostCategory, usamos o seguinte atributo. (tabela de conexão)
      // https://www.youtube.com/watch?v=p83qrlaCRw4 minuto: 14:50
      through: { attributes: [] },
    }],
  });

  const validPost = validations.validPost(post);

  if (validPost) return validPost;

  return post;
};

const updatePost = async (postToUpdate) => {
  const { postId, title, content, userId } = postToUpdate;

  const registeredPost = await BlogPost.findOne(
    { 
      where: { id: postId },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    },
  );

  const isValid = validations.validPost(registeredPost, userId);
  
  if (isValid) return isValid;
  await BlogPost.update(
    { title, content },
    { 
      where: { id: postId },
    },
  );
  return { title, content, userId, categories: registeredPost.categories };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};