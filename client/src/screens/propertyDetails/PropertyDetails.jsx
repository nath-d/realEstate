import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaShare, FaCalculator, FaCalendarAlt, FaMapMarkerAlt, FaHistory, FaBuilding, FaBed, FaBath, FaRuler, FaCar, FaTree, FaSun, FaPhone } from 'react-icons/fa';
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
import PropertyHistory from './components/PropertyHistory';
import NeighborhoodInsights from './components/NeighborhoodInsights';
import MaterialCertifications from './components/MaterialCertifications';
import PropertySpecifications from './components/PropertySpecifications';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';

const PropertyDetails = () => {
    const { id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showMortgageCalculator, setShowMortgageCalculator] = useState(false);
    const [showScheduleVisit, setShowScheduleVisit] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // This would typically come from an API call using the ID
    const property = {
        id: 1,
        title: "Luxurious Beachfront Villa",
        price: "$5,750,000",
        address: "123 Ocean View Drive, Malibu, CA 90265",
        description: "Experience the epitome of luxury living in this stunning beachfront villa. This architectural masterpiece seamlessly blends indoor and outdoor living with floor-to-ceiling windows, offering breathtaking ocean views from every room.",
        details: {
            bedrooms: 6,
            bathrooms: 7.5,
            garage: 3,
            lotSize: "0.75 acres",
            livingArea: "8,500 sq ft",
            yearBuilt: 2022,
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
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
        ],
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
            name: "Sarah Johnson",
            phone: "+1 (310) 555-0123",
            email: "sarah.j@realestate.com",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        },
        virtualTour: "https://example.com/virtual-tour",
        similarProperties: [
            // Similar properties data would go here
        ],
        history: {
            listedDate: "2024-01-15",
            lastSoldDate: "2020-06-20",
            lastSoldPrice: "$4,200,000",
            priceHistory: [
                { date: "2020-06-20", price: "$4,200,000" },
                { date: "2024-01-15", price: "$5,750,000" }
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
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: `Check out this amazing property: ${property.title}`,
                url: window.location.href
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#122620] text-white">
            {/* Enhanced Sticky Header */}
            <motion.div
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
                            <h1 className="text-2xl font-bold tracking-tight">{property.title}</h1>
                            <div className="flex items-center space-x-2 text-[#D6AD60]">
                                <FaMapMarkerAlt className="text-sm" />
                                <span className="text-sm opacity-90">{property.address}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <span className="text-3xl font-bold text-[#D6AD60]">{property.price}</span>
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
            </motion.div >

            {/* Main Content */}
            <div div className="pt-24" >

                <PropertyHero property={property} />
                <PropertyStats details={property.details} />

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
                <div className="container mx-auto px-6 space-y-16">
                    {/* <VirtualTour url={property.virtualTour} /> */}
                    <PropertyDescription description={property.description} />
                    <PropertyGallery images={property.images} />
                    <PropertySpecifications />
                    <MaterialCertifications />
                    {/* <PropertyAmenities amenities={property.amenities} /> */}
                    {/* <PropertyHistory history={property.history} /> */}
                    {/* <NeighborhoodInsights neighborhood={property.neighborhood} /> */}
                    <PropertyLocation />
                    <SimilarProperties properties={property.similarProperties} />
                    <PropertyAgent agent={property.agent} />
                    <Footer />
                </div>
            </div >

            {/* Enhanced Floating Contact Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMortgageCalculator(true)}
                className="fixed bottom-6 right-6 bg-[#D4AF37] text-[#122620] p-6 rounded-full shadow-2xl hover:bg-[#C19B2E] transition-colors"
            >
                <FaCalculator className="text-3xl" />
            </motion.button >




            {/* Modals */}
            {
                showMortgageCalculator && (
                    <MortgageCalculator
                        price={property.price}
                        onClose={() => setShowMortgageCalculator(false)}
                    />
                )
            }

            {
                showScheduleVisit && (
                    <ScheduleVisit
                        property={property}
                        onClose={() => setShowScheduleVisit(false)}
                    />
                )
            }
        </div >
    );
};

export default PropertyDetails; 