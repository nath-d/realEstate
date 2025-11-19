import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
const config = require('../../config');

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private transporter: nodemailer.Transporter;

    constructor() {
        // Create transporter using Gmail SMTP
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.user,
                pass: config.email.password,
            },
        });
    }

    // Generate a 6-digit OTP
    private generateOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendVerificationEmail(email: string, otp: string): Promise<void> {
        try {
            const mailOptions = {
                from: config.email.user,
                to: email,
                subject: 'Verify your email address - Real Estate Platform',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Your trusted partner in real estate</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Email Verification</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                Thank you for signing up! To complete your registration, please use the verification code below:
                            </p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px;">
                                    ${otp}
                                </div>
                            </div>
                            
                            <p style="color: #7f8c8d; font-size: 14px; text-align: center; margin: 20px 0;">
                                Enter this code on the verification page to complete your registration.
                            </p>
                            
                            <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <p style="color: #7f8c8d; font-size: 14px; margin: 0; text-align: center;">
                                    ⏰ This code will expire in 10 minutes for your security.
                                </p>
                            </div>
                            
                            <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
                            
                            <p style="color: #7f8c8d; font-size: 12px; text-align: center; margin: 0;">
                                If you didn't create an account with Real Estate Platform, please ignore this email.
                            </p>
                        </div>
                    </div>
                `,
            };

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Verification email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send verification email to ${email}:`, error);
            // Don't throw error to avoid breaking the signup flow
        }
    }

    async sendPasswordResetEmail(email: string, otp: string): Promise<void> {
        try {
            const mailOptions = {
                from: config.email.user,
                to: email,
                subject: 'Reset your password - Real Estate Platform',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Your trusted partner in real estate</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Password Reset</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                We received a request to reset your password. Use the verification code below to create a new password:
                            </p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 20px; border-radius: 10px; display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px;">
                                    ${otp}
                                </div>
                            </div>
                            
                            <p style="color: #7f8c8d; font-size: 14px; text-align: center; margin: 20px 0;">
                                Enter this code on the password reset page to create a new password.
                            </p>
                            
                            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <p style="color: #856404; font-size: 14px; margin: 0; text-align: center;">
                                    ⚠️ This code will expire in 10 minutes for your security.
                                </p>
                            </div>
                            
                            <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
                            
                            <p style="color: #7f8c8d; font-size: 12px; text-align: center; margin: 0;">
                                If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
                            </p>
                        </div>
                    </div>
                `,
            };

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Password reset email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send password reset email to ${email}:`, error);
            // Don't throw error to avoid breaking the password reset flow
        }
    }

    // Generate and send verification OTP
    async sendVerificationOTP(email: string): Promise<string> {
        const otp = this.generateOTP();
        await this.sendVerificationEmail(email, otp);
        return otp;
    }

    // Generate and send password reset OTP
    async sendPasswordResetOTP(email: string): Promise<string> {
        const otp = this.generateOTP();
        await this.sendPasswordResetEmail(email, otp);
        return otp;
    }

    // Method to send welcome email to new subscribers
    async sendWelcomeEmail(email: string, firstName?: string): Promise<void> {
        try {
            const mailOptions = {
                from: config.email.user,
                to: email,
                subject: 'Welcome to Real Estate Platform!',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Your trusted partner in real estate</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Welcome ${firstName || 'there'}!</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                Thank you for subscribing to our newsletter! You'll now receive:
                            </p>
                            
                            <ul style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                <li>📈 Latest real estate market trends</li>
                                <li>🏠 New property listings in your area</li>
                                <li>💰 Investment opportunities and tips</li>
                                <li>🎯 Exclusive offers and promotions</li>
                            </ul>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${config.urls.frontend}/properties" 
                                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                                    Browse Properties
                                </a>
                            </div>
                        </div>
                    </div>
                `,
            };

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Welcome email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send welcome email to ${email}:`, error);
        }
    }

    // New method for marketing emails
    async sendMarketingEmail(email: string, subject: string, content: string, templateData?: any): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: config.email.user,
                to: email,
                subject: subject,
                html: content,
            });

            this.logger.log(`Marketing email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send marketing email to ${email}:`, error);
        }
    }

    // New method for property alerts
    async sendPropertyAlert(email: string, properties: any[]): Promise<void> {
        try {
            const propertiesHtml = properties.map(property => `
                <div style="border: 1px solid #ecf0f1; border-radius: 8px; padding: 15px; margin: 10px 0; background-color: white;">
                    <h3 style="color: #2c3e50; margin: 0 0 10px 0;">${property.title}</h3>
                    <p style="color: #7f8c8d; margin: 5px 0;">📍 ${property.location}</p>
                    <p style="color: #27ae60; font-weight: bold; margin: 5px 0;">💰 $${property.price?.toLocaleString()}</p>
                    <a href="${config.urls.frontend}/property/${property.id}" 
                       style="color: #3498db; text-decoration: none;">View Property →</a>
                </div>
            `).join('');

            await this.transporter.sendMail({
                from: config.email.user,
                to: email,
                subject: `New Properties Matching Your Criteria - Real Estate Platform`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Property Alerts</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">New Properties Found!</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                We found ${properties.length} new properties that match your search criteria. 
                                Check them out before they're gone!
                            </p>
                            
                            ${propertiesHtml}
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${config.urls.frontend}/properties" 
                                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                                    View All Properties
                                </a>
                            </div>
                        </div>
                    </div>
                `,
            });

            this.logger.log(`Property alert sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send property alert to ${email}:`, error);
        }
    }

    // Method to send newsletter to all subscribers
    async sendNewsletterToAll(subject: string, content: string): Promise<void> {
        try {
            // Note: For bulk newsletters, you'd typically use a different approach
            // This is a simplified version - in production you'd implement bulk sending
            this.logger.log(`Newsletter content prepared: ${subject}`);
            this.logger.log(`To send to all subscribers, implement bulk sending functionality`);
        } catch (error) {
            this.logger.error(`Failed to prepare newsletter:`, error);
        }
    }

    // Send confirmation email for newsletter subscription
    async sendConfirmSubscription(email: string, confirmUrl: string): Promise<void> {
        try {
            const mailOptions = {
                from: config.email.user,
                to: email,
                subject: 'Confirm your subscription - Real Estate Platform',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Please confirm your subscription</p>
                            </div>
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                Thanks for subscribing to our newsletter. Please confirm your email to start receiving updates.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${confirmUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">Confirm Subscription</a>
                            </div>
                        </div>
                    </div>
                `,
            };

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Confirmation email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to ${email}:`, error);
        }
    }

    // Send newsletter email with unsubscribe footer
    async sendNewsletterEmail(email: string, subject: string, htmlContent: string, unsubscribeUrl: string, attachments?: { filename: string; content: Buffer; contentType?: string }[]): Promise<void> {
        try {
            const wrappedHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.06);">
                        ${htmlContent}
                        <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
                        <p style="color: #95a5a6; font-size: 12px; text-align: center;">
                            You are receiving this because you subscribed to Real Estate Platform updates.
                            If you no longer wish to receive these emails, <a href="${unsubscribeUrl}">unsubscribe here</a>.
                        </p>
                    </div>
                </div>`;

            await this.transporter.sendMail({
                from: config.email.user,
                to: email,
                subject,
                html: wrappedHtml,
                attachments: attachments && attachments.length > 0
                    ? attachments.map(a => ({ filename: a.filename, content: a.content, contentType: a.contentType }))
                    : undefined,
            });
            this.logger.log(`Newsletter email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send newsletter email to ${email}:`, error);
        }
    }

    // Send welcome email with PDF attachment
    async sendWelcomeEmailWithPdf(email: string, firstName: string, pdfPath: string): Promise<void> {
        try {
            const mailOptions = {
                from: config.email.user,
                to: email,
                subject: 'Welcome to Real Estate Platform - Your Free Guide Inside!',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Welcome to your real estate journey!</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Welcome ${firstName}!</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                Thank you for joining our exclusive real estate platform! We're excited to help you find your perfect property and make informed investment decisions.
                            </p>
                            
                            <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h3 style="color: #2c3e50; margin: 0 0 15px 0;">📎 Your Free Welcome Guide</h3>
                                <p style="color: #34495e; margin: 0 0 15px 0;">
                                    We've attached a comprehensive welcome guide to help you get started. This PDF includes:
                                </p>
                                <ul style="color: #34495e; margin: 0; padding-left: 20px;">
                                    <li>Platform features and how to use them</li>
                                    <li>Getting started checklist</li>
                                    <li>Tips for finding your perfect property</li>
                                    <li>Contact information for support</li>
                                </ul>
                            </div>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${config.urls.frontend}/properties" 
                                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                                    Start Browsing Properties
                                </a>
                            </div>
                            
                            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <p style="color: #856404; font-size: 14px; margin: 0; text-align: center;">
                                    💡 <strong>Pro Tip:</strong> Complete your profile to get personalized property recommendations!
                                </p>
                            </div>
                        </div>
                    </div>
                `,
                attachments: [
                    {
                        filename: 'Welcome-Guide.pdf',
                        path: pdfPath,
                        contentType: 'application/pdf'
                    }
                ]
            };

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Welcome email with PDF sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send welcome email with PDF to ${email}:`, error);
        }
    }

    // Send marketing email with property guide
    async sendPropertyGuideEmail(email: string, firstName: string, pdfPath: string): Promise<void> {
        try {
            const mailOptions = {
                from: config.email.user,
                to: email,
                subject: 'Your Free Property Investment Guide - Real Estate Platform',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Your investment guide is here!</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Hi ${firstName}!</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                We've prepared a comprehensive property investment guide just for you. This valuable resource will help you make informed decisions in the real estate market.
                            </p>
                            
                            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h3 style="color: #2c3e50; margin: 0 0 15px 0;">📊 What's Inside Your Guide:</h3>
                                <ul style="color: #34495e; margin: 0; padding-left: 20px;">
                                    <li>Market analysis and trends</li>
                                    <li>Investment strategies explained</li>
                                    <li>Risk assessment guidelines</li>
                                    <li>Property evaluation checklist</li>
                                    <li>Expert tips and advice</li>
                                </ul>
                            </div>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${config.urls.frontend}/properties" 
                                   style="background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                                    Explore Investment Properties
                                </a>
                            </div>
                            
                            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <p style="color: #856404; font-size: 14px; margin: 0; text-align: center;">
                                    🎯 <strong>Ready to invest?</strong> Our team is here to help you find the perfect investment property!
                                </p>
                            </div>
                        </div>
                    </div>
                `,
                attachments: [
                    {
                        filename: 'Property-Investment-Guide.pdf',
                        path: pdfPath,
                        contentType: 'application/pdf'
                    }
                ]
            };

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Property guide email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send property guide email to ${email}:`, error);
        }
    }

    // Send investment tips email
    async sendInvestmentTipsEmail(email: string, firstName: string, pdfPath: string): Promise<void> {
        try {
            const mailOptions = {
                from: config.email.user,
                to: email,
                subject: 'Exclusive Investment Tips - Real Estate Platform',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">💰 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Expert investment tips for you!</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Hi ${firstName}!</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                We've compiled exclusive investment tips from our real estate experts. These insights will help you navigate the market and make smart investment decisions.
                            </p>
                            
                            <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h3 style="color: #2c3e50; margin: 0 0 15px 0;">💡 Expert Tips Include:</h3>
                                <ul style="color: #34495e; margin: 0; padding-left: 20px;">
                                    <li>Market research strategies</li>
                                    <li>Location analysis techniques</li>
                                    <li>Cost calculation methods</li>
                                    <li>Portfolio diversification advice</li>
                                    <li>Long-term planning insights</li>
                                </ul>
                            </div>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${config.urls.frontend}/properties" 
                                   style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                                    View Investment Properties
                                </a>
                            </div>
                            
                            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <p style="color: #856404; font-size: 14px; margin: 0; text-align: center;">
                                    📞 <strong>Need personalized advice?</strong> Schedule a consultation with our investment experts!
                                </p>
                            </div>
                        </div>
                    </div>
                `,
                attachments: [
                    {
                        filename: 'Investment-Tips.pdf',
                        path: pdfPath,
                        contentType: 'application/pdf'
                    }
                ]
            };

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Investment tips email sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send investment tips email to ${email}:`, error);
        }
    }

    // New method for sending welcome email with multiple PDFs from database
    async sendWelcomeEmailWithPdfs(email: string, firstName: string, pdfs: { name: string; buffer: Buffer }[]): Promise<void> {
        try {
            const mailOptions: any = {
                from: config.email.user,
                to: email,
                subject: 'Welcome to Real Estate Platform! 🏠',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Your trusted partner in real estate</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Welcome ${firstName || 'there'}!</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                Thank you for joining our platform! We've attached some helpful resources to get you started:
                            </p>
                            
                            <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h3 style="color: #2c3e50; margin-top: 0;">📎 Attached Resources:</h3>
                                <ul style="color: #34495e; line-height: 1.6; margin: 0;">
                                    ${pdfs.map(pdf => `<li>📄 ${pdf.name}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                You'll also receive:
                            </p>
                            
                            <ul style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                <li>📈 Latest real estate market trends</li>
                                <li>🏠 New property listings in your area</li>
                                <li>💰 Investment opportunities and tips</li>
                                <li>🎯 Exclusive offers and promotions</li>
                            </ul>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${config.urls.frontend}/properties" 
                                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                                    Browse Properties
                                </a>
                            </div>
                        </div>
                    </div>
                `,
            };

            // Add PDF attachments
            if (pdfs.length > 0) {
                mailOptions.attachments = pdfs.map(pdf => ({
                    filename: `${pdf.name}.pdf`,
                    content: pdf.buffer,
                    contentType: 'application/pdf'
                }));
            }

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Welcome email with ${pdfs.length} PDFs sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send welcome email with PDFs to ${email}:`, error);
            throw error;
        }
    }

    // New method for sending property guide email with multiple PDFs from database
    async sendPropertyGuideEmailWithPdfs(email: string, firstName: string, pdfs: { name: string; buffer: Buffer }[]): Promise<void> {
        try {
            const mailOptions: any = {
                from: config.email.user,
                to: email,
                subject: 'Your Property Guide - Real Estate Platform 🏠',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Your trusted partner in real estate</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Property Guide for ${firstName || 'you'}!</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                We've prepared comprehensive property guides to help you make informed decisions:
                            </p>
                            
                            <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h3 style="color: #2c3e50; margin-top: 0;">📎 Property Resources:</h3>
                                <ul style="color: #34495e; line-height: 1.6; margin: 0;">
                                    ${pdfs.map(pdf => `<li>📄 ${pdf.name}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                These guides include:
                            </p>
                            
                            <ul style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                <li>🏠 Property evaluation criteria</li>
                                <li>💰 Pricing strategies and negotiations</li>
                                <li>📋 Legal considerations and documentation</li>
                                <li>🔍 Inspection checklists and tips</li>
                            </ul>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${config.urls.frontend}/properties" 
                                   style="background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                                    View Properties
                                </a>
                            </div>
                        </div>
                    </div>
                `,
            };

            // Add PDF attachments
            if (pdfs.length > 0) {
                mailOptions.attachments = pdfs.map(pdf => ({
                    filename: `${pdf.name}.pdf`,
                    content: pdf.buffer,
                    contentType: 'application/pdf'
                }));
            }

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Property guide email with ${pdfs.length} PDFs sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send property guide email with PDFs to ${email}:`, error);
            throw error;
        }
    }

    // New method for sending investment tips email with multiple PDFs from database
    async sendInvestmentTipsEmailWithPdfs(email: string, firstName: string, pdfs: { name: string; buffer: Buffer }[]): Promise<void> {
        try {
            const mailOptions: any = {
                from: config.email.user,
                to: email,
                subject: 'Investment Tips & Strategies - Real Estate Platform 💰',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Your trusted partner in real estate</p>
                            </div>
                            
                            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Investment Insights for ${firstName || 'you'}!</h2>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                Discover proven investment strategies and market insights to maximize your returns:
                            </p>
                            
                            <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h3 style="color: #2c3e50; margin-top: 0;">📎 Investment Resources:</h3>
                                <ul style="color: #34495e; line-height: 1.6; margin: 0;">
                                    ${pdfs.map(pdf => `<li>📄 ${pdf.name}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                These resources cover:
                            </p>
                            
                            <ul style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                                <li>📊 Market analysis and trends</li>
                                <li>💰 ROI calculation methods</li>
                                <li>🏦 Financing options and strategies</li>
                                <li>📈 Portfolio diversification tips</li>
                            </ul>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${config.urls.frontend}/properties" 
                                   style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                                    Explore Investment Properties
                                </a>
                            </div>
                        </div>
                    </div>
                `,
            };

            // Add PDF attachments
            if (pdfs.length > 0) {
                mailOptions.attachments = pdfs.map(pdf => ({
                    filename: `${pdf.name}.pdf`,
                    content: pdf.buffer,
                    contentType: 'application/pdf'
                }));
            }

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Investment tips email with ${pdfs.length} PDFs sent successfully to ${email}`);
        } catch (error) {
            this.logger.error(`Failed to send investment tips email with PDFs to ${email}:`, error);
            throw error;
        }
    }
} 