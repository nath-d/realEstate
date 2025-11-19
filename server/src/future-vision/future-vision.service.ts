import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FutureVisionService {
    constructor(private prisma: PrismaService) { }

    async getContent() {
        const content = await this.prisma.futureVisionContent.findFirst();
        return content ?? { visionText: null };
    }

    upsertContent(data: any) {
        return this.prisma.futureVisionContent.upsert({
            where: { id: 1 },
            update: { visionText: data.visionText ?? null },
            create: { id: 1, visionText: data.visionText ?? null },
        });
    }

    listGoals() { return this.prisma.futureVisionGoal.findMany(); }
    createGoal(data: any) { return this.prisma.futureVisionGoal.create({ data }); }
    updateGoal(id: number, data: any) { return this.prisma.futureVisionGoal.update({ where: { id }, data }); }
    removeGoal(id: number) { return this.prisma.futureVisionGoal.delete({ where: { id } }); }

    listTimeline() { return this.prisma.futureVisionTimelineItem.findMany(); }
    createTimelineItem(data: any) { return this.prisma.futureVisionTimelineItem.create({ data }); }
    updateTimelineItem(id: number, data: any) { return this.prisma.futureVisionTimelineItem.update({ where: { id }, data }); }
    removeTimelineItem(id: number) { return this.prisma.futureVisionTimelineItem.delete({ where: { id } }); }
}


