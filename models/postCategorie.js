// models/postCategorie.js
module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie',
    {},
    { timestamps: false });

  PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostCategorie,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return PostCategorie;
};