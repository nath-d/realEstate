import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { FaCertificate, FaHome } from 'react-icons/fa';

import PropertyCard from './PropertyCard';
import FeaturedPropertyCard from './FeaturedPropertyCard';
import { propertyService } from '../../../services/propertyService';

const FeaturedProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const hasAnimatedRef = useRef(false);
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await propertyService.getFeaturedProperties();
                setProperties(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching featured properties:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

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

    const handleImageError = (e) => {
        e.target.src = 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';
    };

    const featuredProperty = properties.find(p => p.featured);

    const swiperStyles = `
      .swiper-button-prev, .swiper-button-next {
        background-color: #122620;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #D6AD60;
        transition: all 0.3s ease;
      }
      
      .swiper-button-prev:hover, .swiper-button-next:hover {
        background-color: #D6AD60;
      }
      
      .swiper-button-prev:hover svg, .swiper-button-next:hover svg {
        stroke: #122620;
      }
      
      .swiper-button-prev:after, .swiper-button-next:after {
        display: none;
      }
      
      .swiper-pagination-bullet {
        width: 10px;
        height: 10px;
        background: #122620;
        opacity: 0.5;
        transition: all 0.3s ease;
      }
      
      .swiper-pagination-bullet-active {
        background: #D6AD60;
        opacity: 1;
        width: 12px;
        height: 12px;
      }
    `;

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-[#F4EBD0] relative overflow-hidden"
        >
            <style>{swiperStyles}</style>
            <div className="absolute top-0 left-0 w-full h-1 bg-[#122620]/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#122620]/10"></div>
            <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-[#D6AD60]/5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center mb-6">
                        </div>
                        <h2 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">Featured Properties</h2>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex justify-center items-center gap-4">
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#D6AD60]"
                                ></motion.span>
                                <p className="text-[#122620]/80">Discover our exclusive collection of premium real estate</p>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#D6AD60]"
                                ></motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D6AD60]"></div>
                        <p className="mt-4 text-[#122620]/80">Loading featured properties...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-600 mb-4">Error loading properties: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-[#D6AD60] text-[#122620] px-6 py-2 rounded hover:bg-[#C19A4F] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && featuredProperty && (
                    <div className={`mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <FeaturedPropertyCard
                            property={featuredProperty}
                            handleImageError={handleImageError}
                        />
                    </div>
                )}

                {!loading && !error && properties.length > 0 && (
                    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '200ms' }}>
                        <div className="w-full overflow-hidden px-2">
                            <Swiper
                                ref={swiperRef}
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                loop={true}
                                slidesPerView={'auto'}
                                speed={1200}
                                preloadImages={true}
                                observer={true}
                                observeParents={true}
                                touchRatio={1}
                                touchAngle={45}
                                initialSlide={Math.floor(properties.length / 2)}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: -30,
                                    depth: 60,
                                    modifier: 1.5,
                                    slideShadows: false,
                                }}
                                pagination={{
                                    el: '.swiper-pagination',
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                    clickable: true,
                                    hideOnClick: false,
                                }}
                                modules={[EffectCoverflow, Pagination, Navigation, Virtual]}
                                className="swiper_container py-10"
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 0,
                                        centeredSlides: true,
                                    },
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 0,
                                        centeredSlides: true,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 0,
                                        centeredSlides: true,
                                    }
                                }}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                            >
                                {properties.map((property) => (
                                    <SwiperSlide key={property.id} className="max-w-[480px] mb-8 px-1">
                                        <PropertyCard
                                            property={property}
                                            handleImageError={handleImageError}
                                        />
                                    </SwiperSlide>
                                ))}

                                <div className="slider-controler">
                                    <div className="swiper-button-prev slider-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#D6AD60" strokeWidth="2">
                                            <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                    </div>
                                    <div className="swiper-button-next slider-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#D6AD60" strokeWidth="2">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </div>
                                    <div className='flex justify-center items-center mt-4 space-x-2'>
                                        <div className="swiper-pagination"></div>
                                    </div>
                                </div>
                            </Swiper>
                        </div>
                    </div>
                )}

                {!loading && !error && properties.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-[#122620]/80">No featured properties available at the moment.</p>
                    </div>
                )}

                <div className={`text-center mt-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
                    <Link
                        to="/properties"
                        className="inline-block bg-transparent border-2 border-[#122620] text-[#122620] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                    >
                        View All Properties
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;