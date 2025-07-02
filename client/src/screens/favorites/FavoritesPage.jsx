import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaTrash } from 'react-icons/fa';
import { useFavorites } from '../../contexts/FavoritesContext.jsx';
import { cloudinaryService } from '../../services/cloudinaryService.js';

const FavoritesPage = () => {
    const { favorites, loading, removeFromFavorites, isAuthenticated } = useFavorites();
    const [removingId, setRemovingId] = useState(null);

    const handleRemoveFavorite = async (propertyId) => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        setRemovingId(propertyId);
        try {
            const result = await removeFromFavorites(propertyId);
            if (result.success) {
                console.log('Property removed from favorites');
            } else {
                console.error('Failed to remove from favorites:', result.error);
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
        } finally {
            setRemovingId(null);
        }
    };

    const handleImageError = (e) => {
        e.target.src = 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4EBD0] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D6AD60] mx-auto"></div>
                    <p className="mt-4 text-[#122620] font-montserrat">Loading your favorites...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#F4EBD0] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <FaHeart className="text-6xl text-[#D6AD60] mx-auto mb-6" />
                    <h1 className="text-3xl font-source-serif text-[#122620] mb-4">Sign in to view favorites</h1>
                    <p className="text-[#122620] mb-6 font-montserrat">
                        You need to be signed in to save and view your favorite properties.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-[#D6AD60] text-[#122620] px-8 py-3 rounded-none font-montserrat font-semibold tracking-widest uppercase hover:bg-[#C19A4F] transition-colors duration-300"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4EBD0]">
            {/* Header */}
            <div className="bg-[#122620] py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-source-serif text-[#D6AD60] mb-4">
                            My Favorites
                        </h1>
                        <p className="text-xl text-gray-300 font-montserrat">
                            {favorites.length === 0
                                ? "You haven't saved any properties yet"
                                : `${favorites.length} property${favorites.length === 1 ? '' : 'ies'} saved`
                            }
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-12">
                {favorites.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center max-w-md mx-auto"
                    >
                        <FaHeart className="text-6xl text-[#D6AD60] mx-auto mb-6 opacity-50" />
                        <h2 className="text-2xl font-source-serif text-[#122620] mb-4">
                            No favorites yet
                        </h2>
                        <p className="text-[#122620] mb-8 font-montserrat">
                            Start exploring properties and save your favorites by clicking the heart icon.
                        </p>
                        <Link
                            to="/properties"
                            className="inline-block bg-[#D6AD60] text-[#122620] px-8 py-3 rounded-none font-montserrat font-semibold tracking-widest uppercase hover:bg-[#C19A4F] transition-colors duration-300"
                        >
                            Browse Properties
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favorites.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-64">
                                    <img
                                        src={property.images && property.images.length > 0
                                            ? (cloudinaryService.isCloudinaryUrl(property.images[0])
                                                ? cloudinaryService.getLowCreditThumbnailUrl(property.images[0], 400, 320)
                                                : property.images[0])
                                            : 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
                                        }
                                        alt={property.title || 'Property'}
                                        onError={handleImageError}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => handleRemoveFavorite(property.id)}
                                        disabled={removingId === property.id}
                                        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${removingId === property.id
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-red-500 hover:bg-red-600 cursor-pointer'
                                            } text-white`}
                                        title="Remove from favorites"
                                    >
                                        <FaTrash className="text-sm" />
                                    </button>

                                    <div className="absolute bottom-4 left-4 text-white">
                                        <div className="flex items-center font-montserrat text-sm">
                                            <FaMapMarkerAlt className="mr-2 text-[#D6AD60]" />
                                            <span>{property.location?.city || 'Unknown'}, {property.location?.state || 'Location'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-source-serif text-[#122620] mb-3 line-clamp-2">
                                        {property.title || 'Property Title'}
                                    </h3>

                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        <div className="flex flex-col items-center p-2 bg-[#F4EBD0] rounded">
                                            <FaBed className="text-[#D6AD60] text-lg mb-1" />
                                            <span className="text-[#122620] font-montserrat text-sm">{property.bedrooms || 0}</span>
                                            <span className="text-[#122620]/60 font-montserrat text-xs">Beds</span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 bg-[#F4EBD0] rounded">
                                            <FaBath className="text-[#D6AD60] text-lg mb-1" />
                                            <span className="text-[#122620] font-montserrat text-sm">{property.bathrooms || 0}</span>
                                            <span className="text-[#122620]/60 font-montserrat text-xs">Baths</span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 bg-[#F4EBD0] rounded">
                                            <FaRulerCombined className="text-[#D6AD60] text-lg mb-1" />
                                            <span className="text-[#122620] font-montserrat text-sm">{property.livingArea || 'N/A'}</span>
                                            <span className="text-[#122620]/60 font-montserrat text-xs">Sq.Ft</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-source-serif text-[#D6AD60] font-bold">
                                            ${property.price?.toLocaleString() || 'Price on request'}
                                        </p>
                                        <Link
                                            to={`/propertyDet?id=${property.id}`}
                                            className="bg-[#D6AD60] text-[#122620] px-4 py-2 rounded-none font-montserrat font-semibold text-sm tracking-wider uppercase hover:bg-[#C19A4F] transition-colors duration-300"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage; 