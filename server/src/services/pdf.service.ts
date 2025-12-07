import { Injectable, Logger } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
    private readonly logger = new Logger(PdfService.name);

    async generateWelcomeGuide(userName: string): Promise<string> {
        const doc = new PDFDocument();
        const fileName = `welcome-guide-${Date.now()}.pdf`;
        const filePath = path.join(process.cwd(), 'temp', fileName);

        // Ensure temp directory exists
        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Add content to PDF
        this.addWelcomeContent(doc, userName);

        doc.end();

        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                this.logger.log(`Welcome guide PDF generated: ${fileName}`);
                resolve(filePath);
            });
            stream.on('error', reject);
        });
    }

    async generatePropertyGuide(): Promise<string> {
        const doc = new PDFDocument();
        const fileName = `property-guide-${Date.now()}.pdf`;
        const filePath = path.join(process.cwd(), 'temp', fileName);

        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        this.addPropertyGuideContent(doc);

        doc.end();

        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                this.logger.log(`Property guide PDF generated: ${fileName}`);
                resolve(filePath);
            });
            stream.on('error', reject);
        });
    }

    async generateInvestmentTips(): Promise<string> {
        const doc = new PDFDocument();
        const fileName = `investment-tips-${Date.now()}.pdf`;
        const filePath = path.join(process.cwd(), 'temp', fileName);

        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        this.addInvestmentTipsContent(doc);

        doc.end();

        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                this.logger.log(`Investment tips PDF generated: ${fileName}`);
                resolve(filePath);
            });
            stream.on('error', reject);
        });
    }

    private addWelcomeContent(doc: PDFKit.PDFDocument, userName: string) {
        // Header
        doc.fontSize(24)
            .fillColor('#2c3e50')
            .text('🏠 Welcome to MG Constructions & Pacific Realty!', { align: 'center' })
            .moveDown();

        doc.fontSize(16)
            .fillColor('#34495e')
            .text(`Dear ${userName},`, { align: 'left' })
            .moveDown();

        // Welcome message
        doc.fontSize(12)
            .text('Welcome to our exclusive MG Constructions & Pacific Realty! We\'re thrilled to have you join our community of property enthusiasts and investors.')
            .moveDown();

        doc.text('This guide will help you get started and make the most of our platform.')
            .moveDown(2);

        // Features section
        doc.fontSize(14)
            .fillColor('#2c3e50')
            .text('🚀 What You Can Do:', { underline: true })
            .moveDown();

        const features = [
            'Browse exclusive property listings',
            'Save your favorite properties',
            'Schedule property viewings',
            'Get market insights and trends',
            'Connect with real estate experts',
            'Access investment opportunities'
        ];

        features.forEach(feature => {
            doc.fontSize(11)
                .fillColor('#34495e')
                .text(`• ${feature}`)
                .moveDown(0.5);
        });

        doc.moveDown();

        // Getting started
        doc.fontSize(14)
            .fillColor('#2c3e50')
            .text('📋 Getting Started:', { underline: true })
            .moveDown();

        doc.fontSize(11)
            .fillColor('#34495e')
            .text('1. Complete your profile to get personalized recommendations')
            .text('2. Browse our latest property listings')
            .text('3. Save properties you\'re interested in')
            .text('4. Schedule viewings for properties you love')
            .text('5. Stay updated with market trends')
            .moveDown(2);

        // Contact info
        doc.fontSize(14)
            .fillColor('#2c3e50')
            .text('📞 Need Help?', { underline: true })
            .moveDown();

        doc.fontSize(11)
            .fillColor('#34495e')
            .text('Our team is here to help you find your perfect property.')
            .text('Email: support@realestateplatform.com')
            .text('Phone: +91 9748853901')
            .moveDown(2);

        // Footer
        doc.fontSize(10)
            .fillColor('#7f8c8d')
            .text('Thank you for choosing MG Constructions & Pacific Realty !', { align: 'center' })
            .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
    }

    private addPropertyGuideContent(doc: PDFKit.PDFDocument) {
        // Header
        doc.fontSize(24)
            .fillColor('#2c3e50')
            .text('🏠 Property Investment Guide', { align: 'center' })
            .moveDown();

        // Introduction
        doc.fontSize(12)
            .fillColor('#34495e')
            .text('This comprehensive guide will help you understand the real estate market and make informed investment decisions.')
            .moveDown(2);

        // Market Analysis
        doc.fontSize(16)
            .fillColor('#2c3e50')
            .text('📊 Market Analysis', { underline: true })
            .moveDown();

        doc.fontSize(11)
            .fillColor('#34495e')
            .text('Understanding market trends is crucial for successful real estate investment. Here are key factors to consider:')
            .moveDown();

        const marketFactors = [
            'Location and neighborhood development',
            'Property appreciation rates',
            'Rental market demand',
            'Infrastructure projects',
            'Economic indicators',
            'Interest rate trends'
        ];

        marketFactors.forEach(factor => {
            doc.text(`• ${factor}`)
                .moveDown(0.5);
        });

        doc.moveDown();

        // Investment Strategies
        doc.fontSize(16)
            .fillColor('#2c3e50')
            .text('💡 Investment Strategies', { underline: true })
            .moveDown();

        doc.fontSize(11)
            .fillColor('#34495e')
            .text('Different investment strategies for different goals:')
            .moveDown();

        const strategies = [
            'Buy and Hold: Long-term appreciation',
            'Fix and Flip: Quick returns',
            'Rental Income: Steady cash flow',
            'REITs: Diversified exposure',
            'Crowdfunding: Fractional ownership'
        ];

        strategies.forEach(strategy => {
            doc.text(`• ${strategy}`)
                .moveDown(0.5);
        });

        doc.moveDown(2);

        // Footer
        doc.fontSize(10)
            .fillColor('#7f8c8d')
            .text('For personalized investment advice, contact our experts.', { align: 'center' })
            .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
    }

    private addInvestmentTipsContent(doc: PDFKit.PDFDocument) {
        // Header
        doc.fontSize(24)
            .fillColor('#2c3e50')
            .text('💰 Real Estate Investment Tips', { align: 'center' })
            .moveDown();

        // Introduction
        doc.fontSize(12)
            .fillColor('#34495e')
            .text('Expert tips to help you succeed in real estate investment.')
            .moveDown(2);

        // Tips
        const tips = [
            {
                title: 'Research the Market',
                content: 'Always research the local market conditions, property values, and future development plans.'
            },
            {
                title: 'Location is Key',
                content: 'Choose properties in areas with good schools, transportation, and amenities.'
            },
            {
                title: 'Calculate All Costs',
                content: 'Include property taxes, insurance, maintenance, and potential renovation costs.'
            },
            {
                title: 'Diversify Your Portfolio',
                content: 'Don\'t put all your money in one property or one area.'
            },
            {
                title: 'Think Long-term',
                content: 'Real estate is typically a long-term investment. Be patient with returns.'
            },
            {
                title: 'Get Professional Help',
                content: 'Work with experienced real estate agents, lawyers, and financial advisors.'
            }
        ];

        tips.forEach((tip, index) => {
            doc.fontSize(14)
                .fillColor('#2c3e50')
                .text(`${index + 1}. ${tip.title}`, { underline: true })
                .moveDown();

            doc.fontSize(11)
                .fillColor('#34495e')
                .text(tip.content)
                .moveDown(2);
        });

        // Footer
        doc.fontSize(10)
            .fillColor('#7f8c8d')
            .text('Remember: Past performance doesn\'t guarantee future results.', { align: 'center' })
            .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
    }

    // Clean up temporary files
    async cleanupTempFile(filePath: string): Promise<void> {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                this.logger.log(`Temporary file cleaned up: ${filePath}`);
            }
        } catch (error) {
            this.logger.error(`Error cleaning up temporary file: ${error.message}`);
        }
    }
} 