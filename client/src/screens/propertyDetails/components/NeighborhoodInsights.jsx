import React from 'react';
import { FaMapMarkerAlt, FaSchool, FaUtensils, FaShoppingBag, FaHospital, FaUniversity, FaSubway, FaBus, FaCar, FaWalking, FaTree } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NeighborhoodInsights = ({ pois = [] }) => {
    const getPOIIcon = (type) => {
        const iconMap = {
            school: FaSchool,
            university: FaUniversity,
            college: FaUniversity,
            park: FaTree,
            restaurant: FaUtensils,
            cafe: FaUtensils,
            shop: FaShoppingBag,
            supermarket: FaShoppingBag,
            mall: FaShoppingBag,
            hospital: FaHospital,
            station: FaSubway,
            metro: FaSubway,
            subway: FaSubway,
            bus: FaBus,
            bank: FaCar,
            gym: FaCar,
            cinema: FaCar,
            other: FaMapMarkerAlt
        };
        return iconMap[type] || FaMapMarkerAlt;
    };

    const getPOIColor = (type) => {
        const colorMap = {
            school: 'text-blue-500',
            university: 'text-blue-600',
            college: 'text-blue-600',
            park: 'text-green-500',
            restaurant: 'text-orange-500',
            cafe: 'text-orange-400',
            shop: 'text-purple-500',
            supermarket: 'text-purple-600',
            mall: 'text-purple-700',
            hospital: 'text-red-500',
            station: 'text-red-600',
            metro: 'text-red-600',
            subway: 'text-red-600',
            bus: 'text-blue-400',
            bank: 'text-green-600',
            gym: 'text-yellow-500',
            cinema: 'text-pink-500',
            other: 'text-gray-500'
        };
        return colorMap[type] || 'text-gray-500';
    };

    const getPOIBgColor = (type) => {
        const bgColorMap = {
            school: 'bg-blue-50',
            university: 'bg-blue-50',
            college: 'bg-blue-50',
            park: 'bg-green-50',
            restaurant: 'bg-orange-50',
            cafe: 'bg-orange-50',
            shop: 'bg-purple-50',
            supermarket: 'bg-purple-50',
            mall: 'bg-purple-50',
            hospital: 'bg-red-50',
            station: 'bg-red-50',
            metro: 'bg-red-50',
            subway: 'bg-red-50',
            bus: 'bg-blue-50',
            bank: 'bg-green-50',
            gym: 'bg-yellow-50',
            cinema: 'bg-pink-50',
            other: 'bg-gray-50'
        };
        return bgColorMap[type] || 'bg-gray-50';
    };

    if (!pois || pois.length === 0) {
        return (
            <section className="py-16 bg-[#1A332C]">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Neighborhood Insights</h2>
                        <p className="text-[#D6AD60] mb-8">Discover what's around this property</p>
                        <div className="bg-[#122620] rounded-lg p-8">
                            <p className="text-gray-400">No nearby points of interest available for this property.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-[#1A332C]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Nearby Points of Interest</h2>
                    <p className="text-[#D6AD60]">Discover what's around this property</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pois.map((poi, index) => {
                        const IconComponent = getPOIIcon(poi.type);
                        const iconColor = getPOIColor(poi.type);
                        const bgColor = getPOIBgColor(poi.type);

                        return (
                            <motion.div
                                key={poi.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`${bgColor} rounded-lg p-6 border border-[#D6AD60]/20 hover:border-[#D6AD60]/40 transition-all duration-300 group`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`${iconColor} text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-[#122620] mb-2">{poi.name}</h3>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="px-2 py-1 bg-[#D6AD60] text-[#122620] text-xs font-semibold rounded-full">
                                                {poi.type.charAt(0).toUpperCase() + poi.type.slice(1)}
                                            </span>
                                            {poi.distance && (
                                                <span className="text-sm text-gray-600 flex items-center">
                                                    <FaWalking className="mr-1" />
                                                    {poi.distance}m away
                                                </span>
                                            )}
                                        </div>
                                        {/* <p className="text-sm text-gray-600">
                                            Coordinates: {poi.latitude.toFixed(4)}, {poi.longitude.toFixed(4)}
                                        </p> */}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-[#122620] rounded-lg p-6 border border-[#D6AD60]/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Location Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-[#D6AD60] font-semibold">{pois.filter(p => ['school', 'university', 'college'].includes(p.type)).length}</div>
                                <div className="text-gray-400">Educational Institutions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-[#D6AD60] font-semibold">{pois.filter(p => ['restaurant', 'cafe', 'shop', 'supermarket', 'mall'].includes(p.type)).length}</div>
                                <div className="text-gray-400">Shopping & Dining</div>
                            </div>
                            <div className="text-center">
                                <div className="text-[#D6AD60] font-semibold">{pois.filter(p => ['park', 'hospital', 'station', 'metro', 'subway', 'bus'].includes(p.type)).length}</div>
                                <div className="text-gray-400">Transport & Recreation</div>
                            </div>
                        </div>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
};

export default NeighborhoodInsights; 