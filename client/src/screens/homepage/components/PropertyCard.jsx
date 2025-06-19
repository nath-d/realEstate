import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRupeeSign, FaStar } from 'react-icons/fa';

const PropertyCard = ({ property, handleImageError }) => {
    // Map database fields to component expectations
    const imageUrl = property.images && property.images.length > 0 ? property.images[0].url : 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';
    const price = property.price ? `$${property.price.toLocaleString()}` : 'Price on request';
    const location = property.location ? `${property.location.city}, ${property.location.state}` : 'Location not specified';
    const bedrooms = property.bedrooms || 0;
    const bathrooms = property.bathrooms || 0;
    const livingArea = property.livingArea || 'N/A';

    return (
        <div className="h-full flex flex-col transition-all duration-500 rounded-lg overflow-hidden bg-[#1a3830]">
            <div className="relative h-80 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={property.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500" />

                {property.featured && (
                    <div className="absolute top-4 left-4 bg-[#D6AD60] text-[#122620] px-3 py-1 rounded-sm flex items-center shadow-md">
                        <FaStar className="mr-1 text-sm" />
                        <span className="font-montserrat text-xs font-bold">Featured</span>
                    </div>
                )}

                <div className="absolute top-4 right-4 bg-[#D6AD60] text-[#122620] px-4 py-2 rounded-sm transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500 shadow-md">
                    <div className="flex items-center font-montserrat font-bold">
                        <FaRupeeSign className="text-sm" />
                        <span>{price}</span>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center font-montserrat text-sm">
                        <FaMapMarkerAlt className="mr-2 text-[#D6AD60]" />
                        <span>{location}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-source-serif text-[#D6AD60] mb-3 border-b border-[#D6AD60]/20 pb-2">
                    {property.title}
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="flex flex-col items-center p-2 bg-[#122620]/50 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
                        <FaBed className="text-[#D6AD60] text-lg mb-1" />
                        <span className="text-[#D6AD60]/90 font-montserrat text-sm">{bedrooms}</span>
                        <span className="text-[#D6AD60]/60 font-montserrat text-xs md:text-sm">Bedrooms</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#122620]/50 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
                        <FaBath className="text-[#D6AD60] text-lg mb-1" />
                        <span className="text-[#D6AD60]/90 font-montserrat text-sm">{bathrooms}</span>
                        <span className="text-[#D6AD60]/60 font-montserrat text-xs md:text-sm">Bathrooms</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#122620]/50 rounded-sm hover:bg-[#122620]/70 transition-colors duration-300">
                        <FaRulerCombined className="text-[#D6AD60] text-lg mb-1" />
                        <span className="text-[#D6AD60]/90 font-montserrat text-sm">{livingArea}</span>
                        <span className="text-[#D6AD60]/60 font-montserrat text-xs md:text-sm">Sq.Ft</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <Link
                        to={`/propertyDet?id=${property.id}`}
                        className="inline-block w-full text-center bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-6 py-3 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard; 