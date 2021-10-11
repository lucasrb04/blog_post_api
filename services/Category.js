const { Category } = require('../models');
const validations = require('./validationService');

const createCategory = async (name) => {
  const registeredCategory = await Category.findOne({ where: { name } });

  const isExist = validations.categoryExists(registeredCategory);

  if (isExist) return isExist;

  const createdCategory = await Category.create({ name });

  return createdCategory;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);

  const validCategory = validations.validCategory(category);

  if (validCategory) return validCategory;

  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};