import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface CloudinaryUploadResponse {
    success: boolean;
    data: {
        url: string;
        publicId: string;
        width: number;
        height: number;
        format: string;
    };
}

export interface CloudinaryMultipleUploadResponse {
    success: boolean;
    data: Array<{
        url: string;
        publicId: string;
        width: number;
        height: number;
        format: string;
    }>;
}

export const cloudinaryService = {
    async uploadImage(file: File): Promise<CloudinaryUploadResponse> {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${API_BASE_URL}/upload/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    },

    async uploadMultipleImages(files: File[]): Promise<CloudinaryMultipleUploadResponse> {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const response = await axios.post(`${API_BASE_URL}/upload/images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading images:', error);
            throw new Error('Failed to upload images');
        }
    },

    // Utility function to get optimized image URL
    getOptimizedUrl(url: string, options: {
        width?: number;
        height?: number;
        crop?: string;
        quality?: string;
        format?: string;
    } = {}): string {
        // If it's already a Cloudinary URL, we can optimize it
        if (url.includes('cloudinary.com')) {
            // Extract the public ID from the URL
            const urlParts = url.split('/');
            const lastPart = urlParts[urlParts.length - 1];
            if (lastPart) {
                const publicId = lastPart.split('.')[0];
                // For now, return the original URL
                // In a real implementation, you would construct the optimized URL
                return url;
            }
        }

        return url;
    },

    // Utility function to get thumbnail URL
    getThumbnailUrl(url: string, width: number = 300, height: number = 200): string {
        return this.getOptimizedUrl(url, { width, height, crop: 'fill' });
    },
}; 