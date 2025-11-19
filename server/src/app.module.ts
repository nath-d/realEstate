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
import { AuthModule } from './auth/auth.module';
import { PDFManagementService } from './services/pdf-management.service';
import { PDFManagementController } from './services/pdf-management.controller';
import { AboutModule } from './about/about.module';
import { AchievementModule } from './achievement/achievement.module';
import { WhyChooseUsModule } from './why-choose-us/why-choose-us.module';
import { CoreStrengthsModule } from './core-strengths/core-strengths.module';
import { FutureVisionModule } from './future-vision/future-vision.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
    imports: [PrismaModule, PropertyModule, CloudinaryModule, UploadModule, BlogModule, ContactModule, ScheduleVisitModule, AuthModule, AboutModule, AchievementModule, WhyChooseUsModule, CoreStrengthsModule, FutureVisionModule, NewsletterModule],
    controllers: [AppController, PDFManagementController],
    providers: [AppService, PDFManagementService],
})
export class AppModule { }
