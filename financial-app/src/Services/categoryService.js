import axios from 'axios';

export const searchCategoriesByName = async (name) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/search`, { params: { name } });
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};

export const fetchCategories = async (searchTerm = '') => {
    const queryParam = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories${queryParam}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/categories`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/categories${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/categories${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};