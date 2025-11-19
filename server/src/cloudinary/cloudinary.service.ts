import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { cloudinaryConfig } from '../config/cloudinary.config';

@Injectable()
export class CloudinaryService {
    private isConfigured: boolean = false;

    constructor() {
        // Check if we have valid Cloudinary credentials
        if (cloudinaryConfig.cloud_name &&
            cloudinaryConfig.cloud_name !== 'your_cloud_name' &&
            cloudinaryConfig.api_key &&
            cloudinaryConfig.api_key !== 'your_api_key' &&
            cloudinaryConfig.api_secret &&
            cloudinaryConfig.api_secret !== 'your_api_secret') {

            cloudinary.config({
                cloud_name: cloudinaryConfig.cloud_name,
                api_key: cloudinaryConfig.api_key,
                api_secret: cloudinaryConfig.api_secret,
            });
            this.isConfigured = true;
        } else {
            console.warn('Cloudinary credentials not configured. Using mock responses for testing.');
        }
    }

    async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
        if (!this.isConfigured) {
            // Return a mock response for testing
            return {
                asset_id: `mock_asset_${Date.now()}`,
                public_id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                version: 1,
                version_id: `mock_version_${Date.now()}`,
                signature: 'mock_signature',
                width: 800,
                height: 600,
                format: 'jpg',
                created_at: new Date().toISOString(),
                resource_type: 'image',
                tags: [],
                bytes: file.size,
                type: 'upload',
                etag: 'mock_etag',
                placeholder: false,
                url: `https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Mock+Image+${Date.now()}`,
                secure_url: `https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Mock+Image+${Date.now()}`,
                access_mode: 'public',
                original_filename: file.originalname,
                original_extension: file.originalname.split('.').pop() || 'jpg'
            };
        }

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'real-estate',
                    resource_type: 'auto',
                    // Remove transformations to save credits - upload original image
                    // Transformations will be applied on-demand when displaying
                },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error('Upload failed - no result returned'));
                    resolve(result as unknown as CloudinaryResponse);
                },
            );

            uploadStream.end(file.buffer);
        });
    }

    async uploadMultipleImages(files: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
        const uploadPromises = files.map(file => this.uploadImage(file));
        return Promise.all(uploadPromises);
    }

    async deleteImage(publicId: string): Promise<any> {
        if (!this.isConfigured) {
            console.log('Mock delete for public ID:', publicId);
            return { result: 'ok' };
        }
        return cloudinary.uploader.destroy(publicId);
    }

    async deleteMultipleImages(publicIds: string[]): Promise<any[]> {
        const deletePromises = publicIds.map(publicId => this.deleteImage(publicId));
        return Promise.all(deletePromises);
    }

    getOptimizedUrl(publicId: string, options: {
        width?: number;
        height?: number;
        crop?: string;
        quality?: string;
        format?: string;
    } = {}): string {
        if (!this.isConfigured) {
            // Return a mock optimized URL
            const { width = 800, height = 600 } = options;
            return `https://via.placeholder.com/${width}x${height}/4A90E2/FFFFFF?text=Optimized+Mock`;
        }

        const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options;

        let url = cloudinary.url(publicId, {
            transformation: [
                { width, height, crop, quality },
                { fetch_format: format }
            ]
        });

        return url;
    }

    getThumbnailUrl(publicId: string, width: number = 300, height: number = 200): string {
        return this.getOptimizedUrl(publicId, { width, height, crop: 'fill' });
    }
} 