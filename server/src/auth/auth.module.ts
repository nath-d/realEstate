import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { EmailService } from './email.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { MarketingController } from './marketing.controller';
import { PdfService } from '../services/pdf.service';
import { MarketingService } from '../services/marketing.service';
import { PDFManagementService } from '../services/pdf-management.service';

@Module({
    imports: [
        PrismaModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key',
            signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [AuthController, MarketingController],
    providers: [AuthService, JwtStrategy, GoogleStrategy, EmailService, PdfService, MarketingService, PDFManagementService],
    exports: [AuthService, JwtModule, EmailService],
})
export class AuthModule { } 