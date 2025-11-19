import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getWhyReasons } from '../../../services/whyChooseUsService';

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const [reasons, setReasons] = useState([]);

    useEffect(() => {
        getWhyReasons().then((items) => setReasons(items || []));
    }, []);

    const renderIcon = (iconKey) => {
        switch (iconKey) {
            case 'shield':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3l7 4v5c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V7l7-4z"></path>
                    </svg>
                );
            case 'star':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                );
            case 'award':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8a4 4 0 100-8 4 4 0 000 8zm6 14l-4-2-2 4-2-4-4 2 1.5-5.5L2 12l5.5-.5L10 6l2.5 5.5L18 12l-4.5 4.5L18 22z"></path>
                    </svg>
                );
            case 'building':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01"></path>
                    </svg>
                );
            case 'graph':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3v18h18M7 13l3 3 7-7"></path>
                    </svg>
                );
            case 'support':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 13a3 3 0 013 3v3H3v-3a3 3 0 013-3m12 0V9a6 6 0 10-12 0v4m12 0H6"></path>
                    </svg>
                );
            case 'innovation':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2a7 7 0 00-7 7c0 2.9 1.64 5.41 4 6.32V18a3 3 0 003 3 3 3 0 003-3v-2.68c2.36-.91 4-3.42 4-6.32a7 7 0 00-7-7z"></path>
                    </svg>
                );
            case 'trust':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21s-6-4-6-10a6 6 0 1112 0c0 6-6 10-6 10z"></path>
                    </svg>
                );
            default:
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                );
        }
    };

    return (
        <section ref={sectionRef} className="py-32 bg-gradient-to-b from-[#122620] to-[#0a1a17] relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-5"></div>
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 0.1,
                            scale: 1,
                            transition: { duration: 1.5, ease: "easeOut" }
                        }
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D6AD60]/20 to-transparent blur-3xl"></div>
                </motion.div>
            </div>

            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                        }
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center mb-6">
                            {/* <div className="w-20 h-20 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaCertificate className="text-[#E5BE90] text-4xl" />
                        </div> */}
                        </div>
                        <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Why Choose Us</h2>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex justify-center items-center gap-4">
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#E5BE90]"
                                ></motion.span>
                                <p className="text-gray-400 tracking-wider">Most Trusted Name in Real Estate</p>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#E5BE90]"
                                ></motion.span>
                            </div>
                        </div>
                    </motion.div>
                    {/* <h2 className="text-5xl md:text-3xl lg:text-4xl font-source-serif text-[#F4EBD0] mb-8 leading-tight">
                        The Art of <span className="text-[#D6AD60]">Luxury</span> Living
                    </h2> */}
                    {/* <p className="text-[#F4EBD0]/80 font-montserrat text-lg max-w-3xl mx-auto leading-relaxed">
                        Experience the perfect blend of luxury, innovation, and unparalleled service that has made us the most trusted name in real estate
                    </p> */}
                </motion.div>

                {/* Main Content Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                >
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.id}
                            className="group"
                            variants={{
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                                },
                                hidden: { opacity: 0, y: 20 }
                            }}
                        >
                            <div className="bg-[#1a2f2a] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                                {/* Card Header with Image */}
                                <div className="relative h-48">
                                    <img
                                        src={reason.bgImageUrl}
                                        alt={reason.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a2f2a]"></div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-[#D6AD60]/10 flex items-center justify-center text-[#D6AD60]">
                                            {renderIcon(reason.icon)}
                                        </div>
                                        <h3 className="text-xl font-source-serif text-white font-semibold">{reason.title}</h3>
                                    </div>

                                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                                        {reason.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-[#D6AD60]/20">
                                        <div>
                                            <span className="text-3xl font-bold text-[#D6AD60] block">{reason.stat}</span>
                                            <span className="text-gray-400 text-sm uppercase tracking-wide">{reason.statText}</span>
                                        </div>
                                        <motion.button
                                            className="text-[#D6AD60] hover:text-white transition-colors duration-300"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                            </svg>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } } }}
                >
                    <div className="">
                        <h3 className="text-3xl md:text-4xl font-source-serif text-[#F4EBD0] mb-8">
                            Begin Your Journey to <span className="text-[#D6AD60]">Luxury Living</span>
                        </h3>
                        <Link
                            to="/about"
                            className="inline-block bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                        >
                            Learn More About Us
                        </Link>
                        {/* <motion.a
                            href="/contact"
                            className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#D6AD60] to-[#B38C3D] text-[#122620] font-montserrat font-semibold px-10 py-5 rounded-full hover:from-[#F4EBD0] hover:to-[#D6AD60] transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Schedule Your Private Consultation</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </motion.a> */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;