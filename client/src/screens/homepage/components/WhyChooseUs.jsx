import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const WhyChooseUs = ({ image, alt }) => {
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
            {/* Brand Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <img src="/logo192.png" alt="ProjectEstate" className="w-64 h-64" />
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
                    <div className="inline-block mb-4">
                        <span className="inline-block w-16 h-1 bg-[#D6AD60] mb-2"></span>
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-source-serif text-[#F4EBD0] mb-4 italic">
                            Why Choose Us?
                        </h2>
                        <span className="inline-block w-16 h-1 bg-[#D6AD60]"></span>
                    </div>
                    <p className="text-[#F4EBD0]/90 font-montserrat text-lg max-w-3xl mx-auto leading-relaxed">
                        Experience the perfect blend of luxury, innovation, and unparalleled service that has made us the most trusted name in real estate
                    </p>
                    <p className="italic text-[#D6AD60]/70 font-parisienne text-4xl mt-12 p-4">
                        "Setting the Standard in Luxury Real Estate"
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-full"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                >
                    {/* Feature 1 - Large */}
                    <motion.div
                        className="col-span-1 md:col-span-2 row-span-2"
                        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }, hidden: { opacity: 0, y: 20 } }}
                    >
                        <div className="group relative flex flex-col overflow-hidden rounded-xl px-6 pb-8 pt-40 h-full bg-[#F4EBD0]/5 backdrop-blur-sm border border-[#D6AD60]/20 shadow-xl hover:shadow-2xl hover:shadow-[#D6AD60]/10 transition-all duration-500">
                            <img
                                src={reasons[0].bgImg}
                                alt={reasons[0].title}
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#122620]/90 to-[#0a1a17]/90"></div>

                            <div className="z-10 flex flex-col h-full justify-end">
                                <div className="mt-auto">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-[#D6AD60]/20 backdrop-blur-sm flex items-center justify-center text-[#D6AD60] mr-4">
                                            {reasons[0].icon}
                                        </div>
                                        <h3 className="text-3xl font-source-serif text-[#F4EBD0]">{reasons[0].title}</h3>
                                    </div>
                                    <p className="text-[#F4EBD0]/90 font-montserrat text-lg mb-6">{reasons[0].description}</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-4xl font-bold text-[#D6AD60]">{reasons[0].stat}</span>
                                        <span className="text-[#F4EBD0]/80 text-sm uppercase tracking-wide">{reasons[0].statText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        className="col-span-1 md:col-span-2 row-span-1"
                        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }, hidden: { opacity: 0, y: 20 } }}
                    >
                        <div className="group relative flex flex-col overflow-hidden rounded-xl px-6 pb-8 pt-40 h-full bg-[#F4EBD0]/5 backdrop-blur-sm border border-[#D6AD60]/20 shadow-xl hover:shadow-2xl hover:shadow-[#D6AD60]/10 transition-all duration-500">
                            <img
                                src={reasons[1].bgImg}
                                alt={reasons[1].title}
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#122620]/90 to-[#0a1a17]/90"></div>

                            <div className="z-10 flex flex-col h-full justify-end">
                                <div className="mt-auto">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#D6AD60]/20 backdrop-blur-sm flex items-center justify-center text-[#D6AD60] mr-3">
                                            {reasons[1].icon}
                                        </div>
                                        <h3 className="text-2xl font-source-serif text-[#F4EBD0]">{reasons[1].title}</h3>
                                    </div>
                                    <p className="text-[#F4EBD0]/90 font-montserrat text-base mb-4">{reasons[1].description}</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold text-[#D6AD60]">{reasons[1].stat}</span>
                                        <span className="text-[#F4EBD0]/80 text-sm uppercase tracking-wide">{reasons[1].statText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Features 3-4 (Grid) */}
                    <motion.div
                        className="col-span-1 md:col-span-2 row-span-1"
                        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }, hidden: { opacity: 0, y: 20 } }}
                    >
                        <div className="grid grid-cols-2 gap-6 h-full">
                            {[2, 3].map(index => (
                                <div key={reasons[index].id} className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-6 pt-36 bg-[#F4EBD0]/5 backdrop-blur-sm border border-[#D6AD60]/20 shadow-xl hover:shadow-2xl hover:shadow-[#D6AD60]/10 transition-all duration-500">
                                    <img
                                        src={reasons[index].bgImg}
                                        alt={reasons[index].title}
                                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#122620]/90 to-[#0a1a17]/90"></div>

                                    <div className="z-10 flex flex-col h-full justify-end">
                                        <div className="mt-auto">
                                            <div className="flex items-center mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-[#D6AD60]/20 backdrop-blur-sm flex items-center justify-center text-[#D6AD60] mr-2">
                                                    {reasons[index].icon}
                                                </div>
                                                <h3 className="text-xl font-source-serif text-[#F4EBD0]">{reasons[index].title}</h3>
                                            </div>
                                            <p className="text-[#F4EBD0]/90 font-montserrat text-sm mb-3 line-clamp-2">{reasons[index].description}</p>
                                            <div className="flex items-baseline space-x-2">
                                                <span className="text-2xl font-bold text-[#D6AD60]">{reasons[index].stat}</span>
                                                <span className="text-[#F4EBD0]/80 text-xs uppercase tracking-wide">{reasons[index].statText}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Feature 5 */}
                    <motion.div
                        className="col-span-1 md:col-span-1 row-span-1"
                        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }, hidden: { opacity: 0, y: 20 } }}
                    >
                        <div className="group relative flex flex-col overflow-hidden rounded-xl px-4 pb-6 pt-36 h-full bg-[#F4EBD0]/5 backdrop-blur-sm border border-[#D6AD60]/20 shadow-xl hover:shadow-2xl hover:shadow-[#D6AD60]/10 transition-all duration-500">
                            <img
                                src={reasons[4].bgImg}
                                alt={reasons[4].title}
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#122620]/90 to-[#0a1a17]/90"></div>

                            <div className="z-10 flex flex-col h-full justify-end">
                                <div className="mt-auto">
                                    <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#D6AD60]/20 backdrop-blur-sm flex items-center justify-center text-[#D6AD60] mr-2">
                                            {reasons[4].icon}
                                        </div>
                                        <h3 className="text-xl font-source-serif text-[#F4EBD0]">{reasons[4].title}</h3>
                                    </div>
                                    <p className="text-[#F4EBD0]/90 font-montserrat text-sm mb-3 line-clamp-3">{reasons[4].description}</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-2xl font-bold text-[#D6AD60]">{reasons[4].stat}</span>
                                        <span className="text-[#F4EBD0]/80 text-xs uppercase tracking-wide">{reasons[4].statText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 6 */}
                    <motion.div
                        className="col-span-1 md:col-span-3 row-span-1"
                        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }, hidden: { opacity: 0, y: 20 } }}
                    >
                        <div className="group relative flex flex-col overflow-hidden rounded-xl px-6 pb-8 pt-40 h-full bg-[#F4EBD0]/5 backdrop-blur-sm border border-[#D6AD60]/20 shadow-xl hover:shadow-2xl hover:shadow-[#D6AD60]/10 transition-all duration-500">
                            <img
                                src={reasons[5].bgImg}
                                alt={reasons[5].title}
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#122620]/90 to-[#0a1a17]/90"></div>

                            <div className="z-10 flex flex-col h-full justify-end">
                                <div className="mt-auto">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#D6AD60]/20 backdrop-blur-sm flex items-center justify-center text-[#D6AD60] mr-3">
                                            {reasons[5].icon}
                                        </div>
                                        <h3 className="text-2xl font-source-serif text-[#F4EBD0]">{reasons[5].title}</h3>
                                    </div>
                                    <p className="text-[#F4EBD0]/90 font-montserrat text-base mb-4">{reasons[5].description}</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold text-[#D6AD60]">{reasons[5].stat}</span>
                                        <span className="text-[#F4EBD0]/80 text-sm uppercase tracking-wide">{reasons[5].statText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-28"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                >
                    <h3 className="text-2xl md:text-3xl font-source-serif text-[#F4EBD0] mb-6">
                        Ready to Redefine Luxury Living?
                    </h3>
                    <a
                        href="/contact"
                        className="inline-block bg-gradient-to-r from-[#D6AD60] to-[#B38C3D] text-[#122620] font-montserrat font-semibold px-14 py-6 rounded-full hover:from-[#F4EBD0] hover:to-[#D6AD60] transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-2xl text-lg"
                    >
                        Schedule Your Private Consultation
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;