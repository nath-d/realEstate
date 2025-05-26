import React, { useEffect, useState, useLayoutEffect } from 'react'
import Navbar from '../homepage/components/Navbar'
import PropertyListingCard from './components/PropertyListingCard'
import { Search, MapPin, Home, DollarSign, ArrowDownUp, Filter, Star, Waves, Mountain, Hotel, LandPlot } from 'lucide-react'
import { motion } from 'framer-motion'
import PropertyCard from './components/PropertyListingCard'
import Footer from '../homepage/components/Footer'

const properties = [
    {
        id: 1,
        title: "Luxury Villa with Ocean View",
        image: "/propertyOne.jpg",
        price: "2,50,00,000",
        location: "Beverly Hills, CA",
        featured: true,
        type: "villa",
        specs: { beds: 5, baths: 3, sqft: 3500 }
    },
    {
        id: 2,
        title: "Modern Downtown Apartment",
        image: "/propertyOne.jpg",
        price: "1,20,00,000",
        location: "Downtown, NY",
        featured: false,
        type: "apartment",
        specs: { beds: 2, baths: 2, sqft: 1200 }
    },
    {
        id: 3,
        title: "Beachfront Paradise House",
        image: "/propertyTwo.jpg",
        price: "3,75,00,000",
        location: "Miami Beach, FL",
        featured: true,
        type: "house",
        specs: { beds: 3, baths: 4, sqft: 4200 }
    },
    {
        id: 4,
        title: "Alpine Mountain View Cabin",
        image: "/propertyThree.jpg",
        price: "1,85,00,000",
        location: "Aspen, CO",
        featured: false,
        type: "cabin",
        specs: { beds: 4, baths: 2, sqft: 1800 }
    },
    {
        id: 5,
        title: "Skyline Penthouse Suite",
        image: "/propertyFour.jpg",
        price: "4,20,00,000",
        location: "Chicago, IL",
        featured: true,
        type: "penthouse",
        specs: { beds: 5, baths: 3, sqft: 2800 }
    },
    {
        id: 6,
        title: "Luxury Bayview Condo",
        image: "/propertyTwo.jpg",
        price: "3,90,00,000",
        location: "San Francisco, CA",
        featured: false,
        type: "condo",
        specs: { beds: 6, baths: 2, sqft: 2200 }
    },
    {
        id: 7,
        title: "Exclusive Waterfront Estate",
        image: "/propertyThree.jpg",
        price: "5,50,00,000",
        location: "Seattle, WA",
        featured: true,
        type: "estate",
        specs: { beds: 7, baths: 5, sqft: 4800 }
    },
    {
        id: 8,
        title: "Premium Development Land",
        image: "/propertyThree.jpg",
        price: "1,00,00,000",
        location: "Seattle, WA",
        featured: true,
        type: "land",
        specs: { beds: 1, baths: 1, sqft: 2800 }
    },
    {
        id: 9,
        title: "Premium Development Land 24",
        image: "/propertyTwo.jpg",
        price: "1,70,00,000",
        location: "Kolkata, WB",
        featured: false,
        type: "land",
        specs: { beds: 3, baths: 3, sqft: 2800 }
    }
]

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

