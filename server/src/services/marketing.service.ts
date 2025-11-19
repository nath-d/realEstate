import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../auth/email.service';
import { PDFManagementService } from './pdf-management.service';

@Injectable()
export class MarketingService {
    private readonly logger = new Logger(MarketingService.name);

    constructor(
        private readonly emailService: EmailService,
        private readonly pdfManagementService: PDFManagementService,
    ) { }

    // Send welcome email with PDF to new users
    async sendWelcomeEmailWithPdf(email: string, firstName: string): Promise<void> {
        try {
            this.logger.log(`Sending welcome email with PDF to ${email}`);

            // Get welcome guide PDFs from database
            const welcomePdfs = await this.pdfManagementService.getPDFsForEmail(['welcome-guide']);

            if (welcomePdfs.length === 0) {
                this.logger.warn('No welcome guide PDFs found in database, sending email without attachment');
                await this.emailService.sendWelcomeEmail(email, firstName);
                return;
            }

            // Send email with PDF attachments
            await this.emailService.sendWelcomeEmailWithPdfs(email, firstName, welcomePdfs);

            this.logger.log(`Welcome email with PDF sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send welcome email with PDF to ${email}:`, error);
            throw error;
        }
    }

    // Send property guide email
    async sendPropertyGuideEmail(email: string, firstName: string): Promise<void> {
        try {
            this.logger.log(`Sending property guide email to ${email}`);

            // Get property guide PDFs from database
            const propertyPdfs = await this.pdfManagementService.getPDFsForEmail(['property-guide']);

            if (propertyPdfs.length === 0) {
                this.logger.warn('No property guide PDFs found in database, sending email without attachment');
                await this.emailService.sendPropertyGuideEmail(email, firstName, '');
                return;
            }

            // Send email with PDF attachments
            await this.emailService.sendPropertyGuideEmailWithPdfs(email, firstName, propertyPdfs);

            this.logger.log(`Property guide email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send property guide email to ${email}:`, error);
            throw error;
        }
    }

    // Send investment tips email
    async sendInvestmentTipsEmail(email: string, firstName: string): Promise<void> {
        try {
            this.logger.log(`Sending investment tips email to ${email}`);

            // Get investment tips PDFs from database
            const investmentPdfs = await this.pdfManagementService.getPDFsForEmail(['investment-tips']);

            if (investmentPdfs.length === 0) {
                this.logger.warn('No investment tips PDFs found in database, sending email without attachment');
                await this.emailService.sendInvestmentTipsEmail(email, firstName, '');
                return;
            }

            // Send email with PDF attachments
            await this.emailService.sendInvestmentTipsEmailWithPdfs(email, firstName, investmentPdfs);

            this.logger.log(`Investment tips email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send investment tips email to ${email}:`, error);
            throw error;
        }
    }

    // Send onboarding sequence to new users
    async sendOnboardingSequence(email: string, firstName: string): Promise<void> {
        try {
            this.logger.log(`Starting onboarding sequence for ${email}`);

            // Day 1: Welcome email with PDF
            await this.sendWelcomeEmailWithPdf(email, firstName);

            // Schedule follow-up emails (you can implement a job queue here)
            this.logger.log(`Onboarding sequence initiated for ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send onboarding sequence to ${email}:`, error);
            throw error;
        }
    }

    // Send targeted marketing email based on user behavior
    async sendTargetedMarketingEmail(email: string, firstName: string, type: 'property-guide' | 'investment-tips'): Promise<void> {
        try {
            this.logger.log(`Sending targeted marketing email (${type}) to ${email}`);

            switch (type) {
                case 'property-guide':
                    await this.sendPropertyGuideEmail(email, firstName);
                    break;
                case 'investment-tips':
                    await this.sendInvestmentTipsEmail(email, firstName);
                    break;
                default:
                    throw new Error(`Unknown marketing email type: ${type}`);
            }

            this.logger.log(`Targeted marketing email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send targeted marketing email to ${email}:`, error);
            throw error;
        }
    }

    // Send bulk marketing emails (for future use)
    async sendBulkMarketingEmail(emails: string[], type: 'property-guide' | 'investment-tips'): Promise<void> {
        try {
            this.logger.log(`Sending bulk marketing email (${type}) to ${emails.length} recipients`);

            const promises = emails.map(async (email) => {
                try {
                    // Extract first name from email (you might want to get this from database)
                    const firstName = email.split('@')[0];
                    await this.sendTargetedMarketingEmail(email, firstName, type);
                } catch (error) {
                    this.logger.error(`Failed to send bulk email to ${email}:`, error);
                }
            });

            await Promise.all(promises);

            this.logger.log(`Bulk marketing email completed for ${emails.length} recipients`);
        } catch (error) {
            this.logger.error(`Failed to send bulk marketing email:`, error);
            throw error;
        }
    }
} 