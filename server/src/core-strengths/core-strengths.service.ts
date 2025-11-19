import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoreStrengthsService {
    constructor(private prisma: PrismaService) { }

    list() {
        return this.prisma.coreStrength.findMany();
    }

    create(data: any) {
        return this.prisma.coreStrength.create({ data });
    }

    update(id: number, data: any) {
        return this.prisma.coreStrength.update({ where: { id }, data });
    }

    remove(id: number) {
        return this.prisma.coreStrength.delete({ where: { id } });
    }
}


