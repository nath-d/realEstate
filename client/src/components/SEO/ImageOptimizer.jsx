import React, { useState, useEffect } from 'react';

const ImageOptimizer = ({
    src,
    alt,
    className = '',
    width,
    height,
    loading = 'lazy',
    quality = 80,
    format = 'auto',
    ...props
}) => {
    const [imageSrc, setImageSrc] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) return;

        // If it's a Cloudinary URL, optimize it
        if (src.includes('cloudinary.com') || src.includes('res.cloudinary.com')) {
            const optimizedSrc = optimizeCloudinaryUrl(src, { width, height, quality, format });
            setImageSrc(optimizedSrc);
        } else {
            setImageSrc(src);
        }
    }, [src, width, height, quality, format]);

    const optimizeCloudinaryUrl = (url, options = {}) => {
        if (!url.includes('cloudinary.com')) return url;

        try {
            const urlParts = url.split('/upload/');
            if (urlParts.length !== 2) return url;

            const transformations = [];

            if (options.width) transformations.push(`w_${options.width}`);
            if (options.height) transformations.push(`h_${options.height}`);
            if (options.quality) transformations.push(`q_${options.quality}`);
            if (options.format && options.format !== 'auto') transformations.push(`f_${options.format}`);

            // Add automatic optimizations
            transformations.push('f_auto'); // Auto format
            transformations.push('q_auto'); // Auto quality
            transformations.push('c_fill'); // Crop to fill

            const transformString = transformations.join(',');
            return `${urlParts[0]}/upload/${transformString}/${urlParts[1]}`;
        } catch (error) {
            console.warn('Failed to optimize Cloudinary URL:', error);
            return url;
        }
    };

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    if (hasError) {
        return (
            <div
                className={`bg-gray-200 flex items-center justify-center ${className}`}
                style={{ width, height }}
            >
                <span className="text-gray-500 text-sm">Image not available</span>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
                    style={{ width, height }}
                >
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
            )}
            <img
                src={imageSrc}
                alt={alt}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                loading={loading}
                width={width}
                height={height}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
            />
        </div>
    );
};

export default ImageOptimizer;
