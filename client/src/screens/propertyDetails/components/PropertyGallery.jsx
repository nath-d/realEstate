import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaCamera } from 'react-icons/fa';
import { cloudinaryService } from '../../../services/cloudinaryService';
import '../styles/fonts.css';

const PropertyGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Debug logging
    console.log('PropertyGallery received images:', images);
    console.log('Images type:', typeof images);
    console.log('Images length:', images ? images.length : 0);

    const openLightbox = (index) => {
        setSelectedImage(images[index]);
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
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
        <section className="py-20 bg-[#122620] relative overflow-hidden">
            {/* Decorative Elements */}
            {/* <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
            </div> */}

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaCamera className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Property Gallery</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider">Explore every corner of this luxurious property</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {images.map((image, index) => {
                        const optimizedUrl = getOptimizedImageUrl(image, index);
                        console.log(`Image ${index}:`, { original: image, optimized: optimizedUrl });

                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className={`relative ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                            >
                                <div
                                    className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl border border-[#E5BE90]/20 h-full"
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
                                        <span className="font-montserrat px-6 py-3 bg-[#E5BE90]/20 rounded-full border border-[#E5BE90]/30 text-white tracking-wider">View Larger</span>
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
                        <div className="relative w-full mx-auto px-4" onClick={e => e.stopPropagation()}>
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                key={lightboxIndex}
                                src={getLightboxImageUrl(selectedImage)}
                                alt="Selected property view"
                                className="border-4 border-[#E5BE90] object-cover max-h-[85vh] w-auto mx-auto rounded-lg shadow-2xl"
                            />

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={closeLightbox}
                                className="border-4 border-[#E5BE90] absolute top-4 right-4 p-3 rounded-full bg-black/50 text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-colors duration-300"
                            >
                                <FaTimes size={20} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevImage}
                                className="border-4 border-[#E5BE90] absolute left-6 top-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-colors duration-300"
                            >
                                <FaChevronLeft size={20} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextImage}
                                className="border-4 border-[#E5BE90] absolute right-6 top-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-colors duration-300"
                            >
                                <FaChevronRight size={20} />
                            </motion.button>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white font-montserrat">
                                {lightboxIndex + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PropertyGallery; 