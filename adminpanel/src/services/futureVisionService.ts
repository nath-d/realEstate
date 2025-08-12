import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/future-vision';

export interface FutureVisionContentDTO { visionText?: string | null }
export interface FutureVisionGoalDTO { id?: number; title: string; description: string; icon?: string }
export interface FutureVisionTimelineDTO { id?: number; year: string; description: string }

const futureVisionService = {
    async getContent(): Promise<FutureVisionContentDTO> {
        const res = await axios.get(`${API_BASE_URL}/content`);
        return res.data;
    },
    async upsertContent(data: FutureVisionContentDTO): Promise<FutureVisionContentDTO> {
        const res = await axios.put(`${API_BASE_URL}/content`, data);
        return res.data;
    },
    async listGoals(): Promise<FutureVisionGoalDTO[]> {
        const res = await axios.get(`${API_BASE_URL}/goals`);
        return res.data;
    },
    async createGoal(data: FutureVisionGoalDTO): Promise<FutureVisionGoalDTO> {
        const res = await axios.post(`${API_BASE_URL}/goals`, data);
        return res.data;
    },
    async updateGoal(id: number, data: Partial<FutureVisionGoalDTO>): Promise<FutureVisionGoalDTO> {
        const res = await axios.put(`${API_BASE_URL}/goals/${id}`, data);
        return res.data;
    },
    async removeGoal(id: number): Promise<void> { await axios.delete(`${API_BASE_URL}/goals/${id}`); },

    async listTimeline(): Promise<FutureVisionTimelineDTO[]> {
        const res = await axios.get(`${API_BASE_URL}/timeline`);
        return res.data;
    },
    async createTimeline(item: FutureVisionTimelineDTO): Promise<FutureVisionTimelineDTO> {
        const res = await axios.post(`${API_BASE_URL}/timeline`, item);
        return res.data;
    },
    async updateTimeline(id: number, item: Partial<FutureVisionTimelineDTO>): Promise<FutureVisionTimelineDTO> {
        const res = await axios.put(`${API_BASE_URL}/timeline/${id}`, item);
        return res.data;
    },
    async removeTimeline(id: number): Promise<void> { await axios.delete(`${API_BASE_URL}/timeline/${id}`); },
};

export default futureVisionService;


