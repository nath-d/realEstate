import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/core-strengths';

export interface CoreStrengthDTO {
    id?: number;
    title: string;
    description: string;
    icon?: string;
    createdAt?: string;
    updatedAt?: string;
}

const coreStrengthService = {
    async list(): Promise<CoreStrengthDTO[]> {
        const res = await axios.get(API_BASE_URL);
        return res.data;
    },
    async create(data: CoreStrengthDTO): Promise<CoreStrengthDTO> {
        const res = await axios.post(API_BASE_URL, data);
        return res.data;
    },
    async update(id: number, data: Partial<CoreStrengthDTO>): Promise<CoreStrengthDTO> {
        const res = await axios.put(`${API_BASE_URL}/${id}`, data);
        return res.data;
    },
    async remove(id: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
};

export default coreStrengthService;


