import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [isChanging, setIsChanging] = useState(false);

    const images = [
        'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1920',
    ];

    const textContent = [
        {
            title: "MG Pacific Estates",
            subtitle: "Luxury Living Redefined"
        },
        {
            title: "Exclusive Properties",
            subtitle: "Where Dreams Meet Reality"
        },
        {
            title: "Premium Locations",
            subtitle: "Discover Your Perfect Home"
        },
        {
            title: "Elegant Design",
            subtitle: "Where Sophistication Meets Comfort"
        },
        {
            title: "Timeless Luxury",
            subtitle: "Experience Exceptional Living"
        }
    ];

    const handleSlideChange = useCallback((dir) => {
        if (isChanging) return;

        setIsChanging(true);
        setDirection(dir);

        requestAnimationFrame(() => {
            setTimeout(() => {
                setCurrentIndex((prev) => {
                    if (dir === 'next') {
                        return (prev + 1) % Math.max(images.length, textContent.length);
                    } else {
                        return (prev - 1 + Math.max(images.length, textContent.length)) % Math.max(images.length, textContent.length);
                    }
                });

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        setIsChanging(false);
                    }, 50);
                });
            }, 600);
        });
    }, [isChanging, images.length, textContent.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            handleSlideChange('next');
        }, 8000);

        return () => clearInterval(timer);
    }, [handleSlideChange]);

    const nextSlide = () => {
        handleSlideChange('next');
    };

    const prevSlide = () => {
        handleSlideChange('prev');
    };

    // Get current content indices
    const imageIndex = currentIndex % images.length;
    const textIndex = currentIndex % textContent.length;

    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#122620]">
            {/* Carousel */}
            <div className="relative h-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-[2000ms] ease-out will-change-transform will-change-opacity ${index === imageIndex
                            ? 'opacity-100 translate-z-0'
                            : 'opacity-0 translate-z-0'
                            }`}
                    >
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/70 z-10 transition-opacity duration-[2000ms]"></div>

                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[3000ms] ease-out will-change-transform"
                            style={{
                                backgroundImage: `url(${image})`,
                                transform: index === imageIndex ? 'scale(1.05)' : 'scale(1)'
                            }}
                        ></div>
                    </div>
                ))}

                {/* Dynamic Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 sm:px-6 md:px-8">
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-white font-source-serif tracking-wide font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] animate-text opacity-0 px-4 sm:px-8 md:px-12 lg:px-16"
                        style={{
                            animation: isChanging
                                ? 'textChange 2s cubic-bezier(0.4, 0, 0.2, 1)'
                                : 'fadeInUpSlow 2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                        }}
                    >
                        {textContent[textIndex].title}
                    </h1>
                    <div className="h-[3.5rem] sm:h-[4rem] md:h-[4.5rem] mb-4 sm:mb-6 md:mb-8 relative flex items-center justify-center w-full max-w-3xl mx-auto">
                        <p
                            className="text-lg sm:text-xl md:text-2xl text-[#D6AD60] font-montserrat tracking-wider font-normal drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] animate-text opacity-0 w-full px-4 sm:px-8"
                            style={{
                                animation: isChanging
                                    ? 'subtitleChange 2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                                    : 'fadeInUpSlow 2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards',
                                visibility: isChanging ? 'hidden' : 'visible'
                            }}
                        >
                            {textContent[textIndex].subtitle}
                        </p>
                    </div>
                    <Link
                        to="/properties"
                        className="bg-transparent backdrop-blur-sm border-2 border-[#D6AD60] text-[#D6AD60] px-6 sm:px-8 py-3 sm:py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-normal tracking-widest text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                    >
                        Explore Properties
                    </Link>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white/80 hover:text-[#D6AD60] transition-all duration-700 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
                >
                    <span className="text-2xl sm:text-3xl md:text-4xl">←</span>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white/80 hover:text-[#D6AD60] transition-all duration-700 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
                >
                    <span className="text-2xl sm:text-3xl md:text-4xl">→</span>
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 sm:space-x-4 md:space-x-6 z-30">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > imageIndex ? 'next' : 'prev');
                                setCurrentIndex(index);
                            }}
                            className={`w-8 sm:w-10 md:w-12 h-[1px] transition-all duration-700 ${index === imageIndex
                                ? 'bg-[#D6AD60] shadow-sm'
                                : 'bg-white/50 hover:bg-white/70'
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero; 