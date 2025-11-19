import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);

export interface UploadedPDF {
    id: number;
    name: string;
    filename: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    description?: string | null;
    category: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePDFData {
    name: string;
    filename: string;
    fileBuffer: Buffer;
    description?: string;
    category: string;
}

@Injectable()
export class PDFManagementService {
    private readonly uploadDir = path.join(process.cwd(), 'uploads', 'pdfs');

    constructor(private prisma: PrismaService) {
        this.ensureUploadDirectory();
    }

    private async ensureUploadDirectory() {
        try {
            await mkdir(this.uploadDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }
    }

    async uploadPDF(data: CreatePDFData): Promise<UploadedPDF> {
        const { name, filename, fileBuffer, description, category } = data;

        // Generate unique filename
        const timestamp = Date.now();
        const fileExtension = path.extname(filename);
        const baseName = path.basename(filename, fileExtension);
        const uniqueFilename = `${baseName}_${timestamp}${fileExtension}`;
        const filePath = path.join(this.uploadDir, uniqueFilename);

        // Save file to disk
        await writeFile(filePath, fileBuffer);

        // Save to database
        const pdf = await this.prisma.marketingPDF.create({
            data: {
                name,
                filename: uniqueFilename,
                filePath: filePath,
                fileSize: fileBuffer.length,
                mimeType: 'application/pdf',
                description,
                category,
            },
        });

        return pdf;
    }

    async getAllPDFs(): Promise<UploadedPDF[]> {
        return this.prisma.marketingPDF.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async getPDFsByCategory(category: string): Promise<UploadedPDF[]> {
        return this.prisma.marketingPDF.findMany({
            where: { category, isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getPDFById(id: number): Promise<UploadedPDF | null> {
        return this.prisma.marketingPDF.findUnique({
            where: { id },
        });
    }

    async updatePDF(id: number, data: Partial<UploadedPDF>): Promise<UploadedPDF> {
        return this.prisma.marketingPDF.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                category: data.category,
                isActive: data.isActive,
            },
        });
    }

    async deletePDF(id: number): Promise<void> {
        const pdf = await this.prisma.marketingPDF.findUnique({
            where: { id },
        });

        if (!pdf) {
            throw new Error('PDF not found');
        }

        // Delete file from disk
        try {
            await unlink(pdf.filePath);
        } catch (error) {
            console.error('Error deleting file from disk:', error);
        }

        // Delete from database
        await this.prisma.marketingPDF.delete({
            where: { id },
        });
    }

    async getPDFBuffer(id: number): Promise<Buffer | null> {
        const pdf = await this.prisma.marketingPDF.findUnique({
            where: { id },
        });

        if (!pdf || !pdf.isActive) {
            return null;
        }

        try {
            return fs.readFileSync(pdf.filePath);
        } catch (error) {
            console.error('Error reading PDF file:', error);
            return null;
        }
    }

    async getPDFsForEmail(categories: string[]): Promise<{ name: string; buffer: Buffer }[]> {
        const pdfs = await this.prisma.marketingPDF.findMany({
            where: {
                category: { in: categories },
                isActive: true,
            },
        });

        const result: { name: string; buffer: Buffer }[] = [];

        for (const pdf of pdfs) {
            try {
                const buffer = fs.readFileSync(pdf.filePath);
                result.push({
                    name: pdf.name,
                    buffer,
                });
            } catch (error) {
                console.error(`Error reading PDF ${pdf.name}:`, error);
            }
        }

        return result;
    }
}

export * from './pdf-management.service'; 