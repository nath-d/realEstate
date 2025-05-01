import React, { useEffect, useState, useLayoutEffect } from 'react'
import Navbar from '../homepage/components/Navbar'
import PropertyListingCard from './components/PropertyListingCard'
import { Search, MapPin, Home, DollarSign, ArrowDownUp, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

const properties = [
    {
        id: 1,
        title: "Luxury Villa",
        image: "/propertyOne.jpg",
        price: "2,50,00,000",
        location: "Beverly Hills, CA",
        featured: true,
        specs: { beds: 1, baths: 3, sqft: 3500 }
    },
    {
        id: 2,
        title: "Modern Apartment",
        image: "/propertyOne.jpg",
        price: "1,20,00,000",
        location: "Downtown, NY",
        featured: false,
        specs: { beds: 2, baths: 2, sqft: 1200 }
    },
    {
        id: 3,
        title: "Beachfront House",
        image: "/propertyTwo.jpg",
        price: "3,75,00,000",
        location: "Miami Beach, FL",
        featured: true,
        specs: { beds: 3, baths: 4, sqft: 4200 }
    },
    {
        id: 4,
        title: "Mountain View Cabin",
        image: "/propertyThree.jpg",
        price: "1,85,00,000",
        location: "Aspen, CO",
        featured: false,
        specs: { beds: 4, baths: 2, sqft: 1800 }
    },
    {
        id: 5,
        title: "City Penthouse",
        image: "/propertyFour.jpg",
        price: "4,20,00,000",
        location: "Chicago, IL",
        featured: true,
        specs: { beds: 5, baths: 3, sqft: 2800 }
    },
    {
        id: 6,
        title: "Luxury Condo",
        image: "/propertyTwo.jpg",
        price: "3,90,00,000",
        location: "San Francisco, CA",
        featured: false,
        specs: { beds: 6, baths: 2, sqft: 2200 }
    },
    {
        id: 7,
        title: "Waterfront Estate",
        image: "/propertyThree.jpg",
        price: "5,50,00,000",
        location: "Seattle, WA",
        featured: true,
        specs: { beds: 7, baths: 5, sqft: 4800 }
    },
    {
        id: 8,
        title: "Land Project",
        image: "/propertyThree.jpg",
        price: "1,00,00,000",
        location: "Seattle, WA",
        featured: true,
        specs: { beds: 1, baths: 1, sqft: 2800 }
    }
]

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }

// Define page fade-in with stagger
const pageVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.15, duration: 0.5 } } }

const PropertyListings = () => {
    // Prevent white flash by setting body background before paint
    useLayoutEffect(() => {
        document.body.style.backgroundColor = '#122620'
        return () => { document.body.style.backgroundColor = '' }
    }, [])
    const [listing, setListing] = useState([])
    const [filteredListings, setFilteredListings] = useState([])
    const [showFilters, setShowFilters] = useState(false)
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

    useEffect(() => {
        setListing(properties)
        setFilteredListings(properties)
    }, [])

    useEffect(() => {
        applyFilters()
    }, [filters, listing])

    const applyFilters = () => {
        let filtered = [...listing]

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
    }

    const handleImageError = (e) => {
        e.target.src = 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    }

    return (
        <motion.div variants={pageVariants} initial="hidden" animate="visible" className="min-h-screen bg-[#122620]" style={{ backgroundColor: '#122620' }}>
            <Navbar />
            {/* Enhanced Banner with Text Overlay */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <img
                    src="/hero2.jpg"
                    alt="property"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 text-center px-4 sm:px-6 md:px-8">
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-cardo mb-4 font-semibold text-[#D6AD60]">
                        Find Your Dream Property
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
                        Discover exclusive listings tailored to your lifestyle
                    </motion.p>
                </div>
            </div>

            {/* Sophisticated Search Bar */}
            <motion.div variants={itemVariants} className="bg-[white] shadow-lg rounded-lg mx-4 md:mx-8 lg:mx-auto max-w-6xl p-6 -mt-12 relative z-20 border-4 border-[#D6AD60]">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-[#D6AD60]" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search properties..."
                            className="pl-10 pr-4 py-3 w-full border border-[#D6AD60]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/70"
                        />
                    </div>
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-[#D6AD60]" />
                        </div>
                        <input
                            type="text"
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            placeholder="Location"
                            className="pl-10 pr-4 py-3 w-full border border-[#D6AD60]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6AD60]/70"
                        />
                    </div>
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center justify-center px-4 py-3 bg-[#D6AD60] text-white rounded-md hover:bg-[#D6AD60]/80 transition-colors"
                        >
                            <Filter className="h-5 w-5 mr-2" />
                            Advanced Filters
                        </button>
                    </div>
                </div>

                {/* Advanced Filters Section */}
                {showFilters && (
                    <div className="mt-6 border-t border-[#D6AD60]/20 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">Min Price</label>
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
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/40 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/70"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">Max Price</label>
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
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/40 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/70"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">Min Bedrooms</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Home className="h-4 w-4 text-[#D6AD60]" />
                                    </div>
                                    <select
                                        name="minBeds"
                                        value={filters.minBeds}
                                        onChange={handleFilterChange}
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/40 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/70"
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
                                <label className="mb-1 text-sm font-medium text-gray-700">Min Bathrooms</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Home className="h-4 w-4 text-[#D6AD60]" />
                                    </div>
                                    <select
                                        name="minBaths"
                                        value={filters.minBaths}
                                        onChange={handleFilterChange}
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/40 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/70"
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

                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <label className="mb-1 text-sm font-medium text-gray-700">Sort By</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ArrowDownUp className="h-4 w-4 text-[#D6AD60]" />
                                    </div>
                                    <select
                                        name="sortBy"
                                        value={filters.sortBy}
                                        onChange={handleFilterChange}
                                        className="pl-10 pr-4 py-2 w-full border border-[#D6AD60]/40 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D6AD60]/70"
                                    >
                                        <option value="default">Default</option>
                                        <option value="price-asc">Price (Low to High)</option>
                                        <option value="price-desc">Price (High to Low)</option>
                                        <option value="size-asc">Size (Small to Large)</option>
                                        <option value="size-desc">Size (Large to Small)</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 border border-[#D6AD60] text-[#D6AD60] rounded-md hover:bg-[#D6AD60]/10 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Property Listings */}
            <div className="max-w-[95rem] container mx-auto px-4 py-16">
                <h2 className="text-3xl font-source-serif text-[#D6AD60] mb-4">
                    {filteredListings.length} Properties Found
                </h2>

                {filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
                        {filteredListings.map((property) => (
                            <motion.div key={property.id} variants={itemVariants}>
                                <PropertyListingCard
                                    property={property}
                                    handleImageError={handleImageError}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-xl text-gray-600 mb-4">No properties match your search criteria</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-[#D6AD60] text-white rounded-md hover:bg-[#D6AD60]/80 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default PropertyListings