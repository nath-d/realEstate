import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [favoritesSet, setFavoritesSet] = useState(new Set()); // For O(1) lookup

    // Check authentication and load favorites on mount
    useEffect(() => {
        const checkAuthAndLoadFavorites = async () => {
            const token = authService.getToken();
            const user = authService.getUser();
            const authenticated = !!(token && user);

            setIsAuthenticated(authenticated);
            console.log('FavoritesContext: Auth check - Token:', !!token, 'User:', !!user, 'Authenticated:', authenticated);

            if (authenticated) {
                try {
                    console.log('FavoritesContext: Loading favorites...');
                    const result = await authService.getFavoriteProperties();
                    console.log('FavoritesContext: API result:', result);

                    if (result.success && result.properties) {
                        setFavorites(result.properties);
                        // Create a Set for O(1) lookup performance
                        const favoritesIds = new Set(result.properties.map(prop => prop.id));
                        setFavoritesSet(favoritesIds);
                        console.log('FavoritesContext: Set favorites:', result.properties.length, 'IDs:', Array.from(favoritesIds));
                    } else {
                        console.error('FavoritesContext: Failed to load favorites:', result.error);
                        setFavorites([]);
                        setFavoritesSet(new Set());
                    }
                } catch (error) {
                    console.error('FavoritesContext: Error loading favorites:', error);
                    setFavorites([]);
                    setFavoritesSet(new Set());
                }
            } else {
                setFavorites([]);
                setFavoritesSet(new Set());
            }
            setLoading(false);
        };

        checkAuthAndLoadFavorites();
    }, []);

    // Listen for authentication changes
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'mg_pacific_token' || e.key === 'mg_pacific_user') {
                console.log('FavoritesContext: Storage changed, rechecking auth...');
                const token = authService.getToken();
                const user = authService.getUser();
                const authenticated = !!(token && user);

                if (authenticated !== isAuthenticated) {
                    console.log('FavoritesContext: Auth state changed from', isAuthenticated, 'to', authenticated);
                    setIsAuthenticated(authenticated);

                    if (authenticated) {
                        // Reload favorites when user becomes authenticated
                        loadFavorites();
                    } else {
                        // Clear favorites when user logs out
                        setFavorites([]);
                        setFavoritesSet(new Set());
                    }
                }
            }
        };

        const handleAuthStateChange = (e) => {
            console.log('FavoritesContext: Auth state change event received:', e.detail);
            const { authenticated, user } = e.detail;

            if (authenticated !== isAuthenticated) {
                console.log('FavoritesContext: Auth state changed from', isAuthenticated, 'to', authenticated);
                setIsAuthenticated(authenticated);

                if (authenticated) {
                    // Reload favorites when user becomes authenticated
                    loadFavorites();
                } else {
                    // Clear favorites when user logs out
                    setFavorites([]);
                    setFavoritesSet(new Set());
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authStateChanged', handleAuthStateChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authStateChanged', handleAuthStateChange);
        };
    }, [isAuthenticated]);

    // Load favorites function
    const loadFavorites = async () => {
        try {
            console.log('FavoritesContext: Loading favorites...');
            const result = await authService.getFavoriteProperties();
            console.log('FavoritesContext: Load result:', result);

            if (result.success && result.properties) {
                setFavorites(result.properties);
                const favoritesIds = new Set(result.properties.map(prop => prop.id));
                setFavoritesSet(favoritesIds);
                console.log('FavoritesContext: Updated favorites:', result.properties.length);
            }
        } catch (error) {
            console.error('FavoritesContext: Error loading favorites:', error);
        }
    };

    // Add property to favorites - Optimized for speed
    const addToFavorites = async (propertyId) => {
        console.log('FavoritesContext: Adding to favorites:', propertyId);

        if (!isAuthenticated) {
            console.log('FavoritesContext: User not authenticated');
            return { success: false, error: 'User not authenticated' };
        }

        // Optimistic update for instant feedback
        const propertyIdInt = parseInt(propertyId);
        if (!favoritesSet.has(propertyIdInt)) {
            setFavoritesSet(prev => new Set([...prev, propertyIdInt]));
            console.log('FavoritesContext: Optimistic add - property added to set');
        }

        try {
            const result = await authService.addToFavorites(propertyId);
            console.log('FavoritesContext: Add API result:', result);

            if (result.success) {
                // Reload favorites to get the full property data
                await loadFavorites();
                console.log('Property added to favorites successfully');
            } else {
                // Revert optimistic update on failure
                setFavoritesSet(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(propertyIdInt);
                    return newSet;
                });
                console.log('FavoritesContext: Reverted optimistic update due to API failure');
            }
            return result;
        } catch (error) {
            // Revert optimistic update on error
            setFavoritesSet(prev => {
                const newSet = new Set(prev);
                newSet.delete(propertyIdInt);
                return newSet;
            });
            console.error('FavoritesContext: Error adding to favorites:', error);
            return { success: false, error: error.message };
        }
    };

    // Remove property from favorites - Optimized for speed
    const removeFromFavorites = async (propertyId) => {
        console.log('FavoritesContext: Removing from favorites:', propertyId);

        if (!isAuthenticated) {
            console.log('FavoritesContext: User not authenticated');
            return { success: false, error: 'User not authenticated' };
        }

        // Optimistic update for instant feedback
        const propertyIdInt = parseInt(propertyId);
        if (favoritesSet.has(propertyIdInt)) {
            setFavoritesSet(prev => {
                const newSet = new Set(prev);
                newSet.delete(propertyIdInt);
                return newSet;
            });
            console.log('FavoritesContext: Optimistic remove - property removed from set');
        }

        try {
            const result = await authService.removeFromFavorites(propertyId);
            console.log('FavoritesContext: Remove API result:', result);

            if (result.success) {
                // Update local state to remove the property
                setFavorites(prev => prev.filter(property => property.id !== propertyIdInt));
                console.log('Property removed from favorites successfully');
            } else {
                // Revert optimistic update on failure
                setFavoritesSet(prev => new Set([...prev, propertyIdInt]));
                console.log('FavoritesContext: Reverted optimistic update due to API failure');
            }
            return result;
        } catch (error) {
            // Revert optimistic update on error
            setFavoritesSet(prev => new Set([...prev, propertyIdInt]));
            console.error('FavoritesContext: Error removing from favorites:', error);
            return { success: false, error: error.message };
        }
    };

    // Check if a property is in favorites - O(1) lookup using Set
    const isPropertyFavorite = (propertyId) => {
        const isFav = favoritesSet.has(parseInt(propertyId));
        return isFav;
    };

    // Get all favorite properties
    const getFavoriteProperties = () => {
        return favorites;
    };

    // Refresh favorites from server
    const refreshFavorites = async () => {
        if (!isAuthenticated) return;
        await loadFavorites();
    };

    const value = {
        favorites,
        loading,
        isAuthenticated,
        addToFavorites,
        removeFromFavorites,
        isPropertyFavorite,
        getFavoriteProperties,
        refreshFavorites,
    };

    return (
        <FavoritesContext.Provider value={value} data-testid="favorites-provider">
            {children}
        </FavoritesContext.Provider>
    );
}; 