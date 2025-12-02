import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { multerConfig } from './multer.config';

@Controller('upload')
export class UploadController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post('image')
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async uploadImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        try {
            const result = await this.cloudinaryService.uploadImage(file);
            return {
                success: true,
                data: {
                    url: result.secure_url,
                    publicId: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                },
            };
        } catch (error) {
            throw new BadRequestException('Failed to upload image');
        }
    }

    @Post('images')
    @UseInterceptors(FilesInterceptor('images', 10, multerConfig)) // Max 10 images
    async uploadImages(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB per file
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
                ],
                fileIsRequired: false,
            }),
        )
        files: Express.Multer.File[],
    ) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        try {
            const results = await this.cloudinaryService.uploadMultipleImages(files);
            return {
                success: true,
                data: results.map(result => ({
                    url: result.secure_url,
                    publicId: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                })),
            };
        } catch (error) {
            throw new BadRequestException('Failed to upload images');
        }
    }
} 