import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRupeeSign, FaStar } from 'react-icons/fa';

const FeaturedPropertyCard = ({ property, handleImageError }) => {
    return (
        <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                    <img
                        src={property.image}
                        alt={property.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500" />

                    <div className="absolute top-4 left-4 bg-[#D6AD60] text-[#122620] px-3 py-1 rounded-sm flex items-center shadow-md">
                        <FaStar className="mr-1 text-sm" />
                        <span className="font-montserrat text-xs font-bold">FEATURED</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-[#D6AD60] text-[#122620] px-4 py-2 rounded-sm transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500 shadow-md">
                        <div className="flex items-center font-montserrat font-bold">
                            <FaRupeeSign className="text-sm" />
                            <span>{property.price}</span>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center font-montserrat text-sm">
                            <FaMapMarkerAlt className="mr-2 text-[#D6AD60]" />
                            <span>{property.location}</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-[#1a3830] flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-source-serif text-[#D6AD60] mb-4 border-b border-[#D6AD60]/20 pb-2">
                            {property.title}
                        </h3>

                        <p className="text-[#D6AD60]/80 font-montserrat mb-6">
                            Experience luxury living at its finest with this exceptional property featuring stunning views and premium amenities.
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="flex flex-col items-center p-3 bg-[#122620]/50 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
                                <FaBed className="text-[#D6AD60] text-xl mb-1" />
                                <span className="text-[#D6AD60]/90 font-montserrat text-sm">{property.specs.beds}</span>
                                <span className="text-[#D6AD60]/60 font-montserrat text-xs">Bedrooms</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-[#122620]/50 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
                                <FaBath className="text-[#D6AD60] text-xl mb-1" />
                                <span className="text-[#D6AD60]/90 font-montserrat text-sm">{property.specs.baths}</span>
                                <span className="text-[#D6AD60]/60 font-montserrat text-xs">Bathrooms</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-[#122620]/50 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
                                <FaRulerCombined className="text-[#D6AD60] text-xl mb-1" />
                                <span className="text-[#D6AD60]/90 font-montserrat text-sm">{property.specs.sqft.toLocaleString()}</span>
                                <span className="text-[#D6AD60]/60 font-montserrat text-xs">Sq.Ft</span>
                            </div>
                        </div>
                    </div>

                    <Link
                        to={`/properties/${property.id}`}
                        className="inline-block w-full text-center bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-6 py-3 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPropertyCard; 