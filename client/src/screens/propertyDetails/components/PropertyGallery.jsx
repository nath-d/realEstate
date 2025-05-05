import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/fonts.css';

const PropertyGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);

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

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="heading-primary text-4xl font-bold mb-4 text-white">Property Gallery</h2>
                    <div className="flex justify-center items-center gap-4">
                        <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
                        <p className="accent-text text-xl text-gray-400">Explore every corner of this luxurious property</p>
                        <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                        >
                            <div
                                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={image}
                                    alt={`Property view ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="font-montserrat text-lg font-semibold text-white tracking-wider">View Larger</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <div className="relative max-w-7xl mx-auto px-4" onClick={e => e.stopPropagation()}>
                            <img
                                src={selectedImage}
                                alt="Selected property view"
                                className="max-h-[85vh] w-auto mx-auto"
                            />

                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 text-white hover:text-[#E5BE90] transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>

                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#E5BE90] transition-colors"
                            >
                                <FaChevronLeft size={24} />
                            </button>

                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#E5BE90] transition-colors"
                            >
                                <FaChevronRight size={24} />
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-montserrat text-white">
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