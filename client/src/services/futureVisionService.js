import config from '../../config.js';

const API_BASE_URL = config.api.baseUrl;

export const getFutureVisionContent = async () => {
    try { const res = await fetch(`${API_BASE_URL}/future-vision/content`); if (!res.ok) throw new Error('Failed'); return await res.json(); }
    catch (e) { console.error('Error fetching future vision content', e); return { visionText: null }; }
};

export const getFutureVisionGoals = async () => {
    try { const res = await fetch(`${API_BASE_URL}/future-vision/goals`); if (!res.ok) throw new Error('Failed'); return await res.json(); }
    catch (e) { console.error('Error fetching goals', e); return []; }
};

export const getFutureVisionTimeline = async () => {
    try { const res = await fetch(`${API_BASE_URL}/future-vision/timeline`); if (!res.ok) throw new Error('Failed'); return await res.json(); }
    catch (e) { console.error('Error fetching timeline', e); return []; }
};


