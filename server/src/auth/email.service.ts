import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.LOOPS_API_KEY || 'your-loops-api-key';
    }

    private async sendLoopsEmail(endpoint: string, data: any): Promise<void> {
        const response = await fetch(`https://app.loops.so/api/v1/${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Loops API error: ${response.status} - ${errorText}`);
        }
    }

    async sendVerificationEmail(email: string, token: string): Promise<void> {
        try {
            const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;

            await this.sendLoopsEmail('events/send', {
                eventName: 'email-verification',
                email,
                data: {
                    verificationUrl,
                    platformName: 'Real Estate Platform',
                    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
                }
            });

            this.logger.log(`Verification email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send verification email to ${email}:`, error);
            // Don't throw error to avoid breaking the signup flow
        }
    }

    async sendPasswordResetEmail(email: string, token: string): Promise<void> {
        try {
            const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;

            await this.sendLoopsEmail('events/send', {
                eventName: 'password-reset',
                email,
                data: {
                    resetUrl,
                    platformName: 'Real Estate Platform',
                    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
                }
            });

            this.logger.log(`Password reset email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send password reset email to ${email}:`, error);
            // Don't throw error to avoid breaking the password reset flow
        }
    }

    // New method for marketing emails
    async sendMarketingEmail(email: string, subject: string, content: string, templateData?: any): Promise<void> {
        try {
            await this.sendLoopsEmail('events/send', {
                eventName: 'marketing-email',
                email,
                data: {
                    subject,
                    content,
                    ...templateData,
                    platformName: 'Real Estate Platform'
                }
            });

            this.logger.log(`Marketing email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send marketing email to ${email}:`, error);
        }
    }

    // New method for property alerts
    async sendPropertyAlert(email: string, properties: any[]): Promise<void> {
        try {
            await this.sendLoopsEmail('events/send', {
                eventName: 'property-alert',
                email,
                data: {
                    properties,
                    propertyCount: properties.length,
                    platformName: 'Real Estate Platform',
                    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
                }
            });

            this.logger.log(`Property alert sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send property alert to ${email}:`, error);
        }
    }

    // Method to add user to newsletter
    async subscribeToNewsletter(email: string, firstName?: string, lastName?: string): Promise<void> {
        try {
            await this.sendLoopsEmail('contacts/create', {
                email,
                firstName,
                lastName,
                subscribed: true,
                userProperties: {
                    source: 'real-estate-platform',
                    signupDate: new Date().toISOString()
                }
            });

            this.logger.log(`User ${email} subscribed to newsletter successfully`);
        } catch (error) {
            this.logger.error(`Failed to subscribe ${email} to newsletter:`, error);
        }
    }

    // Method to send welcome email to new subscribers
    async sendWelcomeEmail(email: string, firstName?: string): Promise<void> {
        try {
            await this.sendLoopsEmail('events/send', {
                eventName: 'welcome-email',
                email,
                data: {
                    firstName: firstName || 'there',
                    platformName: 'Real Estate Platform',
                    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
                }
            });

            this.logger.log(`Welcome email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send welcome email to ${email}:`, error);
        }
    }

    // Method to send newsletter to all subscribers
    async sendNewsletterToAll(subject: string, content: string): Promise<void> {
        try {
            await this.sendLoopsEmail('events/send', {
                eventName: 'newsletter',
                data: {
                    subject,
                    content,
                    platformName: 'Real Estate Platform'
                }
            });

            this.logger.log(`Newsletter sent to all subscribers successfully`);
        } catch (error) {
            this.logger.error(`Failed to send newsletter to all subscribers:`, error);
        }
    }
} 