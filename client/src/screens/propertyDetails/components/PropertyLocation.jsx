import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPlane, FaBus, FaSchool, FaShoppingCart, FaUtensils } from 'react-icons/fa';
import { BsShieldCheck } from 'react-icons/bs';

const PropertyLocation = () => {
    const locationInfo = {
        nearbyAmenities: [
            { icon: FaShoppingCart, text: 'Shopping Center - 10 min drive' },
            { icon: FaUtensils, text: 'Restaurants - 5 min drive' },
            { icon: FaSchool, text: 'Schools - 15 min drive' }
        ],
        transportation: [
            { icon: FaPlane, text: 'Airport - 45 min drive' },
            { icon: FaBus, text: 'Bus Station - 10 min walk' }
        ],
        community: [
            { icon: BsShieldCheck, text: 'Gated Community' },
            { icon: BsShieldCheck, text: '24/7 Security' },
            { icon: BsShieldCheck, text: 'Private Beach Club' }
        ]
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

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('path/to/map-pattern.png')] opacity-5" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1A332C]/20 blur-3xl rounded-l-full" />

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaMapMarkerAlt className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Prime Location</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider">Perfectly positioned for your lifestyle</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#1A332C] rounded-3xl overflow-hidden"
                    >
                        <div className="aspect-square bg-gray-800 relative">
                            {/* Map would go here */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-400">Interactive map coming soon</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location Details */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Nearby Amenities */}
                        <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-6 text-white">Nearby Amenities</h3>
                            <div className="space-y-4">
                                {locationInfo.nearbyAmenities.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <item.icon className="text-[#E5BE90]" />
                                        </div>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Transportation */}
                        <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-6 text-white">Transportation</h3>
                            <div className="space-y-4">
                                {locationInfo.transportation.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <item.icon className="text-[#E5BE90]" />
                                        </div>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Community Features */}
                        <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-6 text-white">Community</h3>
                            <div className="space-y-4">
                                {locationInfo.community.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <item.icon className="text-[#E5BE90]" />
                                        </div>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PropertyLocation; 