import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { propertyService } from '../../../services/propertyService';
import { cloudinaryService } from '../../../services/cloudinaryService';

const Portfolio = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const hasAnimatedRef = useRef(false);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            console.log('Portfolio: Fetching properties from API...');
            const data = await propertyService.getAllProperties();
            console.log('Portfolio: API response:', data);

            // Check if we have data
            if (!data || data.length === 0) {
                console.log('Portfolio: No properties found in API, using fallback data');
                // Use fallback sample data when no properties are available
                const fallbackProperties = [
                    {
                        id: 1,
                        title: "Luxury Villa",
                        location: "Beverly Hills, CA",
                        price: "$12.5M",
                        image: "/propertyTwo.jpg",
                        size: "large",
                        features: ["8 Beds", "12 Baths", "15,000 sqft"]
                    }
                ];
                setProperties(fallbackProperties);
                return;
            }

            // Take only the first 7 properties for the portfolio grid
            const portfolioProperties = data.slice(0, 7).map((property, index) => ({
                ...property,
                // Assign sizes based on index to create a nice grid layout
                size: index === 0 ? 'large' : index === 1 || index === 2 ? 'medium' : 'small',
                // Format features from property data
                features: [
                    `${property.bedrooms} Beds`,
                    `${property.bathrooms} Baths`,
                    property.livingArea
                ],
                // Format price
                price: `$${property.price?.toLocaleString() || 'Price on request'}`,
                // Format location
                location: property.location ? `${property.location.city}, ${property.location.state}` : 'Location not specified',
                // Get first image or fallback
                image: property.images && property.images.length > 0
                    ? property.images[0].url
                    : 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
            }));
            console.log('Portfolio: Processed properties:', portfolioProperties);
            setProperties(portfolioProperties);
        } catch (error) {
            console.error('Portfolio: Error fetching properties:', error);
            console.log('Portfolio: Using fallback data due to API error');
            // Use fallback data when API fails
            const fallbackProperties = [
                {
                    id: 1,
                    title: "Luxury Villa",
                    location: "Beverly Hills, CA",
                    price: "$12.5M",
                    image: "/propertyTwo.jpg",
                    size: "large",
                    features: ["8 Beds", "12 Baths", "15,000 sqft"]
                }

            ];
            setProperties(fallbackProperties);
            setError(null); // Clear error since we're using fallback data
        } finally {
            setLoading(false);
        }
    };

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

    const getOptimizedImageUrl = (imageUrl) => {
        if (!cloudinaryService.isCloudinaryUrl(imageUrl)) {
            return imageUrl;
        }
        // Use low credit thumbnail for portfolio grid
        return cloudinaryService.getLowCreditThumbnailUrl(imageUrl, 400, 300);
    };

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

    if (loading) {
        return (
            <section className="py-32 bg-gradient-to-b from-[#0a1a17] to-[#122620] relative overflow-hidden">
                <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D6AD60] mx-auto"></div>
                        <p className="text-[#F4EBD0] mt-4">Loading portfolio...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-32 bg-gradient-to-b from-[#0a1a17] to-[#122620] relative overflow-hidden">
                <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <p className="text-red-400">{error}</p>
                        <button
                            onClick={fetchProperties}
                            className="mt-4 px-6 py-2 bg-[#D6AD60] text-[#122620] rounded hover:bg-[#E5BE90] transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-32 bg-gradient-to-b from-[#0a1a17] to-[#122620] relative overflow-hidden">
            {/* Debug info - remove this later */}
            {console.log('Portfolio render - properties length:', properties.length)}
            {console.log('Portfolio render - properties:', properties)}

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
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 h-full mb-24 transition-all duration-1000 ${properties.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    {properties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            className={`group relative ${property.size === 'large' ? 'sm:col-span-2 lg:col-span-2 sm:row-span-2 lg:row-span-2' :
                                property.size === 'medium' ? 'sm:col-span-1 lg:col-span-1 sm:row-span-2 lg:row-span-2' :
                                    'sm:col-span-1 lg:col-span-1 sm:row-span-1 lg:row-span-1'}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <div className="relative h-[300px] sm:h-full w-full overflow-hidden rounded-xl bg-[#F4EBD0]/5 backdrop-blur-sm border border-[#D6AD60]/20 shadow-xl hover:shadow-2xl hover:shadow-[#D6AD60]/10 transition-all duration-500">
                                <img
                                    src={getOptimizedImageUrl(property.image)}
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
                                        {property.id && property.id > 0 ? (
                                            <Link
                                                to={`/propertyDet?id=${property.id}`}
                                                className="px-6 py-2.5 bg-[#D6AD60]/20 backdrop-blur-sm border border-[#D6AD60]/30 rounded-full text-[#F4EBD0] hover:bg-[#D6AD60]/30 transition-all duration-300 transform hover:scale-105"
                                            >
                                                View Details
                                            </Link>
                                        ) : (
                                            <button
                                                className="px-6 py-2.5 bg-[#D6AD60]/20 backdrop-blur-sm border border-[#D6AD60]/30 rounded-full text-[#F4EBD0] hover:bg-[#D6AD60]/30 transition-all duration-300 transform hover:scale-105"
                                                onClick={() => window.location.href = '/properties'}
                                            >
                                                View All Properties
                                            </button>
                                        )}
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
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center"
                >
                    <div className="max-w-3xl mx-auto bg-[#F4EBD0]/5 backdrop-blur-sm border-4 border-[#D6AD60]/20 rounded-none p-12 relative overflow-hidden">
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
                            <Link
                                to="/properties"
                                className="inline-block bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                            >
                                View All Properties
                            </Link>
                            <Link
                                to="/properties"
                                className="inline-block bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                            >
                                Schedule a Viewing
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio; 