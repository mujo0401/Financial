import axios from 'axios';

export const searchDescriptionsByName = async (name) => {
    try {
        const response = await axios.get(`$p{rocess.env.SERVER_API_URL/api/descriptions/search`, { params: { name } });
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};


export const fetchDescriptions = async (searchTerm = '') => {
    try {
        const response = await axios.get(`$process.env.SERVER_API_URL?search=${encodeURIComponent(searchTerm)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching descriptions:', error);
        throw error;
    }
};

export const createDescription = async (descriptionData) => {
    try {
        const response = await axios.post(process.env.SERVER_API_URL, descriptionData);
        return response.data;
    } catch (error) {
        console.error('Error creating description:', error);
        throw error;
    }
};

export const updateDescription = async (descriptionId, descriptionData) => {
    try {
        const response = await axios.put(`$process.env.SERVER_API_URL/${descriptionId}`, descriptionData);
        return response.data;
    } catch (error) {
        console.error('Error updating description:', error);
        throw error;
    }
};

export const deleteDescription = async (descriptionId) => {
    try {
        const response = await axios.delete(`/api/descriptions/${descriptionId}`);
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};



