import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateAchievementDto {
    title: string;
    description: string;
    icon: string;
    category: string;
    year: string;
    stats: string;
    order?: number;
    isActive?: boolean;
}

export interface UpdateAchievementDto extends Partial<CreateAchievementDto> { }

@Injectable()
export class AchievementService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<any[]> {
        return this.prisma.achievement.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
    }

    async findOne(id: number): Promise<any> {
        return this.prisma.achievement.findUnique({
            where: { id },
        });
    }

    async create(data: CreateAchievementDto): Promise<any> {
        return this.prisma.achievement.create({
            data,
        });
    }

    async update(id: number, data: UpdateAchievementDto): Promise<any> {
        return this.prisma.achievement.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.achievement.delete({
            where: { id },
        });
    }

    async reorder(ids: number[]): Promise<void> {
        const updates = ids.map((id, index) =>
            this.prisma.achievement.update({
                where: { id },
                data: { order: index },
            })
        );
        await this.prisma.$transaction(updates);
    }
}
