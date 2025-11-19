import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhyChooseUsService {
    constructor(private prisma: PrismaService) { }

    getAllActive() {
        // Now simply return all rows as there is no active/order fields
        return this.prisma.whyChooseUsReason.findMany();
    }

    getAll() {
        return this.prisma.whyChooseUsReason.findMany();
    }

    create(data: any) {
        return this.prisma.whyChooseUsReason.create({ data });
    }

    update(id: number, data: any) {
        return this.prisma.whyChooseUsReason.update({ where: { id }, data });
    }

    delete(id: number) {
        return this.prisma.whyChooseUsReason.delete({ where: { id } });
    }
}


