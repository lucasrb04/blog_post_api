// models/postCategorie.js
module.exports = (sequelize, _DataTypes) => {
  const postCategorie = sequelize.define('postCategorie',
    {},
    { timestamps: false });

  postCategorie.associate = (models) => {
    models.blogPost.belongsToMany(models.categorie, {
      as: 'categories',
      through: postCategorie,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.categorie.belongsToMany(models.blogPost, {
      as: 'books',
      through: postCategorie,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return postCategorie;
};