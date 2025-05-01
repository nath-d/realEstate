// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRupeeSign, FaStar } from 'react-icons/fa';

// const PropertyCard = ({ property, handleImageError }) => {
//     return (
//         <div className="h-full flex flex-col transition-all duration-500 overflow-hidden bg-[#F4EBD0] border-2 border-[#122620] rounded-2xl">
//             <div className="relative h-80 overflow-hidden">
//                 <img
//                     src={property.image}
//                     alt={property.title}
//                     onError={handleImageError}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500" />

//                 {property.featured && (
//                     <div className="absolute top-4 left-4 bg-[#D6AD60] text-[#122620] px-3 py-1 rounded-sm flex items-center shadow-md">
//                         <FaStar className="mr-1 text-sm" />
//                         <span className="font-montserrat text-xs font-bold">Featured</span>
//                     </div>
//                 )}

//                 <div className="absolute top-4 right-4 bg-[#D6AD60] text-[#122620] px-4 py-2 rounded-sm transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500 shadow-md">
//                     <div className="flex items-center font-montserrat font-bold">
//                         <FaRupeeSign className="text-sm" />
//                         <span>{property.price}</span>
//                     </div>
//                 </div>

//                 <div className="absolute bottom-4 left-4 text-white">
//                     <div className="flex items-center font-montserrat text-sm">
//                         <FaMapMarkerAlt className="mr-2 text-[#D6AD60]" />
//                         <span>{property.location}</span>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-12 flex-grow flex flex-col">
//                 <h3 className="text-2xl font-source-serif text-[#122620] mb-3 border-b border-[#122620]/20 pb-2">
//                     {property.title}
//                 </h3>

//                 <div className="grid grid-cols-3 gap-3 mb-5">
//                     <div className="flex flex-col lg:flex-row justify-center gap-8 items-center p-2 bg-[#122620]/10 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
//                         <FaBed className="text-[#122620] text-lg mb-1 lg:h-10 lg:w-10" />
//                         <div className="flex flex-col items-center">
//                             <span className="text-[#122620] font-montserrat text-sm lg:text-xl font-semibold">{property.specs.beds}</span>
//                             <span className="text-[#122620] font-montserrat text-xs lg:text-base font-medium">Bedrooms</span>
//                         </div>
//                     </div>
//                     <div className="flex flex-col lg:flex-row justify-center gap-8 items-center p-2 bg-[#122620]/50 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
//                         {/* <FaBath className="text-[#D6AD60] text-lg mb-1 md:h-8 md:w-8" />
//                         <span className="text-[#D6AD60]/90 font-montserrat text-sm">{property.specs.baths}</span>
//                         <span className="text-[#D6AD60]/60 font-montserrat text-xs md:text-sm">Bathrooms</span> */}
//                         <FaBath className="text-[#122620] text-lg mb-1 lg:h-10 lg:w-10" />
//                         <div className="flex flex-col items-center">
//                             <span className="text-[#122620] font-montserrat text-sm lg:text-xl font-semibold">{property.specs.baths}</span>
//                             <span className="text-[#122620] font-montserrat text-xs lg:text-base font-medium">Bathrooms</span>
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-center p-2 bg-[#122620]/50 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
//                         <FaRulerCombined className="text-[#D6AD60] text-lg mb-1 md:h-8 md:w-8" />
//                         <span className="text-[#D6AD60]/90 font-montserrat text-sm">{property.specs.sqft.toLocaleString()}</span>
//                         <span className="text-[#D6AD60]/60 font-montserrat text-xs md:text-sm">Sq.Ft</span>
//                     </div>
//                 </div>

//                 <div className="mt-auto">
//                     <Link
//                         to={`/properties/${property.id}`}
//                         className="inline-block w-full text-center bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-6 py-3 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
//                     >
//                         View Details
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PropertyCard; 



import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRupeeSign, FaStar } from 'react-icons/fa';

const PropertyCard = ({ property, handleImageError }) => {
    return (
        <div className="h-full flex flex-col transition-all duration-500 overflow-hidden bg-[#F4EBD0] border-4 border-[#D6AD60] rounded-2xl hover:shadow-lg">
            <div className="relative h-60 sm:h-72 md:h-80 overflow-hidden group">
                <img
                    src={property.image}
                    alt={property.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {property.featured && (
                    <div className="absolute top-4 left-4 bg-[#D6AD60] text-[#122620] px-3 py-1 rounded-sm flex items-center shadow-md">
                        <FaStar className="mr-1 text-sm" />
                        <span className="font-montserrat text-xs font-bold">Featured</span>
                    </div>
                )}

                <div className="absolute top-4 right-4 bg-[#D6AD60] text-[#122620] px-3 py-1 rounded-sm transition-transform duration-300 group-hover:-translate-y-1 shadow-md">
                    <div className="flex items-center font-montserrat font-bold text-sm md:text-base">
                        <FaRupeeSign className="mr-1" />
                        <span>{property.price}</span>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center font-montserrat text-sm md:text-base">
                        <FaMapMarkerAlt className="mr-2 text-[#D6AD60]" />
                        <span>{property.location}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl sm:text-2xl font-source-serif text-[#122620] mb-3 border-b border-[#122620]/20 pb-2">
                    {property.title}
                </h3>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <div className="flex flex-col items-center p-2 bg-[#122620]/10 rounded-sm hover:bg-[#122620]/20 transition-colors duration-300">
                        <FaBed className="text-[#122620] text-lg mb-1" />
                        <span className="text-[#122620] font-montserrat text-sm sm:text-base font-semibold">{property.specs.beds}</span>
                        <span className="text-[#122620] font-montserrat text-xs sm:text-sm">Beds</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#122620]/10 rounded-sm hover:bg-[#122620]/20 transition-colors duration-300">
                        <FaBath className="text-[#122620] text-lg mb-1" />
                        <span className="text-[#122620] font-montserrat text-sm sm:text-base font-semibold">{property.specs.baths}</span>
                        <span className="text-[#122620] font-montserrat text-xs sm:text-sm">Baths</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#122620]/10 rounded-sm hover:bg-[#122620]/20 transition-colors duration-300">
                        <FaRulerCombined className="text-[#122620] text-lg mb-1" />
                        <span className="text-[#122620] font-montserrat text-sm sm:text-base font-semibold">{property.specs.sqft.toLocaleString()}</span>
                        <span className="text-[#122620] font-montserrat text-xs sm:text-sm">Sq.Ft</span>
                    </div>
                </div>

                <div className="mt-auto justify-center items-center flex">
                    <Link
                        to={`/properties/${property.id}`}
                        className="w-1/2 inline-block text-center bg-transparent border-2 border-[#122620] text-[#122620] px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-300 font-montserrat font-semibold tracking-wider text-xs sm:text-sm uppercase"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;