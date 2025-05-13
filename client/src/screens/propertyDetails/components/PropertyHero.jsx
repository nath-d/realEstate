// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaHeart, FaShare, FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa';
// import '../styles/fonts.css';

// const PropertyHero = ({ property }) => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);

//     useEffect(() => {
//         let interval;
//         if (isPlaying) {
//             interval = setInterval(() => {
//                 setCurrentImageIndex((prev) =>
//                     prev === property.images.length - 1 ? 0 : prev + 1
//                 );
//             }, 5000);
//         }
//         return () => clearInterval(interval);
//     }, [isPlaying, property.images]);

//     if (!property || !property.images || !property.images.length) {
//         return (
//             <div className="relative h-[85vh] bg-[#122620] flex items-center justify-center">
//                 <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="text-white text-xl"
//                 >
//                     Loading property details...
//                 </motion.p>
//             </div>
//         );
//     }

//     const nextImage = () => {
//         setCurrentImageIndex((prev) =>
//             prev === property.images.length - 1 ? 0 : prev + 1
//         );
//     };

//     const prevImage = () => {
//         setCurrentImageIndex((prev) =>
//             prev === 0 ? property.images.length - 1 : prev - 1
//         );
//     };

//     return (
//         <div className="relative h-[85vh] overflow-hidden">
//             {/* Image Slider */}
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={currentImageIndex}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="absolute inset-0 scale-105"
//                     style={{
//                         backgroundImage: `url(${property.images[currentImageIndex]})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 >
//                     <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#122620]" />
//                 </motion.div>
//             </AnimatePresence>

//             {/* Navigation Controls */}
//             <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 md:px-8">
//                 <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={prevImage}
//                     className="p-3 md:p-4 bg-black/30 hover:bg-[#D4AF37] text-white rounded-full backdrop-blur-sm transition-all duration-300"
//                 >
//                     <FaAngleLeft className="text-2xl md:text-3xl" />
//                 </motion.button>
//                 <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={nextImage}
//                     className="p-3 md:p-4 bg-black/30 hover:bg-[#D4AF37] text-white rounded-full backdrop-blur-sm transition-all duration-300"
//                 >
//                     <FaAngleRight className="text-2xl md:text-3xl" />
//                 </motion.button>
//             </div>

//             {/* Image Counter and Autoplay */}
//             <div className="absolute top-6 right-6 flex items-center space-x-4">
//                 <div className="px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full text-white font-medium">
//                     {currentImageIndex + 1} / {property.images.length}
//                 </div>
//                 <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsPlaying(!isPlaying)}
//                     className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${isPlaying ? 'bg-[#D4AF37] text-[#122620]' : 'bg-black/30 text-white'
//                         }`}
//                 >
//                     <FaPlay className="text-lg" />
//                 </motion.button>
//             </div>

//             {/* Content */}
//             <div className="absolute inset-0 flex items-end">
//                 <div className="container mx-auto px-6 pb-24">
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="max-w-4xl"
//                     >
//                         <div className="flex flex-wrap items-center gap-4 mb-6">
//                             <motion.span
//                                 whileHover={{ scale: 1.05 }}
//                                 className="px-6 py-2 bg-[#D4AF37] text-[#122620] rounded-full font-montserrat font-semibold text-sm tracking-wider shadow-lg"
//                             >
//                                 Featured
//                             </motion.span>
//                             <motion.span
//                                 whileHover={{ scale: 1.05 }}
//                                 className="px-6 py-2 bg-[#1A332C] text-white rounded-full font-montserrat text-sm tracking-wider shadow-lg"
//                             >
//                                 For Sale
//                             </motion.span>
//                             <motion.span
//                                 whileHover={{ scale: 1.05 }}
//                                 className="px-6 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full font-montserrat text-sm tracking-wider shadow-lg"
//                             >
//                                 Luxury
//                             </motion.span>
//                         </div>

//                         <motion.h1
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.2 }}
//                             className="heading-primary text-5xl md:text-7xl font-bold mb-6 text-white leading-tight font-montserrat"
//                         >
//                             {property.title || 'Luxury Property'}
//                         </motion.h1>

//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.3 }}
//                             className="accent-text text-xl md:text-2xl mb-8 text-gray-200 flex items-center gap-3 font-light"
//                         >
//                             <span className="inline-block w-12 h-0.5 bg-[#D4AF37]"></span>
//                             {property.address || 'Location details coming soon'}
//                         </motion.p>

//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.4 }}
//                             className="flex flex-wrap items-center gap-8"
//                         >
//                             <p className="price-text text-4xl md:text-6xl font-bold text-[#D4AF37] font-montserrat">
//                                 {property.price || 'Price upon request'}
//                             </p>
//                             <div className="flex gap-4">
//                                 <motion.button
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     className="p-4 bg-[#1A332C] hover:bg-[#D4AF37] text-white rounded-full transition-all duration-300 shadow-lg"
//                                 >
//                                     <FaHeart className="text-xl" />
//                                 </motion.button>
//                                 <motion.button
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     className="p-4 bg-[#1A332C] hover:bg-[#D4AF37] text-white rounded-full transition-all duration-300 shadow-lg"
//                                 >
//                                     <FaShare className="text-xl" />
//                                 </motion.button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </div>

//             {/* Enhanced Decorative Elements */}
//             <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#122620] via-[#122620]/90 to-transparent" />
//             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm" />
//             <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
//         </div>
//     );
// };

// export default PropertyHero; 


import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShare } from 'react-icons/fa';
import '../styles/fonts.css';

const PropertyHero = ({ property }) => {
    return (
        <div className="relative h-[85vh] overflow-hidden">
            {/* Parallax Background */}
            <div className="absolute inset-0 scale-105" style={{
                backgroundImage: `url(${property.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'translateZ(-1px) scale(1.2)',
            }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-[#122620]" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-end">
                <div className="container mx-auto px-6 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-2 bg-[#E5BE90] text-[#122620] rounded-full font-montserrat font-semibold text-sm tracking-wider">
                                Featured
                            </span>
                            <span className="px-4 py-2 bg-[#1A332C] text-white rounded-full font-montserrat text-sm tracking-wider">
                                For Sale
                            </span>
                        </div>

                        <h1 className="heading-primary text-6xl font-bold mb-4 text-white leading-tight">
                            {property.title}
                        </h1>

                        <p className="accent-text text-2xl mb-6 text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-8 h-0.5 bg-[#E5BE90]"></span>
                            {property.address}
                        </p>

                        <div className="flex items-center gap-8">
                            <p className="price-text text-5xl font-bold text-[#E5BE90]">
                                {property.price}
                            </p>
                            <div className="flex gap-4">
                                <button className="p-4 bg-[#1A332C] hover:bg-[#E5BE90] text-white rounded-full transition-all duration-300 transform hover:scale-105">
                                    <FaHeart className="text-xl" />
                                </button>
                                <button className="p-4 bg-[#1A332C] hover:bg-[#E5BE90] text-white rounded-full transition-all duration-300 transform hover:scale-105">
                                    <FaShare className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#122620] to-transparent" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent" />
        </div>
    );
};

export default PropertyHero; 