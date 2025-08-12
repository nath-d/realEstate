const API_BASE_URL = 'http://localhost:3000';

export const getAchievements = async () => {
    try {
        console.log('Making request to:', `${API_BASE_URL}/achievements`);
        const response = await fetch(`${API_BASE_URL}/achievements`);
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            throw new Error(`Failed to fetch achievements: ${response.status}`);
        }

        const data = await response.json();
        console.log('Parsed data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching achievements:', error);
        return [];
    }
};

export const getAchievement = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/achievements/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch achievement');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching achievement:', error);
        return null;
    }
};
