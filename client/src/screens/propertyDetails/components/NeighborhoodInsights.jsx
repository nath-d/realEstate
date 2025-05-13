import React from 'react';
import { FaWalking, FaBus, FaBicycle, FaSchool, FaUtensils, FaShoppingBag, FaTree, FaMapMarkerAlt } from 'react-icons/fa';

const NeighborhoodInsights = ({ neighborhood }) => {
    const renderScore = (score, icon, label) => (
        <div className="bg-[#122620] p-4 rounded-lg">
            <div className="flex items-center mb-2">
                {icon}
                <h3 className="text-[#D4AF37] font-semibold ml-2">{label}</h3>
            </div>
            <div className="flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                        className="bg-[#D4AF37] h-2.5 rounded-full"
                        style={{ width: `${score}%` }}
                    ></div>
                </div>
                <span className="ml-2 text-white font-semibold">{score}</span>
            </div>
        </div>
    );

    const renderSchool = (school) => (
        <div key={school.name} className="bg-[#122620] p-4 rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[#D4AF37] font-semibold">{school.name}</h3>
                    <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`text-lg ${i < school.rating ? 'text-[#D4AF37]' : 'text-gray-600'
                                    }`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <span className="text-white font-semibold">{school.rating}/10</span>
            </div>
        </div>
    );

    const renderAmenity = (amenity, icon) => (
        <div key={amenity} className="flex items-center space-x-2">
            {icon}
            <span className="text-gray-300">{amenity}</span>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Neighborhood Insights</h2>

                {/* Walkability Scores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {renderScore(neighborhood.walkScore, <FaWalking className="text-[#D4AF37] text-xl" />, "Walk Score")}
                    {renderScore(neighborhood.transitScore, <FaBus className="text-[#D4AF37] text-xl" />, "Transit Score")}
                    {renderScore(neighborhood.bikeScore, <FaBicycle className="text-[#D4AF37] text-xl" />, "Bike Score")}
                </div>

                {/* Schools */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <FaSchool className="text-[#D4AF37] text-xl mr-2" />
                        <h3 className="text-xl font-semibold text-[#D4AF37]">Nearby Schools</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {neighborhood.schools.map(renderSchool)}
                    </div>
                </div>

                {/* Nearby Amenities */}
                <div>
                    <div className="flex items-center mb-4">
                        <FaMapMarkerAlt className="text-[#D4AF37] text-xl mr-2" />
                        <h3 className="text-xl font-semibold text-[#D4AF37]">Nearby Amenities</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#122620] p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <FaUtensils className="text-[#D4AF37] mr-2" />
                                <h4 className="text-[#D4AF37] font-semibold">Dining & Entertainment</h4>
                            </div>
                            {neighborhood.nearbyAmenities
                                .filter(amenity => amenity.toLowerCase().includes('restaurant'))
                                .map(amenity => renderAmenity(amenity, <FaUtensils className="text-gray-400" />))}
                        </div>

                        <div className="bg-[#122620] p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <FaShoppingBag className="text-[#D4AF37] mr-2" />
                                <h4 className="text-[#D4AF37] font-semibold">Shopping & Services</h4>
                            </div>
                            {neighborhood.nearbyAmenities
                                .filter(amenity => amenity.toLowerCase().includes('shopping'))
                                .map(amenity => renderAmenity(amenity, <FaShoppingBag className="text-gray-400" />))}
                        </div>

                        <div className="bg-[#122620] p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <FaTree className="text-[#D4AF37] mr-2" />
                                <h4 className="text-[#D4AF37] font-semibold">Parks & Recreation</h4>
                            </div>
                            {neighborhood.nearbyAmenities
                                .filter(amenity => amenity.toLowerCase().includes('park') || amenity.toLowerCase().includes('beach'))
                                .map(amenity => renderAmenity(amenity, <FaTree className="text-gray-400" />))}
                        </div>

                        <div className="bg-[#122620] p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <FaSchool className="text-[#D4AF37] mr-2" />
                                <h4 className="text-[#D4AF37] font-semibold">Education</h4>
                            </div>
                            {neighborhood.schools.map(school =>
                                renderAmenity(school.name, <FaSchool className="text-gray-400" />)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeighborhoodInsights; 