import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

    const timelineData = [
        {
            year: '2010',
            title: 'The Beginning',
            description: 'Founded with a vision to transform real estate in India, our journey began with a single office in Mumbai.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3'
        },
        {
            year: '2015',
            title: 'Expanding Horizons',
            description: 'Expanded operations to major metropolitan cities, establishing a strong presence in Delhi, Bangalore, and Chennai.',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3'
        },
        {
            year: '2020',
            title: 'Digital Transformation',
            description: 'Launched our innovative digital platform, revolutionizing property search and transactions in India.',
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3'
        },
        {
            year: '2023',
            title: 'Present Day',
            description: 'Today, we stand as a leading real estate platform, serving millions of customers across India.',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3'
        }
    ];

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
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Column - Image */}
                    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3"
                                alt="Our Office"
                                className="w-full h-[500px] object-cover rounded-lg shadow-xl"
                            />
                            <div className="absolute inset-0 bg-[#122620]/20 rounded-lg"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#122620] to-transparent rounded-b-lg">
                                <p className="text-[#D6AD60] font-montserrat text-sm">
                                    Our headquarters in Mumbai
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Text */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <h3 className="text-2xl md:text-3xl font-source-serif text-[#122620] mb-6">
                            Building Dreams, Creating Communities
                        </h3>
                        <p className="text-[#122620]/80 font-montserrat mb-6">
                            Founded in 2010, our journey began with a simple yet powerful vision: to transform the way people find, buy, and sell properties in India. What started as a small team of passionate individuals has grown into a nationwide movement.
                        </p>
                        <p className="text-[#122620]/80 font-montserrat mb-6">
                            We believe that every person deserves a place they can call home. Our mission is to make this dream accessible to everyone through innovative technology, transparent processes, and exceptional service.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">13+</h4>
                                <p className="text-[#122620]/80 font-montserrat text-sm">Years of Excellence</p>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">50K+</h4>
                                <p className="text-[#122620]/80 font-montserrat text-sm">Happy Customers</p>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-4xl font-source-serif text-[#D6AD60] mb-2">100+</h4>
                                <p className="text-[#122620]/80 font-montserrat text-sm">Cities Covered</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mt-20">
                    <h3 className="text-2xl md:text-3xl font-source-serif text-[#122620] mb-12 text-center">
                        Our Journey
                    </h3>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#D6AD60]/30"></div>

                        {/* Timeline Items */}
                        {timelineData.map((item, index) => (
                            <div
                                key={item.year}
                                className={`relative mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Content */}
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <h4 className="text-xl font-source-serif text-[#D6AD60] mb-2">{item.year}</h4>
                                        <h5 className="text-lg font-montserrat font-semibold text-[#122620] mb-2">{item.title}</h5>
                                        <p className="text-[#122620]/80 font-montserrat">{item.description}</p>
                                    </div>

                                    {/* Timeline Dot */}
                                    <div className="relative z-10">
                                        <div className="w-4 h-4 bg-[#D6AD60] rounded-full"></div>
                                    </div>

                                    {/* Image */}
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
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