import axios from 'axios';

const baseUrl = '/api/categories';

export const fetchCategories = async (searchTerm = '') => {
    try {
        const response = await axios.get(`${baseUrl}?search=${encodeURIComponent(searchTerm)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(baseUrl, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await axios.put(`${baseUrl}/${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};
