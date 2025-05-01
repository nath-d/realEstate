import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

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
            rating: 5
        },
        {
            id: 2,
            name: "Priya Sharma",
            role: "Property Investor",
            image: "/person2.jpeg",
            quote: "As an investor, I need a platform I can trust. ProjectEstate has consistently delivered quality properties and excellent service. Their market insights have been invaluable for my investment decisions.",
            rating: 5
        },
        {
            id: 3,
            name: "Amit Patel",
            role: "First-time Buyer",
            image: "public/person1.jpeg",
            quote: "Being a first-time homebuyer, I was nervous about the process. The team at ProjectEstate guided me through every step, making it less daunting. Their expertise and patience were truly appreciated.",
            rating: 5
        },
        {
            id: 4,
            name: "Neha Gupta",
            role: "Property Seller",
            image: "/person3.jpeg",
            quote: "Selling my property through ProjectEstate was the best decision. They handled everything professionally and got me a great deal in record time. Highly recommend their services!",
            rating: 5
        },
        {
            id: 5,
            name: "Vikram Singh",
            role: "Real Estate Developer",
            // image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3",
            image: "/person1.jpeg",
            quote: "Working with ProjectEstate has been a game-changer for our projects. Their platform has helped us reach the right buyers and streamline our sales process significantly.",
            rating: 5
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
                    <div className="inline-block mb-4">
                        <span className="inline-block w-16 h-1 bg-[#122620] mb-2"></span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-source-serif text-[#122620] mb-4">
                            Client Testimonials
                        </h2>
                        <span className="inline-block w-16 h-1 bg-[#122620]"></span>
                    </div>
                    <p className="text-[#122620]/80 font-montserrat text-lg max-w-2xl mx-auto">
                        Hear from our satisfied clients about their experiences with ProjectEstate.
                    </p>
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">98%</h4>
                            <p className="text-[#122620]/80 font-montserrat text-sm">Satisfaction Rate</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">4.9/5</h4>
                            <p className="text-[#122620]/80 font-montserrat text-sm">Average Rating</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">10K+</h4>
                            <p className="text-[#122620]/80 font-montserrat text-sm">Happy Clients</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">85%</h4>
                            <p className="text-[#122620]/80 font-montserrat text-sm">Repeat Clients</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;