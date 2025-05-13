import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaExpand, FaCompress, FaVrCardboard } from 'react-icons/fa';

const VirtualTour = ({ url }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaVrCardboard className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-white">Virtual Tour</h2>
                    <div className="flex justify-center items-center gap-4">
                        <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
                        <p className="text-gray-400">Explore the property in immersive 3D</p>
                        <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
                    </div>
                </motion.div>

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative aspect-video bg-[#1A332C] rounded-3xl overflow-hidden shadow-xl border border-[#E5BE90]/10"
                    >
                        {/* Placeholder for actual virtual tour implementation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#E5BE90]/20 hover:bg-[#E5BE90]/30 cursor-pointer flex items-center justify-center backdrop-blur-sm border border-[#E5BE90]/30 transition-all duration-300"
                                >
                                    <FaPlay className="text-[#E5BE90] text-3xl" />
                                </motion.div>
                                <p className="text-gray-300 font-light">Click to start virtual tour</p>
                            </div>
                        </div>

                        {/* Virtual Tour Controls */}
                        <div className="absolute bottom-6 right-6 flex space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleFullscreen}
                                className="p-4 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 border border-white/10"
                            >
                                {isFullscreen ? <FaCompress /> : <FaExpand />}
                            </motion.button>
                        </div>

                        {/* Virtual Tour Features */}
                        <div className="absolute top-6 left-6 flex flex-col space-y-3">
                            <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/10">
                                360° View
                            </div>
                            <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/10">
                                Floor Plan
                            </div>
                            <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/10">
                                Room Details
                            </div>
                        </div>
                    </motion.div>

                    {/* Virtual Tour Instructions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="bg-[#122620] p-6 rounded-3xl border border-[#E5BE90]/5">
                            <h3 className="text-[#E5BE90] font-semibold mb-3 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-[#E5BE90]/10 flex items-center justify-center mr-3">1</span>
                                Navigation
                            </h3>
                            <p className="text-gray-400">
                                Click and drag to look around. Use mouse wheel to zoom in and out.
                            </p>
                        </div>
                        <div className="bg-[#122620] p-6 rounded-3xl border border-[#E5BE90]/5">
                            <h3 className="text-[#E5BE90] font-semibold mb-3 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-[#E5BE90]/10 flex items-center justify-center mr-3">2</span>
                                Hotspots
                            </h3>
                            <p className="text-gray-400">
                                Click on hotspots to move between rooms and view detailed information.
                            </p>
                        </div>
                        <div className="bg-[#122620] p-6 rounded-3xl border border-[#E5BE90]/5">
                            <h3 className="text-[#E5BE90] font-semibold mb-3 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-[#E5BE90]/10 flex items-center justify-center mr-3">3</span>
                                Floor Plan
                            </h3>
                            <p className="text-gray-400">
                                Switch between floors using the floor plan navigation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VirtualTour; 