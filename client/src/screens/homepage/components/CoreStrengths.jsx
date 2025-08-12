import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { getCoreStrengths } from '../../../services/coreStrengthService';

const CoreStrengths = ({ image, alt }) => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const [strengths, setStrengths] = useState([]);
    useEffect(() => { getCoreStrengths().then((items) => setStrengths(items || [])); }, []);

    const renderIcon = (iconKey) => {
        switch (iconKey) {
            case 'chart':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18M7 13l3 3 7-7"></path></svg>
                );
            case 'people':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                );
            case 'monitor':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18v12H3zM8 20h8"></path></svg>
                );
            case 'eye':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                );
            case 'bolt':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                );
            case 'check':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path></svg>
                );
            default:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path></svg>
                );
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-[#F4EBD0] relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D6AD60]"></div>
            <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>

            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
                        }
                    }}
                >
                    {/* <div className="inline-block mb-4">
                        <span className="inline-block w-16 h-1 bg-[#D6AD60] mb-2"></span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-source-serif text-[#122620] mb-4">
                            Our Core Strengths
                        </h2>
                        <span className="inline-block w-16 h-1 bg-[#D6AD60]"></span>
                    </div>
                    <p className="text-[#122620]/80 font-montserrat text-lg max-w-2xl mx-auto">
                        What sets us apart in the competitive real estate market
                    </p> */}
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
                        <h2 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">Our Core Strengths</h2>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex justify-center items-center gap-4">
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#D6AD60]"
                                ></motion.span>
                                <p className="text-[#122620]/80">What sets us apart in the competitive real estate market</p>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#D6AD60]"
                                ></motion.span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Image and Strengths Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Image */}
                    <motion.div
                        className="relative h-full min-h-[400px] order-2 lg:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.6, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }
                            }
                        }}
                    >
                        <div className="absolute inset-0 overflow-hidden rounded-lg shadow-xl">
                            <img
                                src={image}
                                alt={alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#122620]/80 to-transparent"></div>
                        </div>
                        <div className="absolute top-0 left-0 right-0 p-6">
                            <div className="bg-[#D6AD60] text-[#122620] font-montserrat font-medium px-6 py-3 rounded-md inline-block">
                                Excellence in Real Estate
                            </div>
                        </div>
                    </motion.div>

                    {/* Strengths Grid */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.6, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }
                            }
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {strengths.map((strength) => (
                                <motion.div
                                    key={strength.id}
                                    className="group"
                                    whileHover={{
                                        y: -5,
                                        transition: {
                                            duration: 0.3,
                                            ease: [0.6, -0.05, 0.01, 0.99]
                                        }
                                    }}
                                >
                                    <div className="flex flex-col p-6 bg-white border border-[#D6AD60]/20 rounded-lg hover:bg-[#F4EBD0]/10 transition-all duration-300 h-full">
                                        <div className="w-12 h-12 rounded-md bg-[#F4EBD0] flex items-center justify-center mb-4 group-hover:bg-[#D6AD60] group-hover:text-white transition-colors duration-300">
                                            {renderIcon(strength.icon)}
                                        </div>
                                        <h3 className="text-xl font-source-serif text-[#122620] mb-2">{strength.title}</h3>
                                        <p className="text-[#122620]/70 font-montserrat text-sm leading-relaxed">{strength.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                {/* <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
                        }
                    }}
                >
                    <a
                        href="/services"
                        className="inline-block bg-[#D6AD60] text-[#122620] font-montserrat font-medium px-10 py-4 rounded-md hover:bg-[#122620] hover:text-[#F4EBD0] transition-all duration-500 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        Explore Our Services
                    </a>
                </motion.div> */}
            </div>
        </section>
    );
};

export default CoreStrengths; 