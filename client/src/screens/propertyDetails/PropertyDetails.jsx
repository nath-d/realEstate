import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaHeart, FaShare, FaCalculator, FaCalendarAlt, FaMapMarkerAlt, FaHistory, FaBuilding, FaBed, FaBath, FaRuler, FaCar, FaTree, FaSun, FaPhone, FaVideo } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropertyHero from './components/PropertyHero';
import PropertyStats from './components/PropertyStats';
import PropertyDescription from './components/PropertyDescription';
import PropertyGallery from './components/PropertyGallery';
import PropertyAmenities from './components/PropertyAmenities';
import PropertyLocation from './components/PropertyLocation';
import PropertyAgent from './components/PropertyAgent';
import MortgageCalculator from './components/MortgageCalculator';
import VirtualTour from './components/VirtualTour';
import SimilarProperties from './components/SimilarProperties';
import ScheduleVisit from './components/ScheduleVisit';
import ScheduleVideoChat from './components/ScheduleVideoChat';
import PropertyHistory from './components/PropertyHistory';
import NeighborhoodInsights from './components/NeighborhoodInsights';
import MaterialCertifications from './components/MaterialCertifications';
import PropertySpecifications from './components/PropertySpecifications';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';
import { propertyService } from '../../services/propertyService';
import SEOHelmet from '../../components/SEO/SEOHelmet';
import { generatePropertySEO } from '../../utils/seoUtils';

