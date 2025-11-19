import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CoreStrengthsService } from './core-strengths.service';
import { CoreStrengthsController } from './core-strengths.controller';

@Module({
    imports: [PrismaModule],
    controllers: [CoreStrengthsController],
    providers: [CoreStrengthsService],
})
export class CoreStrengthsModule { }


