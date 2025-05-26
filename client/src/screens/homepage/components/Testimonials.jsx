import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Trust Indicator Card Component
const TrustIndicatorCard = ({ icon, value, label }) => {
    return (
        <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="border-2 border-[#D6AD60] absolute inset-0 bg-gradient-to-tl from-[#D6AD60]/20 to-transparent rounded-2xl transform transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D6AD60]/30 flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-12">
                    {icon}
                </div>
                <h4 className="text-5xl font-source-serif text-[#D6AD60] mb-3 font-bold">{value}</h4>
                <p className="text-[#122620] font-montserrat text-base font-medium">{label}</p>
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const testimonials = [
        {
            id: 1,
            name: "Rajesh Kumar",
            role: "Homeowner",
            image: "/person1.jpeg",

            quote: "Finding our dream home was a breeze with ProjectEstate. The team's dedication and attention to detail made the entire process smooth and enjoyable. We couldn't be happier with our new home!",
            rating: 3
        },
        {
            id: 2,
            name: "Priya Sharma",
            role: "Property Investor",
            image: "/person2.jpeg",
            quote: "As an investor, I need a platform I can trust. ProjectEstate has consistently delivered quality properties and excellent service. Their market insights have been invaluable for my investment decisions.",
            rating: 2
        },
        {
            id: 3,
            name: "Amit Patel",
            role: "First-time Buyer",
            image: "/person1.jpeg",
            quote: "Being a first-time homebuyer, I was nervous about the process. The team at ProjectEstate guided me through every step, making it less daunting. Their expertise and patience were truly appreciated.",
            rating: 5
        },
        {
            id: 4,
            name: "Neha Gupta",
            role: "Property Seller",
            image: "/person3.jpeg",
            quote: "Selling my property through ProjectEstate was the best decision. They handled everything professionally and got me a great deal in record time. Highly recommend their services!",
            rating: 4.5
        },
        {
            id: 5,
            name: "Vikram Singh",
            role: "Real Estate Developer",
            image: "/person1.jpeg",
            quote: "Working with ProjectEstate has been a game-changer for our projects. Their platform has helped us reach the right buyers and streamline our sales process significantly.",
            rating: 4
        }
    ];

    // Optimized: Only duplicate once if needed
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${index < rating ? 'text-[#D6AD60]' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    // Optimized testimonial card component to reduce re-renders
    const TestimonialCard = React.memo(({ testimonial }) => {
        return (
            <motion.div
                className="flex-shrink-0 w-[350px] bg-white p-6 rounded-lg shadow-lg mr-2"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            loading="lazy" // Add lazy loading
                        />
                    </div>
                    <div>
                        <h4 className="text-lg font-montserrat font-semibold text-[#122620]">{testimonial.name}</h4>
                        <p className="text-[#122620]/70 font-montserrat text-sm">{testimonial.role}</p>
                    </div>
                </div>

                <div className="flex mb-3">
                    {renderStars(testimonial.rating)}
                </div>

                <blockquote className="text-[#122620]/80 font-montserrat italic text-sm">
                    "{testimonial.quote.substring(0, 150)}..."
                </blockquote>
            </motion.div>
        );
    });

    // Trust Indicators Data
    const trustIndicators = [
        {
            id: 1,
            value: "98%",
            label: "Satisfaction Rate",
            icon: (
                <svg className="w-8 h-8 text-[#122620]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
            )
        },
        {
            id: 2,
            value: "4.9/5",
            label: "Average Rating",
            icon: (
                <svg className="w-8 h-8 text-[#122620]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
            )
        },
        {
            id: 3,
            value: "10K+",
            label: "Happy Clients",
            icon: (
                <svg className="w-8 h-8 text-[#122620]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            )
        },
        {
            id: 4,
            value: "85%",
            label: "Repeat Clients",
            icon: (
                <svg className="w-8 h-8 text-[#122620]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            )
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-[#F4EBD0] relative overflow-hidden h-screen"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#122620]/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#122620]/10"></div>
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
                        <h2 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">Client Testimonials</h2>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex justify-center items-center gap-4">
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#D6AD60]"
                                ></motion.span>
                                <p className="text-[#122620]/80">What our clients say about us</p>
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

                {/* Optimized Infinite Scrolling Testimonials */}
                <motion.div
                    className="relative overflow-hidden py-10"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            transition: { duration: 0.6, delay: 0.2 }
                        }
                    }}
                >
                    <div className="relative">
                        {/* First row - scrolling left */}
                        <div className="flex mb-6 overflow-hidden">
                            <motion.div
                                className="flex"
                                animate={{
                                    x: [0, -1000],
                                }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 40, // Slower duration for better performance
                                        ease: "linear",
                                    }
                                }}
                            >
                                {duplicatedTestimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={`left-${testimonial.id}-${index}`}
                                        testimonial={testimonial}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Second row - scrolling right */}
                        {/* <div className="flex overflow-hidden">
                            <motion.div
                                className="flex"
                                animate={{
                                    x: [-1000, 0],
                                }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 40, // Slower duration for better performance
                                        ease: "linear",
                                    }
                                }}
                            >
                                {duplicatedTestimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={`right-${testimonial.id}-${index}`}
                                        testimonial={testimonial}
                                    />
                                ))}
                            </motion.div>
                        </div> */}
                    </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }
                        }
                    }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                        {trustIndicators.map((indicator) => (
                            <TrustIndicatorCard
                                key={indicator.id}
                                icon={indicator.icon}
                                value={indicator.value}
                                label={indicator.label}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;