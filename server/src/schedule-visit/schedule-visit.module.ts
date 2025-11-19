import { Module } from '@nestjs/common';
import { ScheduleVisitController } from './schedule-visit.controller';
import { ScheduleVisitService } from './schedule-visit.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ScheduleVisitController],
    providers: [ScheduleVisitService],
    exports: [ScheduleVisitService],
})
export class ScheduleVisitModule { } 