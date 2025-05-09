import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import {
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { IndianRupee, Search, MapPin, Home, DollarSign, ArrowRight, Filter, Star, Waves, Mountain, Hotel, LandPlot, Bed, Bath, Ruler, MapPinIcon } from 'lucide-react'

const PropertyListingCard = ({ property, handleImageError }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="border-2 border-[#D6AD60] h-full block bg-[#F4EBD0] rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 25
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden aspect-[4/3]">
                <motion.img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25
                    }}
                />

                {/* Default gradient overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#122620]/90 via-[#122620]/30 to-transparent"
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Hover gradient overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#122620] via-[#122620]/70 to-[#122620]/60"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="absolute bottom-6 left-6 w-1/2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 0 : -20
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                            delay: isHovered ? 0.1 : 0
                        }}
                    >
                        <motion.button
                            className="flex items-center text-start w-full py-2 text-[#D6AD60] border-b-2 border-[#D6AD60] text-sm sm:text-lg font-medium"
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative flex items-center">
                                Details
                                <motion.span
                                    className="inline-block ml-2"
                                    animate={{ x: isHovered ? 5 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </motion.span>
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* {property.price && (
                    <div className="flex items-center absolute bottom-4 left-4 bg-[#D6AD60] text-[#122620] px-3 py-1.5 rounded-none text-xs sm:text-sm font-medium z-10">
                        <IndianRupee className="h-4 mr-1" />{property.price}
                    </div>
                )} */}

                {property.featured && (
                    <div className="absolute top-4 right-4 bg-[#D6AD60] text-[#122620] px-2 py-1 sm:px-3 sm:py-1.5 rounded-none flex items-center text-xs font-medium z-10">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                    </div>
                )}
            </div>

            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <h3 className="font-source-serif text-lg sm:text-xl lg:text-2xl font-medium text-[#122620] mb-2 line-clamp-2">
                    {property.title}
                </h3>

                <div className="flex items-center text-[#122620] mb-4">
                    <FaMapMarkerAlt className="h-4 w-4 mr-1 text-[#D6AD60] flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">{property.location}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-[#122620]/20">
                    <div className="grid grid-cols-3 gap-2 text-[#122620] text-xs sm:text-sm">
                        <div className="flex items-center justify-center bg-[#122620]/10 rounded-lg p-2 sm:px-4 sm:py-3">
                            <Bed className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#b68d40]" />
                            <span className="whitespace-nowrap">{property.specs?.beds ?? 'N/A'} beds</span>
                        </div>
                        <div className="flex items-center justify-center bg-[#122620]/10 rounded-lg p-2 sm:px-4 sm:py-3">
                            <Bath className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#b68d40]" />
                            <span className="whitespace-nowrap">{property.specs?.baths ?? 'N/A'} baths</span>
                        </div>
                        <div className="flex items-center justify-center bg-[#122620]/10 rounded-lg p-2 sm:px-4 sm:py-3">
                            <LandPlot className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#b68d40]" />
                            <span className="whitespace-nowrap">{property.specs?.sqft ?? 'N/A'} sqft</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-start py-4 mt-2 text-3xl font-bold font-source-serif text-[#122620]'>
                    <IndianRupee className="mr-1" />{property.price}
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyListingCard;

