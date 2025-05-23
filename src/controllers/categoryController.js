const Category = require('../models/Category');

// Create a new category
const createCategory = async(req, res) => {
  try {
    const {name, description, image, is_popular, display_order} = req.body;
    //const imageUrl = await uploadFile(image, 'categories');
    const category = await Category.create({name, description, image: image, is_popular, display_order});
    res.status(201).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(500).json({status: 'error', message: error.message});
  }
}

// Get all categories
const getAllCategories = async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const categories = await Category.find().skip(skip).limit(limit); 
    const totalPages = Math.ceil(categories.length / limit);
    if(!categories){
      return res.status(404).json({
        status: '404',
        message: 'No categories found'
      })
    }
    res.status(200).json({
      status: '200',
      message: 'Categories fetched successfully',
      data: categories,
      totalPages: totalPages,
      currentPage: page
    })
  } catch (error) {
    res.status(500).json({status: 'error', message: error.message});
  }
}
module.exports ={
  createCategory,
  getAllCategories
}



