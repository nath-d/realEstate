import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/why-choose-us';

export interface WhyReasonDTO {
    id?: number;
    title: string;
    description: string;
    stat?: string;
    statText?: string;
    icon?: string;
    bgImageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

const whyChooseUsService = {
    async listAll(): Promise<WhyReasonDTO[]> {
        const res = await axios.get(`${API_BASE_URL}/all`);
        return res.data;
    },
    async create(data: WhyReasonDTO): Promise<WhyReasonDTO> {
        const res = await axios.post(API_BASE_URL, data);
        return res.data;
    },
    async update(id: number, data: Partial<WhyReasonDTO>): Promise<WhyReasonDTO> {
        const res = await axios.put(`${API_BASE_URL}/${id}`, data);
        return res.data;
    },
    async remove(id: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};

export default whyChooseUsService;


