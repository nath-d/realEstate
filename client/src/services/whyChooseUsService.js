const API_BASE_URL = 'http://localhost:3000';

export const getWhyReasons = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/why-choose-us`);
        if (!response.ok) throw new Error('Failed to fetch reasons');
        return await response.json();
    } catch (e) {
        console.error('Error fetching why-choose-us reasons:', e);
        return [];
    }
};


