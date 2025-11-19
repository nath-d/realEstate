import config from '../../config.js';

const API_BASE_URL = config.api.baseUrl;

export const getCoreStrengths = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/core-strengths`);
        if (!res.ok) throw new Error('Failed to fetch core strengths');
        return await res.json();
    } catch (e) {
        console.error('Error fetching core strengths:', e);
        return [];
    }
};


