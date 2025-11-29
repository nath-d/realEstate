import axios from 'axios';
import config from '../../config.js';

const API = `${config.api.baseUrl}/contact-info`;

const contactInfoService = {
    getContactInfo: async () => {
        try {
            const response = await axios.get(API);
            return response.data;
        } catch (error) {
            console.error('Error fetching contact info:', error);
            // Return default values if API fails
            return {
                phoneNumbers: ["+91 9748853901", "+91 7449664398"],
                emails: ["mgconstructions1995@gmail.com"],
                officeAddress: "285, Gopal Misra Road, Behala",
                officeCity: "Kolkata",
                officeState: "West Bengal",
                officeZipCode: "700034",
                businessHours: [
                    "Mon - Thu: 9:30 am – 8:30 pm",
                    "Fri - Sun: Open 24 hours"
                ],
                locationCity: "Kolkata",
                locationAddress: "285, Gopal Misra Road, Behala",
                locationState: "Kolkata 700034",
                locationPhone: "+91 9748853901",
                locationEmail: "mgconstructions1995@gmail.com",
                locationImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                latitude: 22.4707,
                longitude: 88.3103,
                facebookUrl: "#",
                twitterUrl: "#",
                instagramUrl: "#",
                linkedinUrl: "#",
                whatsappUrl: "#",
                heroTitle: "Contact Us",
                heroSubtitle: "Get in touch with our team of real estate experts",
                heroBackgroundUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            };
        }
    }
};

export default contactInfoService;
