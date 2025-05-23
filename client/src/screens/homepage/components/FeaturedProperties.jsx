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

const properties = [
    {
        id: 1,
        title: "Luxury Villa",
        // image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3",
        image: "/propertyOne.jpg",
        price: "2,50,00,000",
        location: "Beverly Hills, CA",
        featured: true,
        specs: {
            beds: 1,
            baths: 3,
            sqft: 3500
        }
    },
    {
        id: 2,
        title: "Modern Apartment",
        // image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
        image: "/propertyOne.jpg",
        price: "1,20,00,000",
        location: "Downtown, NY",
        featured: false,
        specs: {
            beds: 2,
            baths: 2,
            sqft: 1200
        }
    },
    {
        id: 3,
        title: "Beachfront House",
        // image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3",
        image: "/propertyTwo.jpg",
        price: "3,75,00,000",
        location: "Miami Beach, FL",
        featured: true,
        specs: {
            beds: 3,
            baths: 4,
            sqft: 4200
        }
    },
    {
        id: 4,
        title: "Mountain View Cabin",
        // image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
        image: "/propertyThree.jpg",
        price: "1,85,00,000",
        location: "Aspen, CO",
        featured: false,
        specs: {
            beds: 4,
            baths: 2,
            sqft: 1800
        }
    },
    {
        id: 5,
        title: "City Penthouse",
        // image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
        image: "/propertyFour.jpg",
        price: "4,20,00,000",
        location: "Chicago, IL",
        featured: true,
        specs: {
            beds: 5,
            baths: 3,
            sqft: 2800
        }
    },
    {
        id: 6,
        title: "Luxury Condo",
        // image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
        image: "/propertyTwo.jpg",
        price: "3,90,00,000",
        location: "San Francisco, CA",
        featured: false,
        specs: {
            beds: 6,
            baths: 2,
            sqft: 2200
        }
    },
    {
        id: 7,
        title: "Waterfront Estate",
        // image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
        image: "/propertyThree.jpg",
        price: "5,50,00,000",
        location: "Seattle, WA",
        featured: true,
        specs: {
            beds: 7,
            baths: 5,
            sqft: 4800
        }
    }
];

const FeaturedProperties = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const hasAnimatedRef = useRef(false);
    const swiperRef = useRef(null);

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
                    {/* <div className="inline-block mb-4">
                        <span className="inline-block w-16 h-1 bg-[#122620] mb-2"></span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-source-serif text-[#122620] mb-4">
                            Featured Properties
                        </h2>
                        <span className="inline-block w-16 h-1 bg-[#122620]"></span>
                    </div>
                    <p className="text-[#122620]/80 font-montserrat text-lg max-w-2xl mx-auto">
                        Discover our exclusive collection of premium real estate, each property carefully selected to meet the highest standards of luxury and comfort.
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
                        <h2 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">Featured Properties</h2>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex justify-center items-center gap-4">
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#122620]"
                                ></motion.span>
                                <p className="text-[#122620]/80">Discover our exclusive collection of premium real estate</p>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    transition={{ duration: 0.8 }}
                                    className="h-0.5 bg-[#122620]"
                                ></motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {featuredProperty && (
                    <div className={`mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                        <FeaturedPropertyCard
                            property={featuredProperty}
                            handleImageError={handleImageError}
                        />
                    </div>
                )}

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