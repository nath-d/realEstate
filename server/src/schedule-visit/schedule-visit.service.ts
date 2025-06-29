import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateScheduleVisitData {
    name: string;
    email: string;
    phone: string;
    preferredDate: Date;
    preferredTime: string;
    message?: string;
    preferredContact: string;
    propertyId?: number;
    propertyTitle?: string;
}

export interface UpdateScheduleVisitData {
    status?: string;
}

@Injectable()
export class ScheduleVisitService {
    constructor(private prisma: PrismaService) { }

    async createScheduleVisit(data: CreateScheduleVisitData) {
        return this.prisma.scheduleVisit.create({
            data,
        });
    }

    async getAllScheduleVisits() {
        return this.prisma.scheduleVisit.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async getScheduleVisitById(id: number) {
        return this.prisma.scheduleVisit.findUnique({
            where: { id },
        });
    }

    async updateScheduleVisit(id: number, data: UpdateScheduleVisitData) {
        return this.prisma.scheduleVisit.update({
            where: { id },
            data,
        });
    }

    async deleteScheduleVisit(id: number) {
        return this.prisma.scheduleVisit.delete({
            where: { id },
        });
    }

    async getScheduleVisitStats() {
        const total = await this.prisma.scheduleVisit.count();
        const pendingCount = await this.prisma.scheduleVisit.count({
            where: { status: 'pending' },
        });
        const confirmedCount = await this.prisma.scheduleVisit.count({
            where: { status: 'confirmed' },
        });
        const completedCount = await this.prisma.scheduleVisit.count({
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