const Category = require('../models/Category');

const getAllCategories = async() => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
}
const getAllCategoriesPopulars = async() => {
  try {
    const categories = await Category.find({is_popular: true}).sort({display_order: 1});
    return categories;
  } catch (error) {
    throw new Error('Failed to fetch popular categories');
  }
}