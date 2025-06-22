import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRupeeSign, FaStar } from 'react-icons/fa';
import { cloudinaryService } from '../../../services/cloudinaryService';

const FeaturedPropertyCard = ({ property, handleImageError }) => {
    // Map database fields to component expectations
    const originalImageUrl = property.images && property.images.length > 0 ? property.images[0].url : 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';

    // Use Cloudinary service to get optimized image URL
    const imageUrl = cloudinaryService.isCloudinaryUrl(originalImageUrl)
        ? cloudinaryService.getLowCreditThumbnailUrl(originalImageUrl, 600, 400)
        : originalImageUrl;

    const price = property.price ? `$${property.price.toLocaleString()}` : 'Price on request';
    const location = property.location ? `${property.location.city}, ${property.location.state}` : 'Location not specified';
    const bedrooms = property.bedrooms || 0;
    const bathrooms = property.bathrooms || 0;
    const livingArea = property.livingArea || 'N/A';

    return (
        <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                    <img
                        src={imageUrl}
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

                <div className="p-6 lg:p-8 flex flex-col justify-center bg-[#1a3830]">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-source-serif group-hover:text-[#D6AD60] transition-colors duration-300">
                        {property.title}
                    </h3>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="flex flex-col items-center p-3 bg-[#122620]/50 rounded-lg hover:bg-[#122620]/70 transition-colors duration-300">
                            <FaBed className="text-[#D6AD60] text-xl mb-2" />
                            <span className="text-[#D6AD60] font-montserrat font-bold text-lg">{bedrooms}</span>
                            <span className="text-[#D6AD60]/80 font-montserrat text-sm">Bedrooms</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-[#122620]/50 rounded-lg hover:bg-[#122620]/70 transition-colors duration-300">
                            <FaBath className="text-[#D6AD60] text-xl mb-2" />
                            <span className="text-[#D6AD60] font-montserrat font-bold text-lg">{bathrooms}</span>
                            <span className="text-[#D6AD60]/80 font-montserrat text-sm">Bathrooms</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-[#122620]/50 rounded-lg hover:bg-[#122620]/70 transition-colors duration-300">
                            <FaRulerCombined className="text-[#D6AD60] text-xl mb-2" />
                            <span className="text-[#D6AD60] font-montserrat font-bold text-lg">{livingArea}</span>
                            <span className="text-[#D6AD60]/80 font-montserrat text-sm">Sq.Ft</span>
                        </div>
                    </div>

                    <p className="text-gray-300 mb-6 font-montserrat leading-relaxed">
                        Experience luxury living at its finest. This stunning property offers modern amenities,
                        elegant design, and a prime location that's perfect for your lifestyle.
                    </p>

                    <Link
                        to={`/propertyDet?id=${property.id}`}
                        className="inline-block w-full text-center bg-[#D6AD60] text-[#122620] px-8 py-4 rounded-lg font-montserrat font-bold text-lg transition-all duration-300 hover:bg-[#E5BE90] hover:scale-105 transform"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPropertyCard; 