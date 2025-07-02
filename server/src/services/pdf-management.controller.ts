import { Controller, Post, Get, Delete, Param, Body, UploadedFile, UseInterceptors, Res, HttpStatus, Query, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PDFManagementService } from './pdf-management.service';
import { Response } from 'express';

@Controller('pdfs')
export class PDFManagementController {
    constructor(private readonly pdfService: PDFManagementService) { }

    // Admin upload endpoint
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
    async uploadPDF(
        @UploadedFile() file: Express.Multer.File,
        @Body('name') name: string,
        @Body('category') category: string,
        @Body('description') description?: string,
    ) {
        if (!file) throw new BadRequestException('No file uploaded');
        if (file.mimetype !== 'application/pdf') throw new BadRequestException('Only PDF files are allowed');
        if (!name || !category) throw new BadRequestException('Name and category are required');
        const pdf = await this.pdfService.uploadPDF({
            name,
            filename: file.originalname,
            fileBuffer: file.buffer,
            description,
            category,
        });
        return { success: true, pdf };
    }

    // List all PDFs
    @Get('list')
    async listPDFs() {
        const pdfs = await this.pdfService.getAllPDFs();
        return { success: true, pdfs };
    }

    // Download a PDF by id
    @Get('download/:id')
    async downloadPDF(@Param('id') id: string, @Res() res: Response) {
        const pdf = await this.pdfService.getPDFById(Number(id));
        if (!pdf) return res.status(HttpStatus.NOT_FOUND).send('PDF not found');
        const buffer = await this.pdfService.getPDFBuffer(Number(id));
        if (!buffer) return res.status(HttpStatus.NOT_FOUND).send('PDF file not found');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${pdf.filename}"`);
        res.send(buffer);
    }

    // Delete a PDF by id
    @Delete(':id')
    async deletePDF(@Param('id') id: string) {
        await this.pdfService.deletePDF(Number(id));
        return { success: true };
    }
} 