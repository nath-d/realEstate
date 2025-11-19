import React from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaHeart, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SimilarProperties = ({ properties }) => {
    // Don't render if no properties
    if (!properties || properties.length === 0) {
        return null;
    }

    // Properties are already transformed in PropertyDetails component
    const similarProperties = properties;

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

    return (
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            {/* <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
            </div> */}

            <div className="container mx-auto px-4 sm:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaBuilding className="text-[#E5BE90] text-xl sm:text-2xl lg:text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white font-source-serif">Similar Properties</h2>
                    <div className="flex justify-center items-center gap-2 sm:gap-4">
                        <div className="flex justify-center items-center gap-2 sm:gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 60 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90] sm:w-[120px]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider text-sm sm:text-base text-center px-2">Discover more exceptional luxury estates</p>
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
                    {similarProperties.map(property => (
                        <motion.div
                            key={property.id}
                            variants={item}
                        >
                            <Link
                                to={`/propertyDet?id=${property.id}`}
                                className="group block"
                            >
                                <div className="bg-[#1A332C] rounded-2xl sm:rounded-3xl overflow-hidden transition-transform duration-300 group-hover:shadow-2xl shadow-xl border border-[#E5BE90]/10">
                                    {/* Property Image */}
                                    <div className="relative aspect-video">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-all duration-300 border border-white/10"
                                        >
                                            <FaHeart className="text-sm sm:text-base" />
                                        </motion.button>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#122620]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="p-4 sm:p-5 lg:p-6">
                                        <h3 className="font-source-serif tracking-wide text-lg sm:text-xl lg:text-2xl font-bold text-[#E5BE90] mb-2 group-hover:underline line-clamp-2">
                                            {property.title}
                                        </h3>
                                        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 sm:mb-3">
                                            ₹ {property.price?.toString().replace(/[$₹]/g, '').trim()}
                                        </p>
                                        <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 flex items-start space-x-2">
                                            {/* <span className="inline-block w-4 h-4 bg-[#E5BE90]/10 rounded-full flex-shrink-0"></span> */}
                                            <FaMapMarkerAlt className="text-[#E5BE90] flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-2">{property.address.split(',').slice(0, 2).join(',')}</span>
                                        </p>

                                        {/* Property Features */}
                                        <div className="flex justify-between text-gray-300 border-t border-[#E5BE90]/10 pt-3 sm:pt-4">
                                            <div className="flex items-center space-x-1 sm:space-x-2">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                                    <FaBed className="text-[#E5BE90] text-xs sm:text-sm" />
                                                </div>
                                                <span className="text-xs sm:text-sm">{property.details.bedrooms} beds</span>
                                            </div>
                                            <div className="flex items-center space-x-1 sm:space-x-2">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                                    <FaBath className="text-[#E5BE90] text-xs sm:text-sm" />
                                                </div>
                                                <span className="text-xs sm:text-sm">{property.details.bathrooms} baths</span>
                                            </div>
                                            <div className="flex items-center space-x-1 sm:space-x-2">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                                    <FaRuler className="text-[#E5BE90] text-xs sm:text-sm" />
                                                </div>
                                                <span className="text-xs sm:text-sm">{property.details.livingArea} sqft</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View More Button */}
                <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/properties"
                            className="inline-block bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-6 py-3 sm:px-8 sm:py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                        >
                            View All Properties
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SimilarProperties; 