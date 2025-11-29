import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import Navbar from '../homepage/components/Navbar'
import PropertyListingCard from './components/PropertyListingCard'
import { Search, MapPin, Home, DollarSign, ArrowDownUp, Filter, Star, Waves, Mountain, Hotel, LandPlot } from 'lucide-react'
import { motion } from 'framer-motion'
import PropertyCard from './components/PropertyListingCard'
import Footer from '../homepage/components/Footer'
import { propertyService } from '../../services/propertyService'

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    hover: {
        scale: 1.03,
        transition: {
            duration: 0.3
        }
    }
}

const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1,
            duration: 0.6
        }
    }
}

const PropertyListings = () => {
    useLayoutEffect(() => {
        document.body.style.backgroundColor = '#122620'
        return () => { document.body.style.backgroundColor = '' }
    }, [])

    // Ref for properties section
    const propertiesSectionRef = useRef(null)

    const [listing, setListing] = useState([])
    const [filteredListings, setFilteredListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [activeType, setActiveType] = useState('all')
    const [activeCardId, setActiveCardId] = useState(null)
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        minPrice: '',
        maxPrice: '',
        minBeds: '',
        minBaths: '',
        propertyType: '',
        sortBy: 'default'
    })

    const propertyTypes = [
        { value: 'all', label: 'All', icon: <Home size={20} /> },
        { value: 'house', label: 'Houses', icon: <Home size={20} /> },
        { value: 'apartment', label: 'Apartments', icon: <Hotel size={20} /> },
        { value: 'villa', label: 'Villas', icon: <Star size={20} /> },
        { value: 'penthouse', label: 'Penthouses', icon: <Home size={20} /> }
    ]

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await propertyService.getAllProperties();
                console.log('PropertyListings: Fetched properties:', data);
                console.log('PropertyListings: First property structure:', data[0]);
                setListing(data);
                setFilteredListings(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching properties:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [])

    useEffect(() => {
        applyFilters()
    }, [filters, listing, activeType])

    const applyFilters = () => {
        let filtered = [...listing]

        console.log('PropertyListings: Applying filters with', filtered.length, 'properties');
        console.log('PropertyListings: Sample property structure:', filtered[0]);

        // Apply property type filter
        if (activeType !== 'all') {
            filtered = filtered.filter(property => property.type === activeType)
            console.log('PropertyListings: After type filter:', filtered.length, 'properties');
        }

        // Apply search filter
        if (filters.search) {
            filtered = filtered.filter(property => {
                const searchTerm = filters.search.toLowerCase();
                const title = property.title?.toLowerCase() || '';
                const description = property.description?.toLowerCase() || '';
                const city = property.location?.city?.toLowerCase() || '';
                const state = property.location?.state?.toLowerCase() || '';
                const address = property.location?.address?.toLowerCase() || '';

                const matches = title.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    city.includes(searchTerm) ||
                    state.includes(searchTerm) ||
                    address.includes(searchTerm);

                if (matches) {
                    console.log('PropertyListings: Search match found for:', property.title);
                }

                return matches;
            })
            console.log('PropertyListings: After search filter:', filtered.length, 'properties');
        }

        // Apply location filter
        if (filters.location) {
            filtered = filtered.filter(property => {
                const locationTerm = filters.location.toLowerCase();
                const city = property.location?.city?.toLowerCase() || '';
                const state = property.location?.state?.toLowerCase() || '';
                const address = property.location?.address?.toLowerCase() || '';

                return city.includes(locationTerm) ||
                    state.includes(locationTerm) ||
                    address.includes(locationTerm);
            })
        }

        // Apply price filters
        if (filters.minPrice) {
            filtered = filtered.filter(property => {
                const propertyPrice = Number(property.price) || 0;
                return propertyPrice >= Number(filters.minPrice);
            })
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(property => {
                const propertyPrice = Number(property.price) || 0;
                return propertyPrice <= Number(filters.maxPrice);
            })
        }

        // Apply beds filter
        if (filters.minBeds) {
            filtered = filtered.filter(property => {
                const beds = Number(property.bedrooms) || 0;
                return beds >= Number(filters.minBeds);
            })
        }

        // Apply baths filter
        if (filters.minBaths) {
            filtered = filtered.filter(property => {
                const baths = Number(property.bathrooms) || 0;
                return baths >= Number(filters.minBaths);
            })
        }

        // Apply sorting
        if (filters.sortBy === 'price-asc') {
            filtered.sort((a, b) => {
                return (Number(a.price) || 0) - (Number(b.price) || 0);
            })
        } else if (filters.sortBy === 'price-desc') {
            filtered.sort((a, b) => {
                return (Number(b.price) || 0) - (Number(a.price) || 0);
            })
        } else if (filters.sortBy === 'size-asc') {
            filtered.sort((a, b) => {
                const aSize = Number(a.livingArea?.replace(/[^\d]/g, '')) || 0;
                const bSize = Number(b.livingArea?.replace(/[^\d]/g, '')) || 0;
                return aSize - bSize;
            })
        } else if (filters.sortBy === 'size-desc') {
            filtered.sort((a, b) => {
                const aSize = Number(a.livingArea?.replace(/[^\d]/g, '')) || 0;
                const bSize = Number(b.livingArea?.replace(/[^\d]/g, '')) || 0;
                return bSize - aSize;
            })
        }

        setFilteredListings(filtered)
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const clearFilters = () => {
        setFilters({
            search: '',
            location: '',
            minPrice: '',
            maxPrice: '',
            minBeds: '',
            minBaths: '',
            propertyType: '',
            sortBy: 'default'
        })
        setActiveType('all')
    }

    const handleImageError = (e) => {
        e.target.src = 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    }

    // Scroll to properties section
    const scrollToProperties = () => {
        if (propertiesSectionRef.current) {
            propertiesSectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-[#122620] overflow-hidden"
        >
            <Navbar />

            {/* Enhanced Banner with Gradient Overlay */}
            <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
                <img
                    src="/hero2.jpg"
                    alt="property"
                    className="w-full h-full object-cover object-center"
                    onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#122620] flex flex-col items-center justify-center z-10 text-center px-4 sm:px-6 md:px-8">
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cardo mb-4 sm:mb-6 font-bold text-[#D6AD60] leading-tight px-4"
                    >
                        <span className="text-white">Discover Your</span> <span className="text-[#D6AD60]">Perfect</span> <span className="text-white">Property</span>
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl md:text-2xl text-[#F4EBD0] mb-8 max-w-3xl px-4"
                    >
                        Explore our curated collection of luxury homes and investment properties
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <button 
                            onClick={scrollToProperties}
                            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#D6AD60] hover:bg-[#B68D40] text-[#122620] font-medium rounded-full transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
                        >
                            Get Started
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Sleek Floating Search Bar */}
            <motion.div
                variants={itemVariants}
                className="relative mx-4 md:mx-8 lg:mx-auto max-w-7xl -mt-8 sm:-mt-12 lg:-mt-16 z-20"
            >
                {/* Main Search Container */}
                <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500">
                    {/* Primary Search Row */}
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row items-stretch gap-4">
                            {/* Search Input */}
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#D6AD60] transition-colors duration-300" />
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="Search properties by title, description, city, state..."
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/30 focus:border-[#D6AD60] transition-all duration-300 text-gray-700 placeholder-gray-400 hover:bg-white hover:border-gray-300 focus:bg-white focus:shadow-lg"
                                />
                            </div>

                            {/* Location Input */}
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-[#D6AD60] transition-colors duration-300" />
                                </div>
                                <input
                                    type="text"
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    placeholder="Filter by city, state, or address"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/30 focus:border-[#D6AD60] transition-all duration-300 text-gray-700 placeholder-gray-400 hover:bg-white hover:border-gray-300 focus:bg-white focus:shadow-lg"
                                />
                            </div>

                            {/* Advanced Filters Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center justify-center px-6 py-4 rounded-2xl transition-all duration-300 font-medium whitespace-nowrap transform hover:scale-105 ${showFilters
                                    ? 'bg-[#D6AD60] text-white shadow-lg shadow-[#D6AD60]/25'
                                    : 'bg-gray-100 text-gray-700 hover:bg-[#D6AD60] hover:text-white hover:shadow-lg hover:shadow-[#D6AD60]/25'
                                    }`}
                            >
                                <Filter className="h-5 w-5 mr-2" />
                                <span className="hidden sm:inline">Filters</span>
                                <span className="sm:hidden">Filter</span>
                            </button>
                        </div>

                        {/* Property Type Filter Pills */}
                        <motion.div
                            className="mt-6 flex flex-wrap gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {propertyTypes.map((type, index) => (
                                <motion.button
                                    key={type.value}
                                    onClick={() => setActiveType(type.value)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 font-medium text-sm transform hover:scale-105 ${activeType === type.value
                                        ? 'bg-[#D6AD60] text-white shadow-lg shadow-[#D6AD60]/25 scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 hover:scale-105'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <span className="text-base">{type.icon}</span>
                                    <span>{type.label}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Advanced Filters Section */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white/30"
                        >
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    {/* Price Range */}
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label className="text-sm font-medium text-gray-700">Price Range</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1 group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <DollarSign className="h-4 w-4 text-gray-400 group-focus-within:text-[#D6AD60] transition-colors" />
                                                </div>
                                                <input
                                                    type="number"
                                                    name="minPrice"
                                                    value={filters.minPrice}
                                                    onChange={handleFilterChange}
                                                    placeholder="Min"
                                                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/30 focus:border-[#D6AD60] text-sm transition-all hover:border-gray-300"
                                                />
                                            </div>
                                            <div className="relative flex-1 group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <DollarSign className="h-4 w-4 text-gray-400 group-focus-within:text-[#D6AD60] transition-colors" />
                                                </div>
                                                <input
                                                    type="number"
                                                    name="maxPrice"
                                                    value={filters.maxPrice}
                                                    onChange={handleFilterChange}
                                                    placeholder="Max"
                                                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/30 focus:border-[#D6AD60] text-sm transition-all hover:border-gray-300"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Bedrooms */}
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className="text-sm font-medium text-gray-700">Bedrooms</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Home className="h-4 w-4 text-gray-400 group-focus-within:text-[#D6AD60] transition-colors" />
                                            </div>
                                            <select
                                                name="minBeds"
                                                value={filters.minBeds}
                                                onChange={handleFilterChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/30 focus:border-[#D6AD60] text-sm appearance-none transition-all hover:border-gray-300"
                                            >
                                                <option value="">Any</option>
                                                <option value="1">1+</option>
                                                <option value="2">2+</option>
                                                <option value="3">3+</option>
                                                <option value="4">4+</option>
                                                <option value="5">5+</option>
                                            </select>
                                        </div>
                                    </motion.div>

                                    {/* Bathrooms */}
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label className="text-sm font-medium text-gray-700">Bathrooms</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Home className="h-4 w-4 text-gray-400 group-focus-within:text-[#D6AD60] transition-colors" />
                                            </div>
                                            <select
                                                name="minBaths"
                                                value={filters.minBaths}
                                                onChange={handleFilterChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/30 focus:border-[#D6AD60] text-sm appearance-none transition-all hover:border-gray-300"
                                            >
                                                <option value="">Any</option>
                                                <option value="1">1+</option>
                                                <option value="2">2+</option>
                                                <option value="3">3+</option>
                                                <option value="4">4+</option>
                                                <option value="5">5+</option>
                                            </select>
                                        </div>
                                    </motion.div>

                                    {/* Sort By */}
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <label className="text-sm font-medium text-gray-700">Sort By</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <ArrowDownUp className="h-4 w-4 text-gray-400 group-focus-within:text-[#D6AD60] transition-colors" />
                                            </div>
                                            <select
                                                name="sortBy"
                                                value={filters.sortBy}
                                                onChange={handleFilterChange}
                                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/30 focus:border-[#D6AD60] text-sm appearance-none transition-all hover:border-gray-300"
                                            >
                                                <option value="default">Default</option>
                                                <option value="price-asc">Price (Low to High)</option>
                                                <option value="price-desc">Price (High to Low)</option>
                                                <option value="size-asc">Size (Small to Large)</option>
                                                <option value="size-desc">Size (Large to Small)</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Filter Actions */}
                                <motion.div
                                    className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>Active filters:</span>
                                        <span className="bg-[#D6AD60]/10 text-[#D6AD60] px-3 py-1 rounded-full text-xs font-medium">
                                            {filteredListings.length} properties
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={clearFilters}
                                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors hover:bg-gray-100 rounded-lg"
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="px-6 py-2 bg-[#D6AD60] hover:bg-[#B68D40] text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-[#D6AD60]/25 transform hover:scale-105"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Property Listings Section */}
            <div ref={propertiesSectionRef} className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-cardo font-bold text-[#D6AD60] mb-4 sm:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {loading ? 'Loading...' : `${filteredListings.length} ${activeType !== 'all' ? activeType.charAt(0).toUpperCase() + activeType.slice(1) : 'Premium'} Properties`}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center space-x-2 bg-[#D6AD60]/10 border border-[#D6AD60]/30 rounded-lg px-3 sm:px-4 py-2"
                    >
                        <span className="text-xs sm:text-sm text-[#D6AD60]">Featured properties marked with</span>
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-[#D6AD60] fill-[#D6AD60]" />
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D6AD60] mb-4"></div>
                            <p className="text-[#D6AD60]">Loading properties...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <p className="text-red-400 mb-4">Error: {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-[#D6AD60] text-[#122620] px-6 py-2 rounded hover:bg-[#C19A4F] transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : filteredListings.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setActiveCardId(null)}
                    >
                        {/* Decorative background elements */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D6AD60]/5 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-float"></div>
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#D6AD60]/5 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-float-delay"></div>

                        {filteredListings.map((property) => (
                            <div
                                key={property.id}
                                className="relative"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveCardId(activeCardId === property.id ? null : property.id);
                                }}
                            >
                                <PropertyListingCard
                                    property={property}
                                    handleImageError={handleImageError}
                                    isActive={activeCardId === property.id}
                                />
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="flex flex-col items-center justify-center py-12 sm:py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="bg-[#D6AD60]/10 p-6 sm:p-8 rounded-full mb-6">
                            <Search className="h-8 w-8 sm:h-12 sm:w-12 text-[#D6AD60]" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-medium text-[#F4EBD0] mb-2 text-center">No properties found</h3>
                        <p className="text-[#D6AD60] mb-6 text-center max-w-md text-sm sm:text-base">
                            We couldn't find any properties matching your criteria. Try adjusting your filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#D6AD60] hover:bg-[#B68D40] text-[#122620] font-medium rounded-full transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
                        >
                            Reset All Filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Call to Action Section */}
            {/* <div className="bg-gradient-to-r from-[#122620] to-[#1a342e] py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-cardo font-bold text-[#D6AD60] mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Can't Find What You're Looking For?
                    </motion.h2>
                    <motion.p
                        className="text-lg sm:text-xl text-[#F4EBD0] mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Our expert agents can help you find the perfect property tailored to your needs.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#D6AD60] hover:bg-[#B68D40] text-[#122620] font-medium rounded-full transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base w-full sm:w-auto">
                            Contact an Agent
                        </button>
                        <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#D6AD60] text-[#D6AD60] hover:bg-[#D6AD60]/10 rounded-full transition-all text-sm sm:text-base w-full sm:w-auto">
                            Schedule a Tour
                        </button>
                    </motion.div>
                </div>
            </div> */}
            <Footer />
        </motion.div>
    )
}

export default PropertyListings