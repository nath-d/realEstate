import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FutureVisionService } from './future-vision.service';
import { FutureVisionController } from './future-vision.controller';

@Module({
    imports: [PrismaModule],
    controllers: [FutureVisionController],
    providers: [FutureVisionService],
})
export class FutureVisionModule { }


