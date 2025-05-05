import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShare } from 'react-icons/fa';
import '../styles/fonts.css';

const PropertyHero = ({ property }) => {
    return (
        <div className="relative h-[85vh] overflow-hidden">
            {/* Parallax Background */}
            <div className="absolute inset-0 scale-105" style={{
                backgroundImage: `url(${property.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'translateZ(-1px) scale(1.2)',
            }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-[#122620]" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-end">
                <div className="container mx-auto px-6 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-2 bg-[#E5BE90] text-[#122620] rounded-full font-montserrat font-semibold text-sm tracking-wider">
                                Featured
                            </span>
                            <span className="px-4 py-2 bg-[#1A332C] text-white rounded-full font-montserrat text-sm tracking-wider">
                                For Sale
                            </span>
                        </div>

                        <h1 className="heading-primary text-6xl font-bold mb-4 text-white leading-tight">
                            {property.title}
                        </h1>

                        <p className="accent-text text-2xl mb-6 text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-8 h-0.5 bg-[#E5BE90]"></span>
                            {property.address}
                        </p>

                        <div className="flex items-center gap-8">
                            <p className="price-text text-5xl font-bold text-[#E5BE90]">
                                {property.price}
                            </p>
                            <div className="flex gap-4">
                                <button className="p-4 bg-[#1A332C] hover:bg-[#E5BE90] text-white rounded-full transition-all duration-300 transform hover:scale-105">
                                    <FaHeart className="text-xl" />
                                </button>
                                <button className="p-4 bg-[#1A332C] hover:bg-[#E5BE90] text-white rounded-full transition-all duration-300 transform hover:scale-105">
                                    <FaShare className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#122620] to-transparent" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent" />
        </div>
    );
};

export default PropertyHero; 