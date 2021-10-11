const rescue = require('express-rescue');

const { categoryService } = require('../services');

const createCategory = rescue(async (req, res, next) => {
  const { name } = req.body;

  const createdCategory = await categoryService.createCategory(name);
  
  if (createdCategory.error) return next(createdCategory);

  res.status(201).json(createdCategory);
});

const getAllCategories = rescue(async (_req, res, _next) => {
  const categories = await categoryService.getAllCategories();

  res.status(200).json(categories);
});

const getCategoryById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);

  if (category.error) return next(category);

  // Caso não haja nenhum erro, retornamos o product encontrado
  res.status(200).json(category);
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};
