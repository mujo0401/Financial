import axios from 'axios';

const baseUrl = '/api/descriptions';

export const fetchDescriptions = async (searchTerm = '') => {
    try {
        const response = await axios.get(`${baseUrl}?search=${encodeURIComponent(searchTerm)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching descriptions:', error);
        throw error;
    }
};

export const createDescription = async (descriptionData) => {
    try {
        const response = await axios.post(baseUrl, descriptionData);
        return response.data;
    } catch (error) {
        console.error('Error creating description:', error);
        throw error;
    }
};

export const updateDescription = async (descriptionId, descriptionData) => {
    try {
        const response = await axios.put(`${baseUrl}/${descriptionId}`, descriptionData);
        return response.data;
    } catch (error) {
        console.error('Error updating description:', error);
        throw error;
    }
};
