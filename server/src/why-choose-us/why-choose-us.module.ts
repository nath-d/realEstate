import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WhyChooseUsService } from './why-choose-us.service';
import { WhyChooseUsController } from './why-choose-us.controller';

@Module({
    imports: [PrismaModule],
    controllers: [WhyChooseUsController],
    providers: [WhyChooseUsService],
})
export class WhyChooseUsModule { }


