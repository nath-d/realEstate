import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('marketing')
export class MarketingController {
    constructor(private readonly emailService: EmailService) { }

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
            // Add user to newsletter
            await this.emailService.subscribeToNewsletter(body.email, body.firstName, body.lastName);

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
} 