// models/postCategorie.js
module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategory',
    {},
    { timestamps: false });

  PostsCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategorie;
};