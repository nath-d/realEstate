import axios from 'axios';
import config from '../../config';

const API_BASE_URL = `${config.api.baseUrl}/about`;

export interface AboutContentDTO {
    headerTitle: string;
    headerSubtitle?: string;
    heroImageUrl?: string;
    heroImageCaption?: string;
    rightHeading?: string;
    rightParagraph1?: string;
    rightParagraph2?: string;
    stat1Label?: string;
    stat1Value?: string;
    stat2Label?: string;
    stat2Value?: string;
    stat3Label?: string;
    stat3Value?: string;
    ctaText?: string;
    ctaLink?: string;
    timelineItems?: AboutTimelineItemDTO[];
}

export interface AboutTimelineItemDTO {
    id?: number;
    year: string;
    title: string;
    description: string;
    imageUrl?: string;
    order?: number;
}

const aboutService = {
    async getContent(): Promise<AboutContentDTO> {
        const res = await axios.get(API_BASE_URL);
        return res.data;
    },
    async upsertContent(data: AboutContentDTO): Promise<AboutContentDTO> {
        const res = await axios.put(API_BASE_URL, data);
        return res.data;
    },
    async getTimeline(): Promise<AboutTimelineItemDTO[]> {
        const res = await axios.get(`${API_BASE_URL}/timeline`);
        return res.data;
    },
    async addTimelineItem(item: AboutTimelineItemDTO): Promise<AboutTimelineItemDTO> {
        const res = await axios.post(`${API_BASE_URL}/timeline`, item);
        return res.data;
    },
    async updateTimelineItem(id: number, item: AboutTimelineItemDTO): Promise<AboutTimelineItemDTO> {
        const res = await axios.put(`${API_BASE_URL}/timeline/${id}`, item);
        return res.data;
    },
    async deleteTimelineItem(id: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/timeline/${id}`);
    },
};

export default aboutService;

