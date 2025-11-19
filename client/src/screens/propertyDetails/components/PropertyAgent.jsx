import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaWhatsapp, FaLinkedin, FaUser } from 'react-icons/fa';
import config from '../../../../config.js';

const PropertyAgent = ({ agent }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Property Inquiry',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(`${config.api.baseUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    subject: formData.subject || 'Property Inquiry',
                    message: formData.message || 'I am interested in this property and would like more information.'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit contact form');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: 'Property Inquiry',
                message: ''
            });

            // Reset success message after 3 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 3000);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setSubmitStatus('error');

            // Reset error message after 3 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" />
                {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent" /> */}
                {/* <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" /> */}
                {/* <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl" /> */}
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaUser className="text-[#E5BE90] text-xl sm:text-2xl lg:text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white font-source-serif">Contact Us</h2>
                    <div className="flex justify-center items-center gap-2 sm:gap-4">
                        <div className="flex justify-center items-center gap-2 sm:gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 60 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90] sm:w-[120px]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider text-sm sm:text-base text-center px-2">Connect with a luxury real estate specialist</p>
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-[#1A332C] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-[#E5BE90]/10 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#E5BE90]/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-[#E5BE90]/5 rounded-full blur-2xl" />

                        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative">
                            {/* Agent Info */}
                            <div className="text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="mb-6 sm:mb-8"
                                >
                                    <img
                                        src={agent.image}
                                        alt={agent.name}
                                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full mx-auto lg:mx-0 object-cover border-2 sm:border-4 border-[#E5BE90]/20 shadow-xl"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{agent.name}</h3>
                                    <p className="text-[#E5BE90] text-base sm:text-lg mb-3 sm:mb-4">Property Specialist</p>
                                    <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                                        {/* With over 10 years of experience in luxury real estate, specializing in high-end properties and delivering exceptional service. */}
                                        Reach out for exceptional real esate insights and expert advice tailored to your unique needs!
                                    </p>

                                    <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
                                        <motion.a
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            href="#"
                                            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center text-[#E5BE90] hover:bg-[#E5BE90] hover:text-[#122620] transition-all duration-300"
                                        >
                                            <FaLinkedin className="text-sm sm:text-base" />
                                        </motion.a>
                                        <motion.a
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            href="#"
                                            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center text-[#E5BE90] hover:bg-[#E5BE90] hover:text-[#122620] transition-all duration-300"
                                        >
                                            <FaWhatsapp className="text-sm sm:text-base" />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#122620] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E5BE90]/10"
                            >
                                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Schedule a Viewing</h4>

                                {/* Success/Error Messages */}
                                {submitStatus === 'success' && (
                                    <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                                        <p className="text-green-400 text-xs sm:text-sm leading-relaxed">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                                        <p className="text-red-400 text-xs sm:text-sm leading-relaxed">Sorry, there was an error sending your message. Please try again.</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Your Name"
                                            required
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Your Email"
                                            required
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Your Phone"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder="Subject"
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Message"
                                            rows="3"
                                            required
                                            className="w-full bg-[#1A332C] border border-[#E5BE90]/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#E5BE90] transition-colors h-20 sm:h-24"
                                        ></textarea>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full inline-block bg-transparent border-2 border-[#E5BE90] text-[#E5BE90] px-6 py-3 sm:px-8 sm:py-4 rounded-none hover:bg-[#E5BE90] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Request Viewing'}
                                    </motion.button>
                                </form>

                                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                                    <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#E5BE90] transition-colors">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <FaPhone className="text-[#E5BE90] text-sm sm:text-base" />
                                        </div>
                                        <span className="text-xs sm:text-base break-all">{agent.phone}</span>
                                    </a>
                                    <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#E5BE90] transition-colors">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <FaEnvelope className="text-[#E5BE90] text-sm sm:text-base" />
                                        </div>
                                        <span className="text-xs sm:text-base break-all">{agent.email}</span>
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