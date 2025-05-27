import React from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaHeart, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SimilarProperties = ({ properties }) => {
    // This would typically come from an API
    const similarProperties = [
        {
            id: 2,
            title: "Modern Beachfront Condo",
            price: "$3,250,000",
            address: "456 Coastal Highway, Malibu, CA 90265",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            details: {
                bedrooms: 3,
                bathrooms: 2.5,
                livingArea: "2,200 sq ft"
            }
        },
        {
            id: 3,
            title: "Luxury Ocean View Penthouse",
            price: "$4,500,000",
            address: "789 Ocean Drive, Malibu, CA 90265",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
            details: {
                bedrooms: 4,
                bathrooms: 3.5,
                livingArea: "3,500 sq ft"
            }
        },
        {
            id: 4,
            title: "Contemporary Beach House",
            price: "$3,950,000",
            address: "321 Shoreline Road, Malibu, CA 90265",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
            details: {
                bedrooms: 3,
                bathrooms: 2,
                livingArea: "2,800 sq ft"
            }
        }
    ];

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
        <section className="py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            {/* <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
            </div> */}

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaBuilding className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Similar Properties</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider">Discover more exceptional luxury estates</p>
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
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {similarProperties.map(property => (
                        <motion.div
                            key={property.id}
                            variants={item}
                        >
                            <Link
                                to={`/property/${property.id}`}
                                className="group block"
                            >
                                <div className="bg-[#1A332C] rounded-3xl overflow-hidden transition-transform duration-300 group-hover:shadow-2xl shadow-xl border border-[#E5BE90]/10">
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
                                            className="absolute top-4 right-4 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-[#E5BE90]/80 hover:text-[#122620] transition-all duration-300 border border-white/10"
                                        >
                                            <FaHeart />
                                        </motion.button>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#122620]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="p-6">
                                        <h3 className="font-source-serif tracking-wide text-2xl font-bold text-[#E5BE90] mb-2 group-hover:underline">
                                            {property.title}
                                        </h3>
                                        <p className="text-2xl font-bold text-white mb-3">
                                            {property.price}
                                        </p>
                                        <p className="text-gray-400 text-sm mb-4 flex items-center space-x-1">
                                            {/* <span className="inline-block w-4 h-4 bg-[#E5BE90]/10 rounded-full flex-shrink-0"></span> */}
                                            <FaMapMarkerAlt className="text-[#E5BE90]" />
                                            <span>{property.address}</span>
                                        </p>

                                        {/* Property Features */}
                                        <div className="flex justify-between text-gray-300 border-t border-[#E5BE90]/10 pt-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                                    <FaBed className="text-[#E5BE90]" />
                                                </div>
                                                <span>{property.details.bedrooms}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                                    <FaBath className="text-[#E5BE90]" />
                                                </div>
                                                <span>{property.details.bathrooms}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                                    <FaRuler className="text-[#E5BE90]" />
                                                </div>
                                                <span>{property.details.livingArea}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View More Button */}
                <div className="mt-12 text-center">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/properties"
                            className="inline-block bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
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