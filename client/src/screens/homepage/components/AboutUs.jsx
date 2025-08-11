import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import aboutService from '../../../services/aboutService';

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        const checkInitialVisibility = () => {
            if (sectionRef.current && !hasAnimatedRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;

                if (isInView) {
                    setIsVisible(true);
                    hasAnimatedRef.current = true;
                }
            }
        };

        const initialCheckTimer = setTimeout(checkInitialVisibility, 100);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimatedRef.current) {
                    setIsVisible(true);
                    hasAnimatedRef.current = true;
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '-100px 0px 0px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            clearTimeout(initialCheckTimer);
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const [content, setContent] = useState(null);
    const [timelineData, setTimelineData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        aboutService.getContent().then((data) => {
            if (!isMounted) return;
            setContent(data);
            setTimelineData(data.timelineItems || []);
        }).catch(() => {
            // ignore errors; keep defaults
        });
        return () => { isMounted = false; };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-[#F4EBD0] relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#122620]/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#122620]/10"></div>
            <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>

            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                {/* <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block mb-4">
                        <span className="inline-block w-16 h-1 bg-[#122620] mb-2"></span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-source-serif text-[#122620] mb-4">
                            Our Story
                        </h2>
                        <span className="inline-block w-16 h-1 bg-[#122620]"></span>
                    </div>
                    <p className="text-[#122620]/80 font-montserrat text-lg max-w-2xl mx-auto">
                        A journey of excellence, innovation, and unwavering commitment to transforming real estate in India.
                    </p>
                </div> */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        {/* <div className="w-20 h-20 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                <FaHome className="text-[#E5BE90] text-4xl" />
                            </div> */}
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">{content?.headerTitle || 'Our Story'}</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                            <p className="text-[#122620]/80">{content?.headerSubtitle || ' A journey of excellence, innovation, and unwavering commitment'}</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Column - Image */}
                    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className="relative">
                            <img
                                src={content?.heroImageUrl || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3'}
                                alt="Our Office"
                                className="w-full h-[500px] object-cover rounded-lg shadow-xl"
                                loading="lazy"
                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/1000x500?text=Image+unavailable'; }}
                            />
                            <div className="absolute inset-0 bg-[#122620]/20 rounded-lg"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#122620] to-transparent rounded-b-lg">
                                {content?.heroImageCaption && (
                                    <p className="text-[#D6AD60] font-montserrat text-sm">{content.heroImageCaption}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Text */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <h3 className="text-2xl md:text-3xl font-source-serif text-[#122620] mb-6">
                            {content?.rightHeading || 'Building Dreams, Creating Communities'}
                        </h3>
                        {content?.rightParagraph1 && (
                            <p className="text-[#122620]/80 font-montserrat mb-6">{content.rightParagraph1}</p>
                        )}
                        {content?.rightParagraph2 && (
                            <p className="text-[#122620]/80 font-montserrat mb-6">{content.rightParagraph2}</p>
                        )}
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">{content?.stat1Value || '13+'}</h4>
                                <p className="text-[#122620]/80 font-montserrat text-sm">{content?.stat1Label || 'Years of Excellence'}</p>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">{content?.stat2Value || '50K+'}</h4>
                                <p className="text-[#122620]/80 font-montserrat text-sm">{content?.stat2Label || 'Happy Customers'}</p>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">{content?.stat3Value || '100+'}</h4>
                                <p className="text-[#122620]/80 font-montserrat text-sm">{content?.stat3Label || 'Cities Covered'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mt-20">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-source-serif text-[#122620] mb-12 text-center"
                    >
                        Our Journey
                    </motion.h3>
                    <div className="relative">
                        {/* Timeline Line */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#D6AD60]/30"
                        ></motion.div>

                        {/* Timeline Items */}
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="relative mb-12"
                            >
                                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                                        className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                                    >
                                        <h4 className="text-xl font-source-serif text-[#D6AD60] mb-2">{item.year}</h4>
                                        <h5 className="text-lg font-montserrat font-semibold text-[#122620] mb-2">{item.title}</h5>
                                        <p className="text-[#122620]/80 font-montserrat">{item.description}</p>
                                    </motion.div>

                                    {/* Timeline Dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: index * 0.2 + 0.4
                                        }}
                                        className="relative z-10"
                                    >
                                        <div className="w-4 h-4 bg-[#D6AD60] rounded-full"></div>
                                    </motion.div>

                                    {/* Image */}
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                                        className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}
                                    >
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                            src={item.imageUrl || item.image || 'https://via.placeholder.com/800x300?text=Timeline+image'}
                                            alt={item.title}
                                            className="w-full h-48 object-cover rounded-lg shadow-md"
                                            loading="lazy"
                                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x300?text=Timeline+image'; }}
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link
                        to="/about"
                        className="inline-block bg-transparent border-2 border-[#122620] text-[#122620] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                    >
                        Learn More About Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutUs; 