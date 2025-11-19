import config from '../../config.js';

const API_BASE_URL = config.api.baseUrl;

export const propertyService = {
    // Get all properties
    async getAllProperties() {
        try {
            const response = await fetch(`${API_BASE_URL}/properties`);
            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    // Get a single property by ID
    async getPropertyById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/properties/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch property');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching property:', error);
            throw error;
        }
    },

    // Get featured properties (properties with featured: true)
    async getFeaturedProperties() {
        try {
            const response = await fetch(`${API_BASE_URL}/properties`);
            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }
            const properties = await response.json();
            return properties.filter(property => property.featured);
        } catch (error) {
            console.error('Error fetching featured properties:', error);
            throw error;
        }
    },

    // Get similar properties
    async getSimilarProperties(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/properties/${id}/similar`);
            if (!response.ok) {
                throw new Error('Failed to fetch similar properties');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching similar properties:', error);
            throw error;
        }
    }
}; 