import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateContactInfoData {
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
}

export interface UpdateContactInfoData extends CreateContactInfoData {
    isActive?: boolean;
}

@Injectable()
export class ContactInfoService {
    constructor(private prisma: PrismaService) { }

    async getContactInfo() {
        // Get the active contact info (there should only be one active record)
        const contactInfo = await this.prisma.contactInfo.findFirst({
            where: { isActive: true },
            orderBy: { updatedAt: 'desc' }
        });

        if (!contactInfo) {
            // Return default values if no contact info exists
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

        return contactInfo;
    }

    async createContactInfo(data: CreateContactInfoData) {
        // Deactivate any existing contact info
        await this.prisma.contactInfo.updateMany({
            where: { isActive: true },
            data: { isActive: false }
        });

        // Create new contact info
        return this.prisma.contactInfo.create({
            data: {
                ...data,
                isActive: true
            }
        });
    }

    async updateContactInfo(data: UpdateContactInfoData) {
        // Find the active contact info
        const existingContactInfo = await this.prisma.contactInfo.findFirst({
            where: { isActive: true }
        });

        if (!existingContactInfo) {
            // If no active contact info exists, create one
            return this.createContactInfo(data);
        }

        // Update the existing contact info
        return this.prisma.contactInfo.update({
            where: { id: existingContactInfo.id },
            data
        });
    }

    async getAllContactInfoRecords() {
        return this.prisma.contactInfo.findMany({
            orderBy: { updatedAt: 'desc' }
        });
    }
}
