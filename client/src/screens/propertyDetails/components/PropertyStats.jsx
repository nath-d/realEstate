// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaBed, FaBath, FaRuler, FaCar, FaCalendarAlt, FaHome, FaChartArea, FaClipboardList } from 'react-icons/fa';
// import '../styles/fonts.css';

// const PropertyStats = ({ details }) => {
//     const stats = [
//         {
//             icon: FaBed,
//             label: 'Bedrooms',
//             value: details.bedrooms,
//             description: 'Spacious bedrooms'
//         },
//         {
//             icon: FaBath,
//             label: 'Bathrooms',
//             value: details.bathrooms,
//             description: 'Luxury bathrooms'
//         },
//         {
//             icon: FaChartArea,
//             label: 'Living Area',
//             value: details.livingArea,
//             description: 'Total living space'
//         },
//         {
//             icon: FaCar,
//             label: 'Garage',
//             value: `${details.garage} Cars`,
//             description: 'Covered parking'
//         },
//         {
//             icon: FaHome,
//             label: 'Lot Size',
//             value: details.lotSize,
//             description: 'Total property area'
//         },
//         {
//             icon: FaCalendarAlt,
//             label: 'Year Built',
//             value: details.yearBuilt,
//             description: 'Construction date'
//         }
//     ];

//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const item = {
//         hidden: { opacity: 0, y: 20 },
//         show: { opacity: 1, y: 0 }
//     };

//     return (
//         <section className="py-20 relative">
//             {/* Luxury Background */}
//             <div className="absolute inset-0">
//                 <div className="absolute inset-0 bg-gradient-to-b from-[#122620] via-[#1A332C] to-[#122620]" />
//                 <div className="absolute inset-0 opacity-10">
//                     <div className="absolute inset-0 bg-[url('/luxury-pattern.png')] bg-repeat opacity-5"></div>
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#E5BE90]/10 via-transparent to-[#E5BE90]/10"></div>
//                 </div>
//             </div>

//             <div className="container mx-auto px-6 relative">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     className="text-center mb-16"
//                 >
//                     <div className="flex justify-center mb-6">
//                         <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
//                             <FaClipboardList className="text-[#E5BE90] text-3xl" />
//                         </div>
//                     </div>
//                     <h2 className="text-4xl font-bold mb-4 text-white">Property Details</h2>
//                     <div className="flex justify-center items-center gap-4">
//                         <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
//                         <p className="text-gray-400">Comprehensive property specifications</p>
//                         <span className="w-12 h-0.5 bg-[#E5BE90]"></span>
//                     </div>
//                 </motion.div>

//                 <motion.div
//                     variants={container}
//                     initial="hidden"
//                     whileInView="show"
//                     viewport={{ once: true }}
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//                 >
//                     {stats.map((stat, index) => (
//                         <motion.div
//                             key={index}
//                             variants={item}
//                             whileHover={{
//                                 scale: 1.02,
//                                 transition: { duration: 0.2 }
//                             }}
//                             className="relative group"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-[#E5BE90]/5 to-[#E5BE90]/10 rounded-3xl transform -rotate-1"></div>
//                             <div className="relative bg-[#1A332C] rounded-3xl p-8 backdrop-blur-lg border border-[#E5BE90]/10 shadow-xl">
//                                 <div className="flex items-start gap-6">
//                                     <div className="flex-shrink-0">
//                                         <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                                             <stat.icon className="text-[#E5BE90] text-2xl transform group-hover:scale-110 transition-transform duration-300" />
//                                         </div>
//                                     </div>
//                                     <div className="flex-grow">
//                                         <h3 className="font-montserrat text-sm text-[#E5BE90] mb-2 tracking-wider uppercase">
//                                             {stat.label}
//                                         </h3>
//                                         <p className="font-montserrat text-3xl font-bold text-white mb-2">
//                                             {stat.value}
//                                         </p>
//                                         <p className="text-gray-400 text-sm">
//                                             {stat.description}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E5BE90]/20 to-transparent transform translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default PropertyStats; 


import React from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaCar, FaCalendarAlt, FaHome } from 'react-icons/fa';
import '../styles/fonts.css';

const PropertyStats = ({ details }) => {
    const stats = [
        { icon: FaBed, label: 'Bedrooms', value: details.bedrooms },
        { icon: FaBath, label: 'Bathrooms', value: details.bathrooms },
        { icon: FaRuler, label: 'Living Area', value: `${details.livingArea} sq ft` },
        { icon: FaCar, label: 'Garage', value: `${details.garage} Cars` },
        { icon: FaHome, label: 'Lot Size', value: `${details.lotSize} sq ft` },
        { icon: FaCalendarAlt, label: 'Year Built', value: details.yearBuilt }
    ];

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
        <section className="py-8 sm:py-12 lg:py-16 relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[#1A332C]/30 backdrop-blur-xl" />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="container mx-auto px-4 sm:px-6 relative"
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="bg-[#1A332C] rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#E5BE90]/10 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
                                    <stat.icon className="text-[#E5BE90] text-lg sm:text-xl lg:text-2xl" />
                                </div>
                                <p className="font-montserrat text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2 tracking-wider uppercase leading-tight">{stat.label}</p>
                                <p className="font-source-serif text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default PropertyStats; 