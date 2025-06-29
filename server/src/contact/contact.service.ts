import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface UpdateContactFormData {
    status?: string;
}

@Injectable()
export class ContactService {
    constructor(private prisma: PrismaService) { }

    async createContactForm(data: CreateContactFormData) {
        return this.prisma.contactForm.create({
            data,
        });
    }

    async getAllContactForms() {
        return this.prisma.contactForm.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async getContactFormById(id: number) {
        return this.prisma.contactForm.findUnique({
            where: { id },
        });
    }

    async updateContactForm(id: number, data: UpdateContactFormData) {
        return this.prisma.contactForm.update({
            where: { id },
            data,
        });
    }

    async deleteContactForm(id: number) {
        return this.prisma.contactForm.delete({
            where: { id },
        });
    }

    async getContactFormStats() {
        const total = await this.prisma.contactForm.count();
        const newCount = await this.prisma.contactForm.count({
            where: { status: 'new' },
        });
        const readCount = await this.prisma.contactForm.count({
            where: { status: 'read' },
        });
        const respondedCount = await this.prisma.contactForm.count({
            where: { status: 'responded' },
        });

        return {
            total,
            new: newCount,
            read: readCount,
            responded: respondedCount,
        };
    }
} 