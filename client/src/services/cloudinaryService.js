// Cloudinary service for client-side image optimization
export const cloudinaryService = {
    /**
     * Get an optimized image URL from Cloudinary
     * @param {string} url - The original Cloudinary URL
     * @param {Object} options - Optimization options
     * @param {number} options.width - Desired width
     * @param {number} options.height - Desired height
     * @param {string} options.crop - Crop mode (fill, scale, fit, etc.)
     * @param {string} options.quality - Quality setting (auto, 80, etc.)
     * @param {string} options.format - Output format (auto, webp, jpg, etc.)
     * @returns {string} Optimized URL
     */
    getOptimizedUrl(url, options = {}) {
        if (!url || !url.includes('cloudinary.com')) {
            return url;
        }

        const {
            width,
            height,
            crop = 'fill',
            quality = 'auto',
            format = 'auto'
        } = options;

        // Parse the Cloudinary URL to extract components
        // Example: https://res.cloudinary.com/dfvqmlm0g/image/upload/v1750623514/real-estate/pvzdg3whezedpjbjzhr9.jpg
        const urlParts = url.split('/');

        // Find the cloudinary.com part
        const cloudinaryIndex = urlParts.findIndex(part => part === 'cloudinary.com');
        if (cloudinaryIndex === -1) {
            return url;
        }

        // Extract cloud name (comes after cloudinary.com)
        const cloudName = urlParts[cloudinaryIndex + 1];

        // Find the upload part
        const uploadIndex = urlParts.findIndex(part => part === 'upload');
        if (uploadIndex === -1) {
            return url;
        }

        // Extract version (comes after upload)
        const version = urlParts[uploadIndex + 1];

        // Extract the public ID (everything after version, before the file extension)
        const publicIdParts = urlParts.slice(uploadIndex + 2);
        const publicId = publicIdParts.join('/').split('.')[0];

        // Build transformation parameters
        const transformations = [];

        if (width || height) {
            const sizeParams = [];
            if (width) sizeParams.push(`w_${width}`);
            if (height) sizeParams.push(`h_${height}`);
            if (crop) sizeParams.push(`c_${crop}`);
            transformations.push(sizeParams.join(','));
        }

        if (quality !== 'auto') {
            transformations.push(`q_${quality}`);
        }

        if (format !== 'auto') {
            transformations.push(`f_${format}`);
        }

        // Construct the optimized URL
        const transformationString = transformations.length > 0 ? transformations.join('/') + '/' : '';

        return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}v${version}/${publicId}`;
    },

    /**
     * Get a thumbnail URL for an image
     * @param {string} url - The original Cloudinary URL
     * @param {number} width - Thumbnail width (default: 300)
     * @param {number} height - Thumbnail height (default: 200)
     * @returns {string} Thumbnail URL
     */
    getThumbnailUrl(url, width = 300, height = 200) {
        return this.getOptimizedUrl(url, {
            width,
            height,
            crop: 'fill',
            quality: '60', // Low quality for thumbnails to save credits
            format: 'auto'
        });
    },

    /**
     * Get an ultra-low credit thumbnail URL (for lists and grids)
     * @param {string} url - The original Cloudinary URL
     * @param {number} width - Thumbnail width (default: 200)
     * @param {number} height - Thumbnail height (default: 150)
     * @returns {string} Ultra-low credit thumbnail URL
     */
    getLowCreditThumbnailUrl(url, width = 200, height = 150) {
        return this.getOptimizedUrl(url, {
            width,
            height,
            crop: 'fill',
            quality: '50', // Very low quality for maximum credit savings
            format: 'auto'
        });
    },

    /**
     * Get a responsive image URL with automatic format selection
     * @param {string} url - The original Cloudinary URL
     * @param {number} width - Desired width
     * @param {number} height - Desired height
     * @returns {string} Responsive image URL
     */
    getResponsiveUrl(url, width, height) {
        return this.getOptimizedUrl(url, {
            width,
            height,
            crop: 'fill',
            quality: '70',
            format: 'auto'
        });
    },

    /**
     * Get a high-quality image URL for detailed views
     * @param {string} url - The original Cloudinary URL
     * @param {number} width - Desired width
     * @param {number} height - Desired height
     * @returns {string} High-quality image URL
     */
    getHighQualityUrl(url, width, height) {
        return this.getOptimizedUrl(url, {
            width,
            height,
            crop: 'fill',
            quality: '80',
            format: 'auto'
        });
    },

    /**
     * Get a lazy loading optimized URL
     * @param {string} url - The original Cloudinary URL
     * @param {number} width - Desired width
     * @param {number} height - Desired height
     * @returns {string} Lazy loading optimized URL
     */
    getLazyLoadUrl(url, width, height) {
        return this.getOptimizedUrl(url, {
            width,
            height,
            crop: 'fill',
            quality: '60',
            format: 'auto'
        });
    },

    /**
     * Check if a URL is a Cloudinary URL
     * @param {string} url - The URL to check
     * @returns {boolean} True if it's a Cloudinary URL
     */
    isCloudinaryUrl(url) {
        return url && url.includes('cloudinary.com');
    },

    /**
     * Check if optimization should be applied (for credit management)
     * @param {string} url - The URL to check
     * @returns {boolean} True if optimization should be applied
     */
    shouldOptimize(url) {
        // Only optimize Cloudinary URLs
        if (!this.isCloudinaryUrl(url)) {
            return false;
        }

        // You can add additional logic here to control optimization
        // For example, only optimize during development or based on user preferences
        return true;
    },

    /**
     * Get an optimized URL only if optimization should be applied
     * @param {string} url - The original URL
     * @param {Object} options - Optimization options
     * @returns {string} Optimized URL or original URL
     */
    getOptimizedUrlIfNeeded(url, options = {}) {
        if (!this.shouldOptimize(url)) {
            return url;
        }
        return this.getOptimizedUrl(url, options);
    },

    /**
     * Extract the public ID from a Cloudinary URL
     * @param {string} url - The Cloudinary URL
     * @returns {string|null} The public ID or null if not a Cloudinary URL
     */
    getPublicId(url) {
        if (!this.isCloudinaryUrl(url)) {
            return null;
        }

        const urlParts = url.split('/');
        const uploadIndex = urlParts.findIndex(part => part === 'upload');

        if (uploadIndex === -1) {
            return null;
        }

        // Extract the public ID (everything after version, before the file extension)
        const publicIdParts = urlParts.slice(uploadIndex + 2);
        return publicIdParts.join('/').split('.')[0];
    },

    /**
     * Get the cloud name from a Cloudinary URL
     * @param {string} url - The Cloudinary URL
     * @returns {string|null} The cloud name or null if not a Cloudinary URL
     */
    getCloudName(url) {
        if (!this.isCloudinaryUrl(url)) {
            return null;
        }

        const urlParts = url.split('/');
        const cloudinaryIndex = urlParts.findIndex(part => part === 'cloudinary.com');

        if (cloudinaryIndex === -1) {
            return null;
        }

        return urlParts[cloudinaryIndex + 1];
    }
};

// Export default for convenience
export default cloudinaryService; 