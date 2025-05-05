import React from 'react';
import { motion } from 'framer-motion';
import { BsQuote } from 'react-icons/bs';
import '../styles/fonts.css';

const PropertyDescription = ({ description }) => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#E5BE90]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1A332C]/30 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="flex justify-center mb-8">
                        <BsQuote className="text-6xl text-[#E5BE90]" />
                    </div>

                    <h2 className="font-parisienne text-3xl md:text-6xl font-bold mb-8 leading-relaxed text-white">
                        Experience Luxury Living
                    </h2>

                    <div className="relative">
                        <p className="text-2xl text-gray-300 font-cormorant mb-8">
                            {description}
                        </p>

                        <div className="flex items-center justify-center gap-4 mt-12">
                            <span className="w-2 h-2 bg-[#E5BE90] rounded-full"></span>
                            <span className="w-2 h-2 bg-[#E5BE90] rounded-full"></span>
                            <span className="w-2 h-2 bg-[#E5BE90] rounded-full"></span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PropertyDescription; 