import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaWhatsapp, FaLinkedin, FaUser } from 'react-icons/fa';

const PropertyAgent = ({ agent }) => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" /> */}
                {/* <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" /> */}
                {/* <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" /> */}
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
                            <FaUser className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Contact Us</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider">Connect with a luxury real estate specialist</p>
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-[#1A332C] rounded-3xl p-8 md:p-12 shadow-xl border border-[#E5BE90]/10 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5BE90]/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E5BE90]/5 rounded-full blur-2xl" />

                        <div className="grid md:grid-cols-2 gap-12 items-center relative">
                            {/* Agent Info */}
                            <div className="text-center md:text-left">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="mb-8"
                                >
                                    <img
                                        src={agent.image}
                                        alt={agent.name}
                                        className="w-48 h-48 rounded-full mx-auto md:mx-0 object-cover border-4 border-[#E5BE90]/20 shadow-xl"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-3xl font-bold text-white mb-2">{agent.name}</h3>
                                    <p className="text-[#E5BE90] text-lg mb-4">Luxury Property Specialist</p>
                                    <p className="text-gray-400 mb-6">
                                        With over 10 years of experience in luxury real estate, specializing in high-end properties and delivering exceptional service.
                                    </p>

                                    <div className="flex gap-4 justify-center md:justify-start">
                                        <motion.a
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            href="#"
                                            className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center text-[#E5BE90] hover:bg-[#E5BE90] hover:text-[#122620] transition-all duration-300"
                                        >
                                            <FaLinkedin />
                                        </motion.a>
                                        <motion.a
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            href="#"
                                            className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center text-[#E5BE90] hover:bg-[#E5BE90] hover:text-[#122620] transition-all duration-300"
                                        >
                                            <FaWhatsapp />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#122620] rounded-3xl p-8 shadow-xl border border-[#E5BE90]/10"
                            >
                                <h4 className="text-2xl font-bold text-white mb-6">Schedule a Viewing</h4>

                                <form className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Your Phone"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Message"
                                            rows="4"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors"
                                        ></textarea>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full inline-block bg-transparent border-2 border-[#E5BE90] text-[#E5BE90] px-8 py-4 rounded-none hover:bg-[#E5BE90] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"

                                    >
                                        Request Viewing
                                    </motion.button>

                                </form>

                                <div className="mt-8 space-y-4">
                                    <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#E5BE90] transition-colors">
                                        <div className="w-8 h-8 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <FaPhone className="text-[#E5BE90]" />
                                        </div>
                                        <span>{agent.phone}</span>
                                    </a>
                                    <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#E5BE90] transition-colors">
                                        <div className="w-8 h-8 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <FaEnvelope className="text-[#E5BE90]" />
                                        </div>
                                        <span>{agent.email}</span>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PropertyAgent; 