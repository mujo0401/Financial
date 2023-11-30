import categoryRepository from '../repositories/categoryRepository.js';

const getCategories = (req, res) => {
  try {
    const categories = categoryRepository.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

export default {
  getCategories,
};
