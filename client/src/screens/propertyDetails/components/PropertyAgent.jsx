import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const PropertyAgent = ({ agent }) => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[#1A332C]/30 backdrop-blur-xl rounded-3xl" />

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-[#1A332C] rounded-3xl p-8 md:p-12 relative overflow-hidden">
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
                                        className="w-48 h-48 rounded-full mx-auto md:mx-0 object-cover border-4 border-[#E5BE90]/20"
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
                                        <a href="#" className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center text-[#E5BE90] hover:bg-[#E5BE90] hover:text-[#122620] transition-all duration-300">
                                            <FaLinkedin />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center text-[#E5BE90] hover:bg-[#E5BE90] hover:text-[#122620] transition-all duration-300">
                                            <FaWhatsapp />
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#122620] rounded-2xl p-6"
                            >
                                <h4 className="text-2xl font-bold text-white mb-6">Schedule a Viewing</h4>

                                <form className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90]"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90]"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Your Phone"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90]"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Message"
                                            rows="4"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90]"
                                        ></textarea>
                                    </div>
                                    <button className="w-full bg-[#E5BE90] text-[#122620] py-4 rounded-lg font-bold hover:bg-[#E5BE90]/90 transition-colors">
                                        Request Viewing
                                    </button>
                                </form>

                                <div className="mt-8 space-y-4">
                                    <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#E5BE90]">
                                        <FaPhone className="text-[#E5BE90]" />
                                        <span>{agent.phone}</span>
                                    </a>
                                    <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#E5BE90]">
                                        <FaEnvelope className="text-[#E5BE90]" />
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