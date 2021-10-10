// Como dito anteriormente, não iremos trabalhar com classes,
// mas sim com a função sequelize.define() , então substitua
// este código pelo seguinte:
// models/categorie.js
const CategorieModel = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  },
  {
    tableName: 'Categories',
  });

  return Categorie;
};

module.exports = CategorieModel;