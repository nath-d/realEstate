import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
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
            type: 'property-guide' | 'investment-tips' | 'other'
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

    // One-click send property guide to all users
    @UseGuards(JwtAuthGuard)
    @Post('send-property-guide-all')
    async sendPropertyGuideToAll() {
        try {
            await this.marketingService.sendBulkEmailToAllUsers('property-guide');

            return {
                success: true,
                message: 'Property guide sent to all users successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send property guide to all users',
                error: error.message,
            };
        }
    }

    // One-click send investment tips to all users
    @UseGuards(JwtAuthGuard)
    @Post('send-investment-tips-all')
    async sendInvestmentTipsToAll() {
        try {
            await this.marketingService.sendBulkEmailToAllUsers('investment-tips');

            return {
                success: true,
                message: 'Investment tips sent to all users successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send investment tips to all users',
                error: error.message,
            };
        }
    }

    // One-click send other category to all users
    @UseGuards(JwtAuthGuard)
    @Post('send-other-all')
    async sendOtherCategoryToAll() {
        try {
            await this.marketingService.sendBulkEmailToAllUsers('other');

            return {
                success: true,
                message: 'Other category emails sent to all users successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send other category emails to all users',
                error: error.message,
            };
        }
    }

    // Get user count for bulk operations
    @UseGuards(JwtAuthGuard)
    @Get('user-count')
    async getUserCount() {
        try {
            const users = await this.marketingService.getAllUsersForBulkEmail();

            return {
                success: true,
                count: users.length,
                message: `${users.length} users available for bulk email (includes unverified emails)`,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to get user count',
                error: error.message,
            };
        }
    }
} 