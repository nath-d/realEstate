import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AboutService {
    constructor(private prisma: PrismaService) { }

    async getContent() {
        const existing = await this.prisma.aboutContent.findFirst({
            include: {
                timelineItems: { orderBy: { order: 'asc' } },
            },
        });
        return existing ?? {
            headerTitle: 'Our Story',
            headerSubtitle: 'A journey of excellence, innovation, and unwavering commitment',
            heroImageUrl: null,
            heroImageCaption: null,
            rightHeading: 'Building Dreams, Creating Communities',
            rightParagraph1:
                'Founded in 2010, our journey began with a simple yet powerful vision: to transform the way people find, buy, and sell properties in India.',
            rightParagraph2:
                'We believe that every person deserves a place they can call home. Our mission is to make this dream accessible to everyone through innovative technology, transparent processes, and exceptional service.',
            stat1Label: 'Years of Excellence',
            stat1Value: '13+',
            stat2Label: 'Happy Customers',
            stat2Value: '50K+',
            stat3Label: 'Cities Covered',
            stat3Value: '100+',
            ctaText: 'Learn More About Us',
            ctaLink: '/about',
            timelineItems: [],
        };
    }

    async upsertContent(data: any) {
        const existing = await this.prisma.aboutContent.findFirst();
        if (existing) {
            return this.prisma.aboutContent.update({
                where: { id: existing.id },
                data: {
                    headerTitle: data.headerTitle,
                    headerSubtitle: data.headerSubtitle,
                    heroImageUrl: data.heroImageUrl,
                    heroImageCaption: data.heroImageCaption,
                    rightHeading: data.rightHeading,
                    rightParagraph1: data.rightParagraph1,
                    rightParagraph2: data.rightParagraph2,
                    stat1Label: data.stat1Label,
                    stat1Value: data.stat1Value,
                    stat2Label: data.stat2Label,
                    stat2Value: data.stat2Value,
                    stat3Label: data.stat3Label,
                    stat3Value: data.stat3Value,
                    ctaText: data.ctaText,
                    ctaLink: data.ctaLink,
                },
                include: { timelineItems: { orderBy: { order: 'asc' } } },
            });
        }
        return this.prisma.aboutContent.create({
            data: {
                headerTitle: data.headerTitle,
                headerSubtitle: data.headerSubtitle,
                heroImageUrl: data.heroImageUrl,
                heroImageCaption: data.heroImageCaption,
                rightHeading: data.rightHeading,
                rightParagraph1: data.rightParagraph1,
                rightParagraph2: data.rightParagraph2,
                stat1Label: data.stat1Label,
                stat1Value: data.stat1Value,
                stat2Label: data.stat2Label,
                stat2Value: data.stat2Value,
                stat3Label: data.stat3Label,
                stat3Value: data.stat3Value,
                ctaText: data.ctaText,
                ctaLink: data.ctaLink,
            },
            include: { timelineItems: { orderBy: { order: 'asc' } } },
        });
    }

    async getTimeline() {
        const about = await this.prisma.aboutContent.findFirst();
        if (!about) return [];
        return this.prisma.aboutTimelineItem.findMany({
            where: { aboutContentId: about.id },
            orderBy: { order: 'asc' },
        });
    }

    async addTimelineItem(item: any) {
        const about = await this.prisma.aboutContent.findFirst();
        const aboutId = about
            ? about.id
            : (await this.prisma.aboutContent.create({ data: { headerTitle: 'Our Story' } })).id;
        const maxOrder = await this.prisma.aboutTimelineItem.aggregate({
            where: { aboutContentId: aboutId },
            _max: { order: true },
        });
        const nextOrder = (maxOrder._max.order ?? 0) + 1;
        return this.prisma.aboutTimelineItem.create({
            data: {
                year: item.year,
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
                order: item.order ?? nextOrder,
                aboutContentId: aboutId,
            },
        });
    }

    async updateTimelineItem(id: number, item: any) {
        return this.prisma.aboutTimelineItem.update({
            where: { id },
            data: {
                year: item.year,
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
                order: item.order,
            },
        });
    }

    async deleteTimelineItem(id: number) {
        return this.prisma.aboutTimelineItem.delete({ where: { id } });
    }
}