const PropertyTypeButton = ({ icon, label, active, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl transition-all w-full ${active ? 'bg-[#D6AD60] text-[#122620]' : 'bg-[#122620] text-[#D6AD60] border border-[#D6AD60]'}`}
        >
            <div className="text-xl sm:text-2xl mb-1">
                {icon}
            </div>
            <span className="text-[10px] sm:text-xs font-medium truncate">{label}</span>
        </motion.button>
    )
}

const PropertyListings = () => {
    useLayoutEffect(() => {
        document.body.style.backgroundColor = '#122620'
        return () => { document.body.style.backgroundColor = '' }
    }, [])

    const [listing, setListing] = useState([])
    const [filteredListings, setFilteredListings] = useState([])
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
        { value: 'condo', label: 'Condos', icon: <Home size={20} /> },
        { value: 'land', label: 'Land', icon: <LandPlot size={20} /> },
        { value: 'cabin', label: 'Cabins', icon: <Mountain size={20} /> },
        { value: 'estate', label: 'Estates', icon: <Star size={20} /> }
    ]

    useEffect(() => {
        setListing(properties)
        setFilteredListings(properties)
    }, [])

    useEffect(() => {
        applyFilters()
    }, [filters, listing, activeType])

    const applyFilters = () => {
        let filtered = [...listing]

        // Apply property type filter
        if (activeType !== 'all') {
            filtered = filtered.filter(property => property.type === activeType)
        }

        // Apply search filter
        if (filters.search) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                property.location.toLowerCase().includes(filters.search.toLowerCase())
            )
        }

        // Apply location filter
        if (filters.location) {
            filtered = filtered.filter(property =>
                property.location.toLowerCase().includes(filters.location.toLowerCase())
            )
        }

        // Apply price filters
        if (filters.minPrice) {
            filtered = filtered.filter(property => {
                const propertyPrice = Number(property.price.replace(/,/g, ''))
                return propertyPrice >= Number(filters.minPrice)
            })
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(property => {
                const propertyPrice = Number(property.price.replace(/,/g, ''))
                return propertyPrice <= Number(filters.maxPrice)
            })
        }

        // Apply beds filter
        if (filters.minBeds) {
            filtered = filtered.filter(property =>
                property.specs.beds >= Number(filters.minBeds)
            )
        }

        // Apply baths filter
        if (filters.minBaths) {
            filtered = filtered.filter(property =>
                property.specs.baths >= Number(filters.minBaths)
            )
        }

        // Apply sorting
        if (filters.sortBy === 'price-asc') {
            filtered.sort((a, b) => {
                return Number(a.price.replace(/,/g, '')) - Number(b.price.replace(/,/g, ''))
            })
        } else if (filters.sortBy === 'price-desc') {
            filtered.sort((a, b) => {
                return Number(b.price.replace(/,/g, '')) - Number(a.price.replace(/,/g, ''))
            })
        } else if (filters.sortBy === 'size-asc') {
            filtered.sort((a, b) => a.specs.sqft - b.specs.sqft)
        } else if (filters.sortBy === 'size-desc') {
            filtered.sort((a, b) => b.specs.sqft - a.specs.sqft)
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
                        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#D6AD60] hover:bg-[#B68D40] text-[#122620] font-medium rounded-full transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
                            Get Started
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Floating Search Bar with Glass Morphism Effect */}
            <motion.div
                variants={itemVariants}
                className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl mx-4 md:mx-8 lg:mx-auto max-w-6xl p-4 sm:p-6 -mt-8 sm:-mt-12 lg:-mt-16 relative z-20 border border-[#D6AD60]/30"
            >
                <div className="flex flex-col md:flex-row items-stretch space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-[#D6AD60]" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search properties..."
                            className="pl-10 pr-4 py-2.5 sm:py-3 w-full border border-[#D6AD60]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/50 focus:border-transparent bg-white/80 text-sm sm:text-base"
                        />
                    </div>
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#D6AD60]" />
                        </div>
                        <input
                            type="text"
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            placeholder="Location"
                            className="pl-10 pr-4 py-2.5 sm:py-3 w-full border border-[#D6AD60]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/50 focus:border-transparent bg-white/80 text-sm sm:text-base"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-[#D6AD60] hover:bg-[#B68D40] text-white rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
                    >
                        <Filter className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Advanced Filters
                    </button>
                </div>

                {/* Property Type Filter Chips */}
                <motion.div
                    className="mt-4 sm:mt-6 grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {propertyTypes.map((type) => (
                        <PropertyTypeButton
                            key={type.value}
                            icon={type.icon}
                            label={type.label}
                            active={activeType === type.value}
                            onClick={() => setActiveType(type.value)}
                        />
                    ))}
                </motion.div>

                {/* Advanced Filters Section */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 sm:mt-6 border-t border-[#D6AD60]/20 pt-4 sm:pt-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex flex-col">
                                <label className="mb-1 text-xs sm:text-sm font-medium text-gray-700">Min Price</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-4 w-4 text-[#D6AD60]" />
                                    </div>
                                    <input
                                        type="number"
                                        name="minPrice"
                                        value={filters.minPrice}
                                        onChange={handleFilterChange}
                                        placeholder="Min Price"
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/50 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-xs sm:text-sm font-medium text-gray-700">Max Price</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-4 w-4 text-[#D6AD60]" />
                                    </div>
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        placeholder="Max Price"
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/50 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-xs sm:text-sm font-medium text-gray-700">Min Bedrooms</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Home className="h-4 w-4 text-[#D6AD60]" />
                                    </div>
                                    <select
                                        name="minBeds"
                                        value={filters.minBeds}
                                        onChange={handleFilterChange}
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/50 text-sm appearance-none"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1+</option>
                                        <option value="2">2+</option>
                                        <option value="3">3+</option>
                                        <option value="4">4+</option>
                                        <option value="5">5+</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-xs sm:text-sm font-medium text-gray-700">Min Bathrooms</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Home className="h-4 w-4 text-[#D6AD60]" />
                                    </div>
                                    <select
                                        name="minBaths"
                                        value={filters.minBaths}
                                        onChange={handleFilterChange}
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/50 text-sm appearance-none"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1+</option>
                                        <option value="2">2+</option>
                                        <option value="3">3+</option>
                                        <option value="4">4+</option>
                                        <option value="5">5+</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <div className="w-full sm:w-1/3">
                                <label className="mb-1 text-xs sm:text-sm font-medium text-gray-700">Sort By</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ArrowDownUp className="h-4 w-4 text-[#D6AD60]" />
                                    </div>
                                    <select
                                        name="sortBy"
                                        value={filters.sortBy}
                                        onChange={handleFilterChange}
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/50 text-sm appearance-none bg-white"
                                    >
                                        <option value="default">Default</option>
                                        <option value="price-asc">Price (Low to High)</option>
                                        <option value="price-desc">Price (High to Low)</option>
                                        <option value="size-asc">Size (Small to Large)</option>
                                        <option value="size-desc">Size (Large to Small)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={clearFilters}
                                    className="px-4 sm:px-6 py-2 border-2 border-[#D6AD60] text-[#D6AD60] hover:bg-[#D6AD60]/10 rounded-lg transition-all text-sm sm:text-base"
                                >
                                    Reset All
                                </button>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="px-4 sm:px-6 py-2 bg-[#122620] hover:bg-[#0A1A14] text-white rounded-lg transition-all shadow-md text-sm sm:text-base"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Property Listings Section */}
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-cardo font-bold text-[#D6AD60] mb-4 sm:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {filteredListings.length} {activeType !== 'all' ? activeType.charAt(0).toUpperCase() + activeType.slice(1) : 'Premium'} Properties
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

                {filteredListings.length > 0 ? (
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
            <div className="bg-gradient-to-r from-[#122620] to-[#1a342e] py-12 sm:py-16">
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
            </div>
            <Footer />
        </motion.div>
    )
}

export default PropertyListings