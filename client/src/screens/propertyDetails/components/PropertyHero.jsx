import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShare, FaMapMarkerAlt } from 'react-icons/fa';
import { useFavorites } from '../../../contexts/FavoritesContext.jsx';
import '../styles/fonts.css';

const PropertyHero = ({ property }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { isPropertyFavorite, addToFavorites, removeFromFavorites, isAuthenticated } = useFavorites();

    const isFavorite = isPropertyFavorite(property.id);

    const handleFavoriteClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            // Redirect to login if not authenticated
            window.location.href = '/login';
            return;
        }

        setIsLoading(true);
        try {
            if (isFavorite) {
                const result = await removeFromFavorites(property.id);
                if (result.success) {
                    console.log('Property removed from favorites');
                } else {
                    console.error('Failed to remove from favorites:', result.error);
                }
            } else {
                const result = await addToFavorites(property.id);
                if (result.success) {
                    console.log('Property added to favorites');
                } else {
                    console.error('Failed to add to favorites:', result.error);
                }
            }
        } catch (error) {
            console.error('Error handling favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: `Check out this amazing property: ${property.title}`,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="relative h-[60vh] sm:h-[70vh] lg:h-[75vh] overflow-hidden">
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
                <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                            <span className="px-3 py-1 sm:px-4 sm:py-2 bg-[#E5BE90] text-[#122620] rounded-full font-montserrat font-semibold text-xs sm:text-sm tracking-wider">
                                Featured
                            </span>
                            <span className="px-3 py-1 sm:px-4 sm:py-2 bg-[#1A332C] text-white rounded-full font-montserrat text-xs sm:text-sm tracking-wider">
                                For Sale
                            </span>
                        </div>

                        <h1 className="heading-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white leading-tight">
                            {property.title}
                        </h1>

                        <p className="accent-text text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 text-gray-200 flex items-start sm:items-center gap-2 sm:gap-4">
                            <span className="text-[#E5BE90] flex-shrink-0 mt-1 sm:mt-0"><FaMapMarkerAlt /></span>
                            <span className="break-words">{property.address}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                            <p className="price-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#E5BE90]">
                                ₹ {property.price?.toString().replace(/[$₹]/g, '').trim()}
                            </p>
                            <div className="flex gap-3 sm:gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleFavoriteClick}
                                    disabled={isLoading}
                                    className={`p-3 sm:p-4 rounded-full transition-all duration-300 transform hover:scale-105 z-10 ${isFavorite
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-[#1A332C] hover:bg-[#E5BE90] text-white'
                                        } ${isLoading ? 'opacity-50' : ''}`}
                                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                                >
                                    <FaHeart className={`text-lg sm:text-xl ${isFavorite ? 'fill-current' : ''}`} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleShare}
                                    className="p-3 sm:p-4 bg-[#1A332C] hover:bg-[#E5BE90] text-white rounded-full transition-all duration-300 transform hover:scale-105"
                                    title="Share property"
                                >
                                    <FaShare className="text-lg sm:text-xl" />
                                </motion.button>
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