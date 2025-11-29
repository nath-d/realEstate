import axios from 'axios';
import config from '../../config';

const API_BASE_URL = `${config.api.baseUrl}/contact-info`;

export interface ContactInfoDTO {
    id?: number;
    phoneNumbers?: string[];
    emails?: string[];
    officeAddress?: string;
    officeCity?: string;
    officeState?: string;
    officeZipCode?: string;
    businessHours?: string[];
    locationCity?: string;
    locationAddress?: string;
    locationState?: string;
    locationPhone?: string;
    locationEmail?: string;
    locationImage?: string;
    latitude?: number;
    longitude?: number;
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    whatsappUrl?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroBackgroundUrl?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

const contactInfoService = {
    async getContactInfo(): Promise<ContactInfoDTO> {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching contact info:', error);
            throw error;
        }
    },

    async updateContactInfo(data: ContactInfoDTO): Promise<ContactInfoDTO> {
        try {
            const response = await axios.put(API_BASE_URL, data);
            return response.data;
        } catch (error) {
            console.error('Error updating contact info:', error);
            throw error;
        }
    },

    async createContactInfo(data: ContactInfoDTO): Promise<ContactInfoDTO> {
        try {
            const response = await axios.post(API_BASE_URL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating contact info:', error);
            throw error;
        }
    }
};
export default contactInfoService;
