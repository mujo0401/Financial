import Category from '../models/categoryModel.js';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category({
            CategoryName: req.body.CategoryName,
            isActive: req.body.isActive
        });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { CategoryName: req.body.CategoryName, isActive: req.body.isActive },
            { new: true }  // to return the updated document
        );
        if (updatedCategory) {
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (deletedCategory) {
            res.json({ message: 'Category deleted' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search categories by name
export const searchCategoriesByName = async (req, res) => {
    try {
        const searchName = req.query.name;
        const categories = await Category.find({ CategoryName: { $regex: searchName, $options: 'i' } });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
