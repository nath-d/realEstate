import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShare } from 'react-icons/fa';
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
        <div className="relative h-[75vh] overflow-hidden">
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
                                ₹ {property.price?.toString().replace(/[$₹]/g, '').trim()}
                            </p>
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleFavoriteClick}
                                    disabled={isLoading}
                                    className={`p-4 rounded-full transition-all duration-300 transform hover:scale-105 z-10 ${isFavorite
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-[#1A332C] hover:bg-[#E5BE90] text-white'
                                        } ${isLoading ? 'opacity-50' : ''}`}
                                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                                >
                                    <FaHeart className={`text-xl ${isFavorite ? 'fill-current' : ''}`} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleShare}
                                    className="p-4 bg-[#1A332C] hover:bg-[#E5BE90] text-white rounded-full transition-all duration-300 transform hover:scale-105"
                                    title="Share property"
                                >
                                    <FaShare className="text-xl" />
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