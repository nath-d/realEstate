import React from 'react';
import { motion } from 'framer-motion';
import { BsHouseDoor, BsTree } from 'react-icons/bs';

const PropertyAmenities = ({ amenities }) => {
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
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1A332C]/20 blur-3xl rounded-l-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#E5BE90]/5 blur-3xl rounded-full" />

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 text-white">Luxury Amenities</h2>
                    <div className="flex justify-center items-center gap-4">
                        <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
                        <p className="text-gray-400">Discover the exceptional features of this property</p>
                        <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Interior Amenities */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="bg-[#1A332C] rounded-3xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5BE90]/10 rounded-full blur-2xl" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                <BsHouseDoor className="text-[#E5BE90] text-2xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Interior Features</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {amenities.interior.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={item}
                                    className="flex items-center gap-4 bg-[#122620] p-4 rounded-xl hover:bg-[#E5BE90]/10 transition-colors"
                                >
                                    <div className="w-2 h-2 bg-[#E5BE90] rounded-full"></div>
                                    <span className="text-gray-300">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Exterior Amenities */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="bg-[#1A332C] rounded-3xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5BE90]/10 rounded-full blur-2xl" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                <BsTree className="text-[#E5BE90] text-2xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Exterior Features</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {amenities.exterior.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={item}
                                    className="flex items-center gap-4 bg-[#122620] p-4 rounded-xl hover:bg-[#E5BE90]/10 transition-colors"
                                >
                                    <div className="w-2 h-2 bg-[#E5BE90] rounded-full"></div>
                                    <span className="text-gray-300">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PropertyAmenities; 