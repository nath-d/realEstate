import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const reasons = [
        {
            id: 1,
            title: "Unmatched Expertise",
            description: "With over two decades of industry leadership and a portfolio of successful transactions worth $2B+, our expertise speaks through results.",
            stat: "20+",
            statText: "Years of Excellence",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
            ),
            bgImg: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Luxury Portfolio",
            description: "Access to an exclusive collection of premium properties, each handpicked and vetted to meet our exceptional standards of luxury and value.",
            stat: "1000+",
            statText: "Luxury Properties",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
            ),
            bgImg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "White-Glove Service",
            description: "Experience our signature concierge-style service. From private viewings to personalized property matching, we deliver excellence at every step.",
            stat: "24/7",
            statText: "Dedicated Support",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            ),
            bgImg: "https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Innovation Leaders",
            description: "Pioneering the future of real estate with cutting-edge technology, virtual tours, and AI-powered property matching for a seamless experience.",
            stat: "100%",
            statText: "Digital Integration",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            ),
            bgImg: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "Market Authority",
            description: "Our deep market insights and data-driven approach ensure you make informed decisions that maximize your investment potential.",
            stat: "35%",
            statText: "Above Market Returns",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
            ),
            bgImg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "Trust & Recognition",
            description: "Award-winning service with countless accolades and a network of satisfied clients who trust us with their most valuable investments.",
            stat: "98%",
            statText: "Client Satisfaction",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
            ),
            bgImg: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop"
        }
    ];

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
                                        src={reason.bgImg}
                                        alt={reason.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a2f2a]"></div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-[#D6AD60]/10 flex items-center justify-center text-[#D6AD60]">
                                            {reason.icon}
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