const PropertyDetails = () => {
    const [searchParams] = useSearchParams();
    const propertyId = searchParams.get('id');
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showMortgageCalculator, setShowMortgageCalculator] = useState(false);
    const [showScheduleVisit, setShowScheduleVisit] = useState(false);
    const [showScheduleVideoChat, setShowScheduleVideoChat] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [randomProperties, setRandomProperties] = useState([]);

    useEffect(() => {
        const fetchProperty = async () => {
            if (!propertyId) {
                setError('No property ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await propertyService.getPropertyById(propertyId);
                setProperty(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching property:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [propertyId]);

    useEffect(() => {
        const fetchRandomProperties = async () => {
            try {
                const data = await propertyService.getRandomProperties(3);
                // Transform data once here to avoid re-computation on every render
                const transformedProperties = data.map(property => ({
                    id: property.id,
                    title: property.title,
                    price: property.price ? `$${property.price.toLocaleString()}` : 'Price on request',
                    address: property.location ?
                        `${property.location.address}, ${property.location.city}, ${property.location.state} ${property.location.zipCode}` :
                        'Address not available',
                    image: property.images && property.images.length > 0 ?
                        property.images[0].url :
                        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
                    details: {
                        bedrooms: property.bedrooms || 0,
                        bathrooms: property.bathrooms || 0,
                        livingArea: property.livingArea || 'N/A'
                    }
                }));
                setRandomProperties(transformedProperties);
            } catch (err) {
                console.error('Error fetching random properties:', err);
                setRandomProperties([]); // Ensure empty array on error
            }
        };

        fetchRandomProperties();
    }, [propertyId]); // Re-fetch when propertyId changes to get fresh recommendations

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = () => {
        if (navigator.share && property) {
            navigator.share({
                title: property.title,
                text: `Check out this amazing property: ${property.title}`,
                url: window.location.href
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#122620] text-white flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#D6AD60] mb-4"></div>
                    <p className="text-sm sm:text-base">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-[#122620] text-white flex items-center justify-center px-4">
                <div className="text-center max-w-md mx-auto">
                    <p className="text-red-400 mb-4 text-sm sm:text-base">Error: {error || 'Property not found'}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-[#D6AD60] text-[#122620] px-4 py-2 sm:px-6 sm:py-2 rounded hover:bg-[#C19A4F] transition-colors text-sm sm:text-base"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Map database fields to component expectations
    const propertyData = {
        id: property.id,
        title: property.title,
        price: property.price ? `$${property.price.toLocaleString()}` : 'Price on request',
        address: property.location ? `${property.location.address}, ${property.location.city}, ${property.location.state} ${property.location.zipCode}` : 'Address not available',
        description: property.description,
        details: {
            bedrooms: property.bedrooms || 0,
            bathrooms: property.bathrooms || 0,
            garage: property.garage || 0,
            lotSize: property.lotSize || 'N/A',
            livingArea: property.livingArea || 'N/A',
            yearBuilt: property.yearBuilt || 'N/A',
        },
        features: [
            "Private Beach Access",
            "Infinity Pool",
            "Wine Cellar",
            "Home Theater",
            "Smart Home System",
            "Gourmet Kitchen",
            "Elevator",
            "Solar Panels",
            "Security System",
            "Landscaped Gardens"
        ],
        images: property.images && property.images.length > 0
            ? property.images.map(img => img.url)
            : ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
        videoLink: property.videoLink || null,
        amenities: {
            interior: [
                "Custom Italian Kitchen",
                "Marble Flooring",
                "Smart Home Technology",
                "Home Theater",
                "Wine Cellar",
                "Spa-like Bathrooms",
                "Walk-in Closets",
                "Floor-to-ceiling Windows"
            ],
            exterior: [
                "Infinity Pool",
                "Outdoor Kitchen",
                "Landscaped Gardens",
                "Private Beach Access",
                "Multiple Terraces",
                "3-Car Garage",
                "Security System",
                "Solar Panels"
            ]
        },
        agent: {
            name: "Bhumika Ghosh",
            phone: "+91 9748853901",
            email: "mgconstructions1995@gmail.com",
            // image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        },
        virtualTour: "https://example.com/virtual-tour",
        similarProperties: randomProperties,
        history: {
            listedDate: "2024-01-15",
            lastSoldDate: "2020-06-20",
            lastSoldPrice: "$4,200,000",
            priceHistory: [
                { date: "2020-06-20", price: "$4,200,000" },
                { date: "2024-01-15", price: property.price ? `$${property.price.toLocaleString()}` : "Price on request" }
            ]
        },
        neighborhood: {
            walkScore: 85,
            transitScore: 75,
            bikeScore: 90,
            schools: [
                { name: "Malibu Elementary", rating: 9 },
                { name: "Malibu Middle", rating: 8 },
                { name: "Malibu High", rating: 9 }
            ],
            nearbyAmenities: [
                "Beach Access (0.1 miles)",
                "Shopping Center (0.5 miles)",
                "Restaurants (0.3 miles)",
                "Parks (0.4 miles)"
            ]
        },
        specifications: property.specifications && property.specifications.length > 0 ? property.specifications[0] : null,
        materialCertifications: property.materialCertifications || [],
        pois: property.pois || []
    };

    const seoData = property ? generatePropertySEO(property) : {};

    return (
        <div className="min-h-screen bg-[#122620] text-white">
            {property && <SEOHelmet {...seoData} />}
            <Navbar />
            {/* Enhanced Sticky Header */}
            {/* <motion.div
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollPosition > 50
                    ? 'bg-[#122620]/95 backdrop-blur-md shadow-2xl'
                    : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold tracking-tight">{propertyData.title}</h1>
                            <div className="flex items-center space-x-2 text-[#D6AD60]">
                                <FaMapMarkerAlt className="text-sm" />
                                <span className="text-sm opacity-90">{propertyData.address}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <span className="text-3xl font-bold text-[#D6AD60]">{propertyData.price}</span>
                            <div className="flex items-center space-x-3">
                                <motion.button
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`p-3 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'
                                        } hover:bg-red-600 transition-colors duration-300`}
                                >
                                    <FaHeart className="text-xl" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={setShowMortgageCalculator}
                                    className="p-3 rounded-full bg-[#D6AD60] text-[#122620] hover:text-[#F4EBD0] transition-colors duration-300"
                                >
                                    <FaCalculator className="text-xl" />
                                </motion.button>
                                <motion.button
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={setShowScheduleVisit}
                                    className="p-3 rounded-full bg-[#D6AD60] text-[#122620] hover:text-[#F4EBD0] transition-colors duration-300"
                                >
                                    <FaPhone className="text-xl" />
                                </motion.button>

                            </div>
                        </div>
                    </div>
                </div>
            </motion.div> */}

            {/* Main Content */}
            {/* <div className="pt-24"> */}
            <div className="">
                <PropertyHero property={propertyData} />
                <PropertyStats details={propertyData.details} />

                {/* Quick Stats Bar */}
                {/* <div className="bg-[#1A332C] py-6 border-t border-b border-[#D4AF37]/20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            <div className="flex items-center space-x-3">
                                <FaBed className="text-[#D4AF37] text-2xl" />
                                <div>
                                    <p className="text-sm text-gray-400">Bedrooms</p>
                                    <p className="text-lg font-semibold">{property.details.bedrooms}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaBath className="text-[#D4AF37] text-2xl" />
                                <div>
                                    <p className="text-sm text-gray-400">Bathrooms</p>
                                    <p className="text-lg font-semibold">{property.details.bathrooms}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaRuler className="text-[#D4AF37] text-2xl" />
                                <div>
                                    <p className="text-sm text-gray-400">Living Area</p>
                                    <p className="text-lg font-semibold">{property.details.livingArea}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaCar className="text-[#D4AF37] text-2xl" />
                                <div>
                                    <p className="text-sm text-gray-400">Garage</p>
                                    <p className="text-lg font-semibold">{property.details.garage} Cars</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaTree className="text-[#D4AF37] text-2xl" />
                                <div>
                                    <p className="text-sm text-gray-400">Lot Size</p>
                                    <p className="text-lg font-semibold">{property.details.lotSize}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaSun className="text-[#D4AF37] text-2xl" />
                                <div>
                                    <p className="text-sm text-gray-400">Year Built</p>
                                    <p className="text-lg font-semibold">{property.details.yearBuilt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Action Buttons */}
                {/* <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowScheduleVisit(true)}
                            className="flex items-center space-x-3 px-8 py-4 bg-[#D4AF37] text-[#122620] rounded-lg hover:bg-[#C19B2E] transition-all duration-300 shadow-lg"
                        >
                            <FaCalendarAlt className="text-xl" />
                            <span className="font-normal tracking-wider">Schedule Private Viewing</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowMortgageCalculator(true)}
                            className="flex items-center space-x-3 px-8 py-4 bg-[#1A332C] text-white rounded-lg hover:bg-[#234439] transition-all duration-300 shadow-lg border border-[#D4AF37]/30"
                        >
                            <FaCalculator className="text-xl" />
                            <span className="font-normal tracking-wider">Calculate Mortgage</span>
                        </motion.button>

                    </div>
                </div> */}

                {/* Rest of the content sections */}
                <div className="container mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12 lg:space-y-16">
                    {/* <VirtualTour url={property.virtualTour} /> */}
                    <PropertyDescription description={propertyData.description} />
                    <PropertyGallery images={propertyData.images} videoLink={propertyData.videoLink} />
                    <PropertyLocation location={property.location} pois={propertyData.pois} />
                    <PropertySpecifications specifications={propertyData.specifications} />
                    <MaterialCertifications certifications={propertyData.materialCertifications} />
                    {/* <PropertyAmenities amenities={property.amenities} /> */}
                    {/* <PropertyHistory history={property.history} /> */}
                    {/* <NeighborhoodInsights pois={propertyData.pois} /> */}
                    <SimilarProperties properties={propertyData.similarProperties} />
                    <PropertyAgent agent={propertyData.agent} />
                    <Footer />
                </div>
            </div>

            {/* Enhanced Floating Contact Buttons */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col space-y-3 sm:space-y-4 z-50">
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMortgageCalculator(true)}
                    className="bg-[#D4AF37] text-[#122620] p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#C19B2E] transition-colors"
                >
                    <FaCalculator className="text-lg sm:text-2xl" />
                </motion.button>

                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowScheduleVisit(true)}
                    className="bg-[#D4AF37] text-[#122620] p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#C19B2E] transition-colors"
                >
                    <FaPhone className="text-lg sm:text-2xl" />
                </motion.button>

                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowScheduleVideoChat(true)}
                    className="bg-[#D4AF37] text-[#122620] p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#C19B2E] transition-colors"
                >
                    <FaVideo className="text-lg sm:text-2xl" />
                </motion.button>
            </div>

            {/* Modals */}
            {showMortgageCalculator && (
                <MortgageCalculator
                    price={propertyData.price}
                    onClose={() => setShowMortgageCalculator(false)}
                />
            )}

            {showScheduleVisit && (
                <ScheduleVisit
                    property={propertyData}
                    onClose={() => setShowScheduleVisit(false)}
                />
            )}

            {showScheduleVideoChat && (
                <ScheduleVideoChat
                    property={propertyData}
                    onClose={() => setShowScheduleVideoChat(false)}
                />
            )}
        </div>
    );
};

export default PropertyDetails; 