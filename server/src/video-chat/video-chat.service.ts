import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateVideoChatData {
    name: string;
    email: string;
    phone: string;
    preferredDate: Date;
    preferredTime: string;
    message?: string;
    preferredContact: string;
    platform: string;
    propertyId?: number;
    propertyTitle?: string;
}

export interface UpdateVideoChatData {
    status?: string;
}

@Injectable()
export class VideoChatService {
    constructor(private prisma: PrismaService) { }

    async createVideoChat(data: CreateVideoChatData) {
        return this.prisma.videoChat.create({
            data,
        });
    }

    async getAllVideoChats() {
        return this.prisma.videoChat.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async getVideoChatById(id: number) {
        return this.prisma.videoChat.findUnique({
            where: { id },
        });
    }

    async updateVideoChat(id: number, data: UpdateVideoChatData) {
        return this.prisma.videoChat.update({
            where: { id },
            data,
        });
    }

    async deleteVideoChat(id: number) {
        return this.prisma.videoChat.delete({
            where: { id },
        });
    }

    async getVideoChatStats() {
        const total = await this.prisma.videoChat.count();
        const pendingCount = await this.prisma.videoChat.count({
            where: { status: 'pending' },
        });
        const confirmedCount = await this.prisma.videoChat.count({
            where: { status: 'confirmed' },
        });
        const completedCount = await this.prisma.videoChat.count({
            where: { status: 'completed' },
        });

        return {
            total,
            pending: pendingCount,
            confirmed: confirmedCount,
            completed: completedCount,
        };
    }
}

