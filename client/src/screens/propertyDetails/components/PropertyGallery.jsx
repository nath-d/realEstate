import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaCamera, FaPlay } from 'react-icons/fa';
import { cloudinaryService } from '../../../services/cloudinaryService';
import '../styles/fonts.css';

const PropertyGallery = ({ images, videoLink }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [showVideoModal, setShowVideoModal] = useState(false);

    // Debug logging
    console.log('PropertyGallery received images:', images);
    console.log('Images type:', typeof images);
    console.log('Images length:', images ? images.length : 0);
    console.log('PropertyGallery received videoLink:', videoLink);

    // YouTube utility functions
    const extractYouTubeVideoId = (url) => {
        if (!url) return null;
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const getYouTubeThumbnail = (videoId) => {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    const getYouTubeEmbedUrl = (videoId) => {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    };

    const videoId = extractYouTubeVideoId(videoLink);
    const hasVideo = videoId && videoLink;

    const openLightbox = (index) => {
        setSelectedImage(images[index]);
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const openVideoModal = () => {
        setShowVideoModal(true);
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
    };

    const nextImage = () => {
        const newIndex = (lightboxIndex + 1) % images.length;
        setSelectedImage(images[newIndex]);
        setLightboxIndex(newIndex);
    };

    const prevImage = () => {
        const newIndex = (lightboxIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex]);
        setLightboxIndex(newIndex);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Optimize images for different use cases
    const getOptimizedImageUrl = (imageUrl, index) => {
        if (!cloudinaryService.isCloudinaryUrl(imageUrl)) {
            return imageUrl;
        }

        // Different optimization for different positions
        let optimizedUrl;
        if (index === 0) {
            // Main image - medium quality, larger size
            optimizedUrl = cloudinaryService.getResponsiveUrl(imageUrl, 800, 600);
        } else {
            // Gallery images - low credit usage for grid
            optimizedUrl = cloudinaryService.getLowCreditThumbnailUrl(imageUrl, 400, 300);
        }

        console.log(`Optimized URL for image ${index}:`, {
            original: imageUrl,
            optimized: optimizedUrl
        });

        return optimizedUrl;
    };

    const getLightboxImageUrl = (imageUrl) => {
        if (!cloudinaryService.isCloudinaryUrl(imageUrl)) {
            return imageUrl;
        }
        // Medium quality for lightbox to save credits
        return cloudinaryService.getHighQualityUrl(imageUrl, 1200, 800);
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-[#122620] relative overflow-hidden">
            {/* Decorative Elements */}
            {/* <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
            </div> */}

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaCamera className="text-[#E5BE90] text-2xl sm:text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white font-source-serif">Property Gallery</h2>
                    <div className="flex justify-center items-center gap-2 sm:gap-4">
                        <div className="flex justify-center items-center gap-2 sm:gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 60 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90] sm:w-[120px]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider text-sm sm:text-base text-center px-2">Explore every corner of this luxurious property</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 60 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90] sm:w-[120px]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                >
                    {/* Video thumbnail (if available) */}
                    {hasVideo && (
                        <motion.div
                            variants={item}
                            className="relative sm:col-span-2 sm:row-span-2"
                        >
                            <div
                                className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-xl border border-[#E5BE90]/20 h-full min-h-[200px] sm:min-h-[300px]"
                                onClick={openVideoModal}
                            >
                                <img
                                    src={getYouTubeThumbnail(videoId)}
                                    alt="Property video thumbnail"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                                        <FaPlay className="text-white text-xl sm:text-2xl ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-1 bg-red-600 text-white text-xs sm:text-sm font-montserrat rounded-full">
                                    Video Tour
                                </div>
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <span className="font-montserrat px-4 py-2 sm:px-6 sm:py-3 bg-[#E5BE90]/20 rounded-full border border-[#E5BE90]/30 text-white tracking-wider text-sm sm:text-base">Play Video</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Image gallery */}
                    {images.map((image, index) => {
                        const optimizedUrl = getOptimizedImageUrl(image, index);
                        console.log(`Image ${index}:`, { original: image, optimized: optimizedUrl });

                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className={`relative ${index === 0 && !hasVideo ? 'sm:col-span-2 sm:row-span-2' : ''}`}
                            >
                                <div
                                    className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-xl border border-[#E5BE90]/20 h-full min-h-[150px] sm:min-h-[200px]"
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={optimizedUrl}
                                        alt={`Property view ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading={index < 3 ? "eager" : "lazy"}
                                        onError={(e) => {
                                            console.error(`Failed to load image ${index}:`, optimizedUrl);
                                            console.error('Error event:', e);
                                        }}
                                        onLoad={() => {
                                            console.log(`Successfully loaded image ${index}:`, optimizedUrl);
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                        <span className="font-montserrat px-3 py-2 sm:px-6 sm:py-3 bg-[#E5BE90]/20 rounded-full border border-[#E5BE90]/30 text-white tracking-wider text-sm sm:text-base">View Larger</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
                        onClick={closeLightbox}
                    >
                        <div className="relative w-full mx-auto px-2 sm:px-4" onClick={e => e.stopPropagation()}>
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                key={lightboxIndex}
                                src={getLightboxImageUrl(selectedImage)}
                                alt="Selected property view"
                                className="border-2 sm:border-4 border-[#E5BE90] object-cover max-h-[75vh] sm:max-h-[85vh] w-auto mx-auto rounded-lg shadow-2xl"
                            />

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={closeLightbox}
                                className="border-2 sm:border-4 border-[#E5BE90] absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-colors duration-300"
                            >
                                <FaTimes size={16} className="sm:w-5 sm:h-5" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevImage}
                                className="border-2 sm:border-4 border-[#E5BE90] absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/50 text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-colors duration-300"
                            >
                                <FaChevronLeft size={16} className="sm:w-5 sm:h-5" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextImage}
                                className="border-2 sm:border-4 border-[#E5BE90] absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/50 text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-colors duration-300"
                            >
                                <FaChevronRight size={16} className="sm:w-5 sm:h-5" />
                            </motion.button>

                            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-4 sm:py-2 bg-black/50 rounded-full text-white font-montserrat text-sm sm:text-base">
                                {lightboxIndex + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Modal */}
            <AnimatePresence>
                {showVideoModal && hasVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
                        onClick={closeVideoModal}
                    >
                        <div className="relative w-full max-w-4xl lg:max-w-6xl mx-auto px-2 sm:px-4" onClick={e => e.stopPropagation()}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border-2 sm:border-4 border-[#E5BE90]"
                            >
                                <iframe
                                    src={getYouTubeEmbedUrl(videoId)}
                                    title="Property Video Tour"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={closeVideoModal}
                                className="border-2 sm:border-4 border-[#E5BE90] absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-colors duration-300"
                            >
                                <FaTimes size={16} className="sm:w-5 sm:h-5" />
                            </motion.button>

                            <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-4 sm:py-2 bg-black/50 rounded-full text-white font-montserrat text-sm sm:text-base">
                                Property Video Tour
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PropertyGallery; 