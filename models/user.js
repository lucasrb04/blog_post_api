// Como dito anteriormente, não iremos trabalhar com classes,
// mas sim com a função sequelize.define() , então substitua
// este código pelo seguinte:
// models/user.js
const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamp: true,
    tableName: 'Users',
    underscored: true,
  });

  User.associate = (models) => {
    User.hasOne(models.blogPost,
      { foreignKey: 'userId', as: 'BlogPosts' });
  };

  return User;
};

module.exports = UserModel;