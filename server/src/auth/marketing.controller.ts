import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { EmailService } from './email.service';
import { MarketingService } from '../services/marketing.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('marketing')
export class MarketingController {
    constructor(
        private readonly emailService: EmailService,
        private readonly marketingService: MarketingService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('property-alert')
    async sendPropertyAlert(
        @Request() req,
        @Body() body: { properties: any[] }
    ) {
        try {
            const userEmail = req.user.email;
            await this.emailService.sendPropertyAlert(userEmail, body.properties);

            return {
                success: true,
                message: 'Property alert sent successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send property alert',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('newsletter')
    async sendNewsletter(
        @Request() req,
        @Body() body: { subject: string; content: string }
    ) {
        try {
            const userEmail = req.user.email;
            await this.emailService.sendMarketingEmail(
                userEmail,
                body.subject,
                body.content
            );

            return {
                success: true,
                message: 'Newsletter sent successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send newsletter',
                error: error.message,
            };
        }
    }

    @Post('subscribe')
    async subscribeToNewsletter(@Body() body: { email: string; firstName?: string; lastName?: string }) {
        try {
            // Send welcome email
            await this.emailService.sendWelcomeEmail(body.email, body.firstName);

            return {
                success: true,
                message: 'Successfully subscribed to newsletter',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to subscribe to newsletter',
                error: error.message,
            };
        }
    }

    // New endpoints for PDF marketing emails

    @UseGuards(JwtAuthGuard)
    @Post('send-property-guide')
    async sendPropertyGuide(@Request() req) {
        try {
            const userEmail = req.user.email;
            const firstName = req.user.firstName || 'there';

            await this.marketingService.sendPropertyGuideEmail(userEmail, firstName);

            return {
                success: true,
                message: 'Property guide sent successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send property guide',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('send-investment-tips')
    async sendInvestmentTips(@Request() req) {
        try {
            const userEmail = req.user.email;
            const firstName = req.user.firstName || 'there';

            await this.marketingService.sendInvestmentTipsEmail(userEmail, firstName);

            return {
                success: true,
                message: 'Investment tips sent successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send investment tips',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('send-welcome-pdf')
    async sendWelcomePdf(@Request() req) {
        try {
            const userEmail = req.user.email;
            const firstName = req.user.firstName || 'there';

            await this.marketingService.sendWelcomeEmailWithPdf(userEmail, firstName);

            return {
                success: true,
                message: 'Welcome PDF sent successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send welcome PDF',
                error: error.message,
            };
        }
    }

    // Admin endpoint for bulk marketing (you might want to add admin guard)
    @UseGuards(JwtAuthGuard)
    @Post('bulk-send')
    async sendBulkMarketing(
        @Body() body: {
            emails: string[];
            type: 'property-guide' | 'investment-tips'
        }
    ) {
        try {
            await this.marketingService.sendBulkMarketingEmail(body.emails, body.type);

            return {
                success: true,
                message: `Bulk marketing email (${body.type}) sent to ${body.emails.length} recipients`,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send bulk marketing email',
                error: error.message,
            };
        }
    }
} 