import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PropertyModule } from './property/property.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UploadModule } from './upload/upload.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { ScheduleVisitModule } from './schedule-visit/schedule-visit.module';

@Module({
    imports: [PrismaModule, PropertyModule, CloudinaryModule, UploadModule, BlogModule, ContactModule, ScheduleVisitModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
