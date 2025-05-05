import React from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaCar, FaCalendarAlt, FaHome } from 'react-icons/fa';
import '../styles/fonts.css';

const PropertyStats = ({ details }) => {
    const stats = [
        { icon: FaBed, label: 'Bedrooms', value: details.bedrooms },
        { icon: FaBath, label: 'Bathrooms', value: details.bathrooms },
        { icon: FaRuler, label: 'Living Area', value: details.livingArea },
        { icon: FaCar, label: 'Garage', value: `${details.garage} Cars` },
        { icon: FaHome, label: 'Lot Size', value: details.lotSize },
        { icon: FaCalendarAlt, label: 'Year Built', value: details.yearBuilt }
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
        <section className="py-16 relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[#1A332C]/30 backdrop-blur-xl" />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="container mx-auto px-6 relative"
            >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="bg-[#1A332C] rounded-2xl p-6 transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center mb-4">
                                    <stat.icon className="text-[#E5BE90] text-2xl" />
                                </div>
                                <p className="font-montserrat text-sm text-gray-400 mb-2 tracking-wider uppercase">{stat.label}</p>
                                <p className="font-source-serif text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default PropertyStats; 