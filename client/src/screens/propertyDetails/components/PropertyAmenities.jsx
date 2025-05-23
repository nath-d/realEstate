import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaSwimmingPool, FaWineGlassAlt, FaFilm, FaLightbulb, FaUtensils, FaSolarPanel, FaShieldAlt, FaLeaf, FaChevronRight, FaChevronLeft, FaListUl, FaSpa, FaRegHeart } from 'react-icons/fa';

const PropertyAmenities = ({ amenities }) => {
    const [activeCategory, setActiveCategory] = useState('interior');
    const [hoveredItem, setHoveredItem] = useState(null);

    // Sample images for amenities (in a real app, these would come from your database)
    const amenityImages = {
        'Gourmet Kitchen': 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Infinity Pool': 'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Wine Cellar': 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Home Theater': 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Smart Home': 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Private Elevator': 'https://images.unsplash.com/photo-1557660558-d117b29fae16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Solar Panels': 'https://images.unsplash.com/photo-1592833159641-75a25c17ada9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Security System': 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Zen Garden': 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Spa Bathroom': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    };

    // Find the closest matching image for an amenity
    const getAmenityImage = (amenity) => {
        for (const [key, value] of Object.entries(amenityImages)) {
            if (amenity.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
                return value;
            }
        }
        // Default image if no match found
        return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    };

    const categories = {
        interior: {
            title: "Interior Features",
            icon: <FaHome className="text-2xl" />,
            items: amenities.interior
        },
        exterior: {
            title: "Exterior Features",
            icon: <FaSwimmingPool className="text-2xl" />,
            items: amenities.exterior
        }
    };

    const getIconForAmenity = (amenity) => {
        const iconMap = {
            'Kitchen': <FaUtensils />,
            'Pool': <FaSwimmingPool />,
            'Wine': <FaWineGlassAlt />,
            'Theater': <FaFilm />,
            'Smart': <FaLightbulb />,
            'Solar': <FaSolarPanel />,
            'Security': <FaShieldAlt />,
            'Garden': <FaLeaf />,
            'Spa': <FaSpa />
        };

        for (const [key, icon] of Object.entries(iconMap)) {
            if (amenity.toLowerCase().includes(key.toLowerCase())) {
                return icon;
            }
        }
        return <FaHome />;
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Enhanced Decorative Elements with subtle animations */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut",
                        delay: 4
                    }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "easeInOut",
                        delay: 7
                    }}
                    className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 bg-gradient-to-br from-[#E5BE90]/30 to-[#E5BE90]/10 rounded-full flex items-center justify-center shadow-lg"
                        >
                            <FaListUl className="text-[#E5BE90] text-3xl" />
                        </motion.div>
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Luxury Amenities</h2>
                    <div className="flex justify-center items-center gap-4">
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#E5BE90]"
                        ></motion.span>
                        <p className="text-gray-400">Exclusive features designed for superior living</p>
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#E5BE90]"
                        ></motion.span>
                    </div>
                </motion.div>

                <div className="bg-gradient-to-b from-[#1A332C] to-[#122620] rounded-3xl p-8 shadow-2xl border border-[#E5BE90]/10 backdrop-blur-sm">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center space-x-4 mb-12">
                        {Object.entries(categories).map(([key, category]) => (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(229, 190, 144, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(key)}
                                className={`flex items-center space-x-2 px-8 py-4 rounded-xl transition-color ${activeCategory === key
                                    ? 'bg-gradient-to-r from-[#E5BE90] to-[#d8ab7a] text-[#122620] shadow-lg'
                                    : 'bg-[#122620] text-gray-300 hover:bg-[#193129] border border-[#E5BE90]/10'
                                    }`}
                            >
                                <span className="text-2xl">{category.icon}</span>
                                <span className="font-semibold text-lg">{category.title}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Featured Amenity Preview */}
                    {hoveredItem && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-8 flex justify-center"
                        >
                            <div className="bg-[#122620] border border-[#E5BE90]/20 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl">
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/2 h-64 relative">
                                        <img
                                            src={getAmenityImage(hoveredItem)}
                                            alt={hoveredItem}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#122620] via-transparent to-transparent opacity-70"></div>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute top-4 right-4 w-10 h-10 bg-[#122620]/50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                                        >
                                            <FaRegHeart className="text-[#E5BE90]" />
                                        </motion.div>
                                    </div>
                                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-[#E5BE90] mb-3">{hoveredItem}</h3>
                                        <p className="text-gray-300 mb-4">{getAmenityDescription(hoveredItem)}</p>
                                        <div className="flex space-x-4">
                                            <span className="inline-flex items-center px-4 py-1 rounded-full bg-[#E5BE90]/10 text-[#E5BE90] text-sm">
                                                Premium
                                            </span>
                                            <span className="inline-flex items-center px-4 py-1 rounded-full bg-[#E5BE90]/10 text-[#E5BE90] text-sm">
                                                Luxury
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Amenities Grid - Now showing all items */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            variants={container}
                            className="relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categories[activeCategory].items.map((amenity, index) => (
                                    <motion.div
                                        key={index}
                                        variants={item}
                                        onHoverStart={() => setHoveredItem(amenity)}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                            boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.3), 0 0 10px rgba(229, 190, 144, 0.2)"
                                        }}
                                        className="bg-gradient-to-br from-[#193129] to-[#122620] p-6 rounded-3xl shadow-lg group cursor-pointer border border-[#E5BE90]/10"
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-[#E5BE90]/30 to-[#E5BE90]/5 flex items-center justify-center shadow-lg border border-[#E5BE90]/20 group-hover:shadow-[#E5BE90]/20 transition-color duration-300">
                                                <span className="text-[#E5BE90] text-2xl group-hover:scale-110 transition-color duration-300">
                                                    {getIconForAmenity(amenity)}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-[#E5BE90] font-semibold text-xl mb-2 group-hover:text-white transition-colors">{amenity}</h3>
                                                <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                                                    {getAmenityDescription(amenity)}
                                                </p>
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileHover={{ opacity: 1, y: 0 }}
                                                className="mt-4 pt-4 border-t border-[#E5BE90]/10 w-full"
                                            >
                                                <span className="text-[#E5BE90] text-sm flex items-center justify-center space-x-1">
                                                    <span>View Details</span>
                                                    <FaChevronRight className="text-xs" />
                                                </span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Amenity Categories Summary - Enhanced with images */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative rounded-3xl overflow-hidden group"
                        >
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Interior Features"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#122620] via-[#122620]/70 to-transparent"></div>
                            </div>
                            <div className="relative p-8 z-10">
                                <h3 className="text-[#E5BE90] font-semibold text-2xl mb-6 flex items-center">
                                    <FaHome className="mr-3" /> Interior Highlights
                                </h3>
                                <ul className="space-y-4 mb-4">
                                    {amenities.interior.slice(0, 3).map((item, index) => (
                                        <li key={index} className="flex items-center space-x-3 text-white font-light">
                                            <span className="text-[#E5BE90] text-lg">•</span>
                                            <span className="text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 px-6 py-2 bg-[#E5BE90]/10 text-[#E5BE90] rounded-full text-sm border border-[#E5BE90]/30 hover:bg-[#E5BE90]/20 transition-colors"
                                >
                                    View All Interior Features
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative rounded-3xl overflow-hidden group"
                        >
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Exterior Features"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#122620] via-[#122620]/70 to-transparent"></div>
                            </div>
                            <div className="relative p-8 z-10">
                                <h3 className="text-[#E5BE90] font-semibold text-2xl mb-6 flex items-center">
                                    <FaSwimmingPool className="mr-3" /> Exterior Highlights
                                </h3>
                                <ul className="space-y-4 mb-4">
                                    {amenities.exterior.slice(0, 3).map((item, index) => (
                                        <li key={index} className="flex items-center space-x-3 text-white font-light">
                                            <span className="text-[#E5BE90] text-lg">•</span>
                                            <span className="text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 px-6 py-2 bg-[#E5BE90]/10 text-[#E5BE90] rounded-full text-sm border border-[#E5BE90]/30 hover:bg-[#E5BE90]/20 transition-colors"
                                >
                                    View All Exterior Features
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const getAmenityDescription = (amenity) => {
    const descriptions = {
        'Kitchen': 'State-of-the-art appliances with premium marble finishes and custom cabinetry for the culinary enthusiast.',
        'Pool': 'Infinity edge swimming pool with panoramic views, integrated hot tub, and premium lounging areas.',
        'Wine': 'Temperature-controlled wine cellar with custom racking for up to 1,000 bottles and tasting area.',
        'Theater': 'Professional-grade home theater with 4K projection, premium sound system, and luxury reclining seating.',
        'Smart': 'Comprehensive home automation system controlling lighting, climate, security, and entertainment.',
        'Elevator': 'Custom-designed private elevator providing convenient access between all floors.',
        'Solar': 'Integrated solar energy system providing sustainable power while reducing utility costs.',
        'Security': 'State-of-the-art security system with 24/7 monitoring, facial recognition, and secure entry points.',
        'Garden': 'Professionally designed and maintained landscaping with mature trees and water features.',
        'Spa': 'Luxurious spa bathroom with steam shower, jetted tub, and heated marble floors.'
    };

    for (const [key, description] of Object.entries(descriptions)) {
        if (amenity.toLowerCase().includes(key.toLowerCase())) {
            return description;
        }
    }
    return 'Premium luxury feature designed for exceptional living experience and comfort.';
};

export default PropertyAmenities;






// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaHome, FaSwimmingPool, FaWineGlassAlt, FaFilm, FaLightbulb, FaUtensils, FaSolarPanel, FaShieldAlt, FaLeaf, FaChevronRight, FaChevronLeft, FaListUl, FaSpa, FaRegHeart, FaStar, FaPlus, FaMinus, FaPlay, FaPause, FaExpand, FaArrowRight } from 'react-icons/fa';

// const PropertyAmenities = ({ amenities }) => {
//     const [activeCategory, setActiveCategory] = useState('interior');
//     const [hoveredItem, setHoveredItem] = useState(null);
//     const [selectedAmenity, setSelectedAmenity] = useState(null);

//     // Color palette for different categories
//     const colorPalette = {
//         interior: {
//             primary: '#E5BE90',
//             secondary: '#D4A373',
//             accent: '#FEFAE0',
//             gradient: 'from-[#E5BE90] via-[#D4A373] to-[#FEFAE0]'
//         },
//         exterior: {
//             primary: '#606C38',
//             secondary: '#283618',
//             accent: '#FEFAE0',
//             gradient: 'from-[#606C38] via-[#283618] to-[#FEFAE0]'
//         }
//     };

//     const categories = {
//         interior: {
//             title: "Interior Features",
//             icon: <FaHome className="text-2xl" />,
//             items: amenities.interior,
//             description: "Discover the epitome of luxury living within these meticulously crafted spaces.",
//             color: colorPalette.interior
//         },
//         exterior: {
//             title: "Exterior Features",
//             icon: <FaSwimmingPool className="text-2xl" />,
//             items: amenities.exterior,
//             description: "Experience the perfect blend of natural beauty and sophisticated outdoor living.",
//             color: colorPalette.exterior
//         }
//     };

//     // Sample images for amenities (in a real app, these would come from your database)
//     const amenityImages = {
//         'Gourmet Kitchen': 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Infinity Pool': 'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Wine Cellar': 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Home Theater': 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Smart Home': 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Private Elevator': 'https://images.unsplash.com/photo-1557660558-d117b29fae16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Solar Panels': 'https://images.unsplash.com/photo-1592833159641-75a25c17ada9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Security System': 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Zen Garden': 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//         'Spa Bathroom': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     };

//     // Find the closest matching image for an amenity
//     const getAmenityImage = (amenity) => {
//         for (const [key, value] of Object.entries(amenityImages)) {
//             if (amenity.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
//                 return value;
//             }
//         }
//         // Default image if no match found
//         return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
//     };

//     const getIconForAmenity = (amenity) => {
//         const iconMap = {
//             'Kitchen': <FaUtensils />,
//             'Pool': <FaSwimmingPool />,
//             'Wine': <FaWineGlassAlt />,
//             'Theater': <FaFilm />,
//             'Smart': <FaLightbulb />,
//             'Solar': <FaSolarPanel />,
//             'Security': <FaShieldAlt />,
//             'Garden': <FaLeaf />,
//             'Spa': <FaSpa />
//         };

//         for (const [key, icon] of Object.entries(iconMap)) {
//             if (amenity.toLowerCase().includes(key.toLowerCase())) {
//                 return icon;
//             }
//         }
//         return <FaHome />;
//     };

//     return (
//         <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1A332C] via-[#122620] to-[#0A1A15]">
//             {/* Decorative Elements */}
//             <div className="absolute inset-0">
//                 <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/luxury-pattern.png')] opacity-5" />
//                 <motion.div
//                     animate={{
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 5, 0],
//                     }}
//                     transition={{
//                         duration: 20,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                     className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-gradient-to-l from-[#E5BE90]/10 to-transparent rounded-full blur-3xl"
//                 />
//             </div>

//             <div className="container mx-auto px-6 py-32 relative">
//                 {/* Header Section with Split Design */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
//                     <motion.div
//                         initial={{ opacity: 0, x: -50 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         className="relative"
//                     >
//                         <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#E5BE90]/20 to-transparent rounded-full blur-2xl" />
//                         <h2 className="text-8xl font-bold text-white font-cardo leading-tight mb-8">
//                             Luxury
//                             <span className="block text-[#E5BE90]">Amenities</span>
//                         </h2>
//                         <p className="text-gray-300 text-xl leading-relaxed max-w-lg">
//                             Experience unparalleled luxury with our carefully curated selection of premium amenities designed for the discerning homeowner.
//                         </p>
//                     </motion.div>
//                     <motion.div
//                         initial={{ opacity: 0, x: 50 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         className="relative"
//                     >
//                         <div className="aspect-square rounded-3xl overflow-hidden">
//                             <img
//                                 src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                                 alt="Luxury Interior"
//                                 className="w-full h-full object-cover"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-[#122620] via-transparent to-transparent" />
//                         </div>
//                         <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#E5BE90]/30 to-transparent rounded-full blur-2xl" />
//                     </motion.div>
//                 </div>

//                 {/* Category Navigation */}
//                 <div className="flex flex-wrap justify-center gap-6 mb-20">
//                     {Object.entries(categories).map(([key, category]) => (
//                         <motion.button
//                             key={key}
//                             whileHover={{
//                                 scale: 1.05,
//                                 y: -5,
//                                 boxShadow: `0 20px 30px -10px ${category.color.primary}20`
//                             }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => setActiveCategory(key)}
//                             className={`relative group px-12 py-6 rounded-2xl transition-color ${activeCategory === key
//                                 ? `bg-gradient-to-r ${category.color.gradient} text-[#122620]`
//                                 : 'bg-[#122620]/50 text-gray-300 hover:bg-[#193129] border border-[#E5BE90]/20'
//                                 }`}
//                         >
//                             <div className="flex items-center space-x-4">
//                                 <motion.span
//                                     animate={{
//                                         rotate: activeCategory === key ? [0, 360] : 0
//                                     }}
//                                     transition={{
//                                         duration: 20,
//                                         repeat: Infinity,
//                                         ease: "linear"
//                                     }}
//                                     className="text-3xl"
//                                 >
//                                     {category.icon}
//                                 </motion.span>
//                                 <div className="text-left">
//                                     <span className="font-semibold text-xl block">{category.title}</span>
//                                     <span className="text-sm opacity-80">{category.description}</span>
//                                 </div>
//                             </div>
//                             <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                         </motion.button>
//                     ))}
//                 </div>

//                 {/* Featured Amenity Showcase */}
//                 <AnimatePresence mode="wait">
//                     {selectedAmenity && (
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -20 }}
//                             className="mb-20"
//                         >
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                                 <div className="relative">
//                                     <div className="aspect-[4/3] rounded-3xl overflow-hidden">
//                                         <img
//                                             src={getAmenityImage(selectedAmenity)}
//                                             alt={selectedAmenity}
//                                             className="w-full h-full object-cover"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-[#122620] via-transparent to-transparent" />
//                                     </div>
//                                     <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#E5BE90]/30 to-transparent rounded-full blur-2xl" />
//                                 </div>
//                                 <div className="relative z-10">
//                                     <div className="flex items-center space-x-3 mb-6">
//                                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E5BE90]/30 to-[#E5BE90]/10 flex items-center justify-center">
//                                             {getIconForAmenity(selectedAmenity)}
//                                         </div>
//                                         <span className="text-[#E5BE90] text-sm font-medium">Premium Feature</span>
//                                     </div>
//                                     <h3 className="text-4xl font-bold text-white mb-6">{selectedAmenity}</h3>
//                                     <p className="text-gray-300 text-lg leading-relaxed mb-8">
//                                         {getAmenityDescription(selectedAmenity)}
//                                     </p>
//                                     <div className="flex flex-wrap gap-4">
//                                         <motion.button
//                                             whileHover={{ scale: 1.05 }}
//                                             whileTap={{ scale: 0.95 }}
//                                             className="px-8 py-3 bg-[#E5BE90] text-[#122620] rounded-full font-medium flex items-center space-x-2"
//                                         >
//                                             <span>Explore Feature</span>
//                                             <FaArrowRight />
//                                         </motion.button>
//                                         <motion.button
//                                             whileHover={{ scale: 1.05 }}
//                                             whileTap={{ scale: 0.95 }}
//                                             className="px-8 py-3 bg-[#122620] text-[#E5BE90] rounded-full font-medium border border-[#E5BE90]/30"
//                                         >
//                                             View Gallery
//                                         </motion.button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Amenities Grid with Modern Layout */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {categories[activeCategory].items.map((amenity, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: index * 0.1 }}
//                             whileHover={{
//                                 scale: 1.02,
//                                 y: -5,
//                                 boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.3)"
//                             }}
//                             onClick={() => setSelectedAmenity(amenity)}
//                             className="group relative bg-gradient-to-br from-[#193129] to-[#122620] rounded-3xl overflow-hidden cursor-pointer"
//                         >
//                             <div className="aspect-[4/3] relative">
//                                 <img
//                                     src={getAmenityImage(amenity)}
//                                     alt={amenity}
//                                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-[#122620] via-transparent to-transparent opacity-80" />
//                                 <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#122620]/50 backdrop-blur-sm flex items-center justify-center border border-[#E5BE90]/30">
//                                     <FaRegHeart className="text-[#E5BE90]" />
//                                 </div>
//                             </div>
//                             <div className="p-6">
//                                 <div className="flex items-center space-x-3 mb-4">
//                                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E5BE90]/30 to-[#E5BE90]/10 flex items-center justify-center">
//                                         {getIconForAmenity(amenity)}
//                                     </div>
//                                     <h3 className="text-xl font-semibold text-white">{amenity}</h3>
//                                 </div>
//                                 <p className="text-gray-400 text-sm line-clamp-2 mb-4">
//                                     {getAmenityDescription(amenity)}
//                                 </p>
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-[#E5BE90] text-sm">Premium Feature</span>
//                                     <FaArrowRight className="text-[#E5BE90] transform group-hover:translate-x-1 transition-transform" />
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Category Highlights with Modern Design */}
//                 <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
//                     {Object.entries(categories).map(([key, category]) => (
//                         <motion.div
//                             key={key}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             className="relative"
//                         >
//                             <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#E5BE90]/20 to-transparent rounded-full blur-2xl" />
//                             <div className="relative bg-gradient-to-br from-[#193129] to-[#122620] rounded-3xl p-10">
//                                 <div className="flex items-center space-x-4 mb-8">
//                                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E5BE90]/30 to-[#E5BE90]/10 flex items-center justify-center">
//                                         {category.icon}
//                                     </div>
//                                     <div>
//                                         <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
//                                         <p className="text-gray-400">{category.description}</p>
//                                     </div>
//                                 </div>
//                                 <ul className="space-y-4">
//                                     {category.items.slice(0, 4).map((item, index) => (
//                                         <motion.li
//                                             key={index}
//                                             whileHover={{ x: 10 }}
//                                             className="flex items-center space-x-3 text-white"
//                                         >
//                                             <div className="w-2 h-2 rounded-full bg-[#E5BE90]" />
//                                             <span className="text-lg">{item}</span>
//                                         </motion.li>
//                                     ))}
//                                 </ul>
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="mt-8 px-8 py-3 bg-[#E5BE90]/10 text-[#E5BE90] rounded-full text-sm border border-[#E5BE90]/30 hover:bg-[#E5BE90]/20 transition-colors"
//                                 >
//                                     View All {category.title}
//                                 </motion.button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// const getAmenityDescription = (amenity) => {
//     const descriptions = {
//         'Kitchen': 'State-of-the-art appliances with premium marble finishes and custom cabinetry for the culinary enthusiast.',
//         'Pool': 'Infinity edge swimming pool with panoramic views, integrated hot tub, and premium lounging areas.',
//         'Wine': 'Temperature-controlled wine cellar with custom racking for up to 1,000 bottles and tasting area.',
//         'Theater': 'Professional-grade home theater with 4K projection, premium sound system, and luxury reclining seating.',
//         'Smart': 'Comprehensive home automation system controlling lighting, climate, security, and entertainment.',
//         'Elevator': 'Custom-designed private elevator providing convenient access between all floors.',
//         'Solar': 'Integrated solar energy system providing sustainable power while reducing utility costs.',
//         'Security': 'State-of-the-art security system with 24/7 monitoring, facial recognition, and secure entry points.',
//         'Garden': 'Professionally designed and maintained landscaping with mature trees and water features.',
//         'Spa': 'Luxurious spa bathroom with steam shower, jetted tub, and heated marble floors.'
//     };

//     for (const [key, description] of Object.entries(descriptions)) {
//         if (amenity.toLowerCase().includes(key.toLowerCase())) {
//             return description;
//         }
//     }
//     return 'Premium luxury feature designed for exceptional living experience and comfort.';
// };

// export default PropertyAmenities; 