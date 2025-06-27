import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PropertyModule } from './property/property.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UploadModule } from './upload/upload.module';
import { BlogModule } from './blog/blog.module';

@Module({
    imports: [PrismaModule, PropertyModule, CloudinaryModule, UploadModule, BlogModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
