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

  const registeredPost = await BlogPost.findByPk({ id: postId });

  const isValid = validations.validPost(registeredPost, userId);

  if (isValid) return isValid;

  const updatedPost = await BlogPost.update(
    { title, content },
    { where: { postId } },
);

  return updatedPost;
};

//   try {
//     const { title, author, pageQuantity } = req.body;
//     const { id } = req.params;

//     const [updateBook] = await Book.update(
//       { title, author, pageQuantity },
//       { where: { id } },
//     );

//     console.log(updateBook); // confira o que é retornado quando o book com o id é ou não encontrado;

//     if(!updateBook) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Algo deu errado' });
//   }
// });

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};