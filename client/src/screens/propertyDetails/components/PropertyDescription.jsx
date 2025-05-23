import React from 'react';
import { motion } from 'framer-motion';
import { BsQuote } from 'react-icons/bs';
import { FaGem, FaCrown, FaStar, FaFeather, FaQuoteLeft } from 'react-icons/fa';
import '../styles/fonts.css';

const PropertyDescription = ({ description }) => {
    const features = [
        {
            icon: FaGem,
            title: "Premium Finishes",
            description: "Exquisite materials and craftsmanship throughout"
        },
        {
            icon: FaCrown,
            title: "Exclusive Location",
            description: "Situated in a prestigious neighborhood"
        },
        {
            icon: FaStar,
            title: "Luxury Amenities",
            description: "World-class facilities and services"
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
        <section className="py-10 relative overflow-hidden">
            {/* Enhanced Decorative Elements */}
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
                            <FaFeather className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#E5BE90]"
                        ></motion.span>
                        <h2 className="font-parisienne text-7xl font-bold text-white">Experience Luxury </h2>
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#E5BE90]"
                        ></motion.span>
                    </div>
                    {/* <div className="flex justify-center items-center gap-4">
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 48 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#E5BE90]"
                        ></motion.span>
                        <p className="text-gray-400">Experience unparalleled luxury living</p>
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 48 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#E5BE90]"
                        ></motion.span>
                    </div> */}
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <motion.div
                        variants={item}
                        className=""
                    >
                        <div className="inline-block p-6 mb-8">
                            <BsQuote className="text-7xl text-[#E5BE90]" />
                        </div>
                        <p className="tracking-wider text-xl md:text-3xl text-gray-300 font-light leading-relaxed italic font-cormorant">
                            {description}
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-12">
                            <span className="w-2 h-2 bg-[#E5BE90] rounded-full"></span>
                            <span className="w-2 h-2 bg-[#E5BE90] rounded-full"></span>
                            <span className="w-2 h-2 bg-[#E5BE90] rounded-full"></span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Luxury Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-3xl transform -rotate-3"></div>
                            <div className="relative bg-[#1A332C] rounded-3xl p-8 backdrop-blur-lg border border-[#E5BE90]/10 shadow-xl">
                                <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="text-[#E5BE90] text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 text-center">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-center">
                                    {feature.description}
                                </p>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent transform translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertyDescription; 