import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Portfolio = () => {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const properties = [
        {
            id: 1,
            title: "Luxury Villa",
            location: "Beverly Hills, CA",
            price: "$12.5M",
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2940&auto=format&fit=crop",
            size: "large",
            features: ["8 Beds", "12 Baths", "15,000 sqft"]
        },
        {
            id: 2,
            title: "Modern Penthouse",
            location: "Manhattan, NY",
            price: "$8.9M",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop",
            size: "medium",
            features: ["4 Beds", "5 Baths", "6,500 sqft"]
        },
        {
            id: 3,
            title: "Waterfront Estate",
            location: "Miami Beach, FL",
            price: "$15.2M",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
            size: "medium",
            features: ["6 Beds", "8 Baths", "12,000 sqft"]
        },
        {
            id: 4,
            title: "Mountain Retreat",
            location: "Aspen, CO",
            price: "$9.8M",
            image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop",
            size: "small",
            features: ["5 Beds", "6 Baths", "8,500 sqft"]
        },
        {
            id: 5,
            title: "Historic Mansion",
            location: "Charleston, SC",
            price: "$7.5M",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2940&auto=format&fit=crop",
            size: "small",
            features: ["7 Beds", "9 Baths", "10,000 sqft"]
        },
        {
            id: 6,
            title: "Tech Executive Home",
            location: "Silicon Valley, CA",
            price: "$18.3M",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop",
            size: "large",
            features: ["9 Beds", "11 Baths", "18,000 sqft"]
        },
        {
            id: 7,
            title: "Historic Mansion",
            location: "Charleston, SC",
            price: "$7.5M",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2940&auto=format&fit=crop",
            size: "small",
            features: ["7 Beds", "9 Baths", "10,000 sqft"]
        },
        {
            id: 8,
            title: "Historic Mansion",
            location: "Charleston, SC",
            price: "$7.5M",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2940&auto=format&fit=crop",
            size: "small",
            features: ["7 Beds", "9 Baths", "10,000 sqft"]
        },
        {
            id: 9,
            title: "Historic Mansion",
            location: "Charleston, SC",
            price: "$7.5M",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2940&auto=format&fit=crop",
            size: "small",
            features: ["7 Beds", "9 Baths", "10,000 sqft"]
        },
    ];

    const getGridClass = (size) => {
        switch (size) {
            case 'large':
                return 'col-span-2 row-span-2';
            case 'medium':
                return 'col-span-1 row-span-2';
            case 'small':
                return 'col-span-1 row-span-1';
            default:
                return 'col-span-1 row-span-1';
        }
    };

    return (
        <section ref={sectionRef} className="py-32 bg-gradient-to-b from-[#0a1a17] to-[#122620] relative overflow-hidden">
            {/* Brand Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <img src="/logo192.png" alt="ProjectEstate" className="w-64 h-64" />
            </div>

            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                {/* <motion.div
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
                            Our Portfolio
                        </h2>
                        <span className="inline-block w-16 h-1 bg-[#D6AD60]"></span>
                    </div>
                    <p className="text-[#F4EBD0]/90 font-montserrat text-lg max-w-3xl mx-auto leading-relaxed">
                        Discover our curated collection of exceptional properties, each representing the pinnacle of luxury living
                    </p>
                </motion.div> */}
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
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Our Portfolio</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                            <p className="text-gray-400">Discover our curated collection of exceptional properties</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>

                {/* Portfolio Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full mb-24"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                >
                    {properties.map((property) => (
                        <motion.div
                            key={property.id}
                            className={`group relative ${getGridClass(property.size)}`}
                            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }, hidden: { opacity: 0, y: 20 } }}
                        >
                            <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#F4EBD0]/5 backdrop-blur-sm border border-[#D6AD60]/20 shadow-xl hover:shadow-2xl hover:shadow-[#D6AD60]/10 transition-all duration-500">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#122620]/95 via-[#122620]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-2xl font-source-serif text-[#F4EBD0]">{property.title}</h3>
                                        <span className="text-[#D6AD60] font-montserrat font-semibold">{property.price}</span>
                                    </div>
                                    <p className="text-[#D6AD60] font-montserrat mb-4">{property.location}</p>
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {property.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#D6AD60]/10 backdrop-blur-sm border border-[#D6AD60]/20 rounded-full text-[#F4EBD0] text-sm"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button className="px-6 py-2.5 bg-[#D6AD60]/20 backdrop-blur-sm border border-[#D6AD60]/30 rounded-full text-[#F4EBD0] hover:bg-[#D6AD60]/30 transition-all duration-300 transform hover:scale-105">
                                            View Details
                                        </button>
                                        <button className="p-2.5 bg-[#D6AD60]/20 backdrop-blur-sm border border-[#D6AD60]/30 rounded-full text-[#F4EBD0] hover:bg-[#D6AD60]/30 transition-all duration-300 transform hover:scale-105">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                >
                    <div className="max-w-3xl mx-auto bg-[#F4EBD0]/5 backdrop-blur-sm border border-[#D6AD60]/20 rounded-2xl p-12 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-[#D6AD60]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#D6AD60]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

                        <h3 className="text-2xl md:text-3xl font-source-serif text-[#F4EBD0] mb-6 relative">
                            Ready to Find Your Dream Home?
                        </h3>
                        <p className="text-[#F4EBD0]/80 font-montserrat text-lg mb-8 relative">
                            Let us guide you through our exclusive collection of luxury properties and help you find the perfect match for your lifestyle.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
                            <a
                                href="/properties"
                                className="inline-block bg-gradient-to-r from-[#D6AD60] to-[#B38C3D] text-[#122620] font-montserrat font-semibold px-10 py-4 rounded-full hover:from-[#F4EBD0] hover:to-[#D6AD60] transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                            >
                                Explore All Properties
                            </a>
                            <a
                                href="/contact"
                                className="inline-block bg-transparent border-2 border-[#D6AD60] text-[#F4EBD0] font-montserrat font-semibold px-10 py-4 rounded-full hover:bg-[#D6AD60]/10 transition-all duration-500 transform hover:scale-105 text-lg"
                            >
                                Schedule a Viewing
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio; 