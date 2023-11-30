// apiConfig.js

const BASE_URL = 'http://localhost:3000/api'; // Adjust the base URL as needed

export const CHECK_CATEGORY_EXISTS_URL = `${BASE_URL}/categories/check-exists`;
export const CREATE_CATEGORY_URL = `${BASE_URL}/categories`;
// ... more API endpoints as needed

// Optionally, you can also export functions to construct URLs with parameters
export const getCategoryUrl = categoryId => `${BASE_URL}/categories/${categoryId}`;
