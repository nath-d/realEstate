import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPlane, FaBus, FaSchool, FaShoppingCart, FaUtensils, FaTree, FaHospital, FaPiggyBank, FaDumbbell, FaSubway, FaWalking } from 'react-icons/fa';
import { BsShieldCheck } from 'react-icons/bs';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyLocation = ({ location, pois = [] }) => {
    const [map, setMap] = useState(null);
    const [mapContainer, setMapContainer] = useState(null);

    // Create custom POI icons
    const createPOIIcon = (type) => {
        const colorMap = {
            school: '#2563EB',
            university: '#1D4ED8',
            college: '#1D4ED8',
            park: '#16A34A',
            restaurant: '#EA580C',
            cafe: '#F97316',
            shop: '#7C3AED',
            supermarket: '#6D28D9',
            mall: '#5B21B6',
            hospital: '#DC2626',
            station: '#DC2626',
            metro: '#DC2626',
            subway: '#DC2626',
            bus: '#3B82F6',
            bank: '#059669',
            gym: '#EAB308',
            cinema: '#EC4899',
            other: '#6B7280'
        };

        const color = colorMap[type] || '#6B7280';

        return L.divIcon({
            className: 'custom-poi-icon',
            html: `<div style="background: ${color}; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${type.charAt(0).toUpperCase()}</div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -10]
        });
    };

    // Initialize map
    useEffect(() => {
        if (mapContainer && location && !map) {
            const newMap = L.map(mapContainer).setView([location.latitude, location.longitude], 15);

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(newMap);

            // Add property marker
            const propertyIcon = L.divIcon({
                className: 'property-marker',
                html: `<div style="background: #D6AD60; color: #122620; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">🏠</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 24],
                popupAnchor: [0, -24]
            });

            L.marker([location.latitude, location.longitude], { icon: propertyIcon })
                .addTo(newMap)
                .bindPopup(`
                    <div style="text-align: center;">
                        <strong style="color: #122620;">Property Location</strong><br>
                        <small style="color: #666;">${location.address}</small>
                    </div>
                `);

            // Add POI markers
            pois.forEach((poi) => {
                const poiIcon = createPOIIcon(poi.type);
                L.marker([poi.latitude, poi.longitude], { icon: poiIcon })
                    .addTo(newMap)
                    .bindPopup(`
                        <div style="text-align: center;">
                            <strong style="color: #122620;">${poi.name}</strong><br>
                            <small style="color: #666;">${poi.type.charAt(0).toUpperCase() + poi.type.slice(1)}</small>
                            ${poi.distance ? `<br><small style="color: #888;">${poi.distance}m away</small>` : ''}
                        </div>
                    `);
            });

            setMap(newMap);

            return () => {
                if (newMap) {
                    newMap.remove();
                }
            };
        }
    }, [mapContainer, location, pois, map]);

    // Generate dynamic location info based on POIs
    const generateLocationInfo = () => {
        const nearbyAmenities = [];
        const transportation = [];
        const community = [];

        // Categorize POIs
        pois.forEach((poi) => {
            const distance = poi.distance ? `${poi.distance}m away` : 'Nearby';

            if (['restaurant', 'cafe', 'shop', 'supermarket', 'mall'].includes(poi.type)) {
                nearbyAmenities.push({
                    icon: poi.type === 'restaurant' || poi.type === 'cafe' ? FaUtensils : FaShoppingCart,
                    text: `${poi.name} - ${distance}`,
                    type: poi.type
                });
            } else if (['station', 'metro', 'subway', 'bus'].includes(poi.type)) {
                transportation.push({
                    icon: poi.type === 'bus' ? FaBus : FaSubway,
                    text: `${poi.name} - ${distance}`,
                    type: poi.type
                });
            } else if (['school', 'university', 'college'].includes(poi.type)) {
                community.push({
                    icon: FaSchool,
                    text: `${poi.name} - ${distance}`,
                    type: poi.type
                });
            } else if (['park', 'hospital', 'bank', 'gym'].includes(poi.type)) {
                const iconMap = {
                    park: FaTree,
                    hospital: FaHospital,
                    bank: FaPiggyBank,
                    gym: FaDumbbell
                };
                community.push({
                    icon: iconMap[poi.type],
                    text: `${poi.name} - ${distance}`,
                    type: poi.type
                });
            }
        });

        // Add default items if no POIs
        if (nearbyAmenities.length === 0) {
            nearbyAmenities.push({ icon: FaShoppingCart, text: 'Shopping Center - 10 min drive' });
            nearbyAmenities.push({ icon: FaUtensils, text: 'Restaurants - 5 min drive' });
        }
        if (transportation.length === 0) {
            transportation.push({ icon: FaPlane, text: 'Airport - 45 min drive' });
            transportation.push({ icon: FaBus, text: 'Bus Station - 10 min walk' });
        }
        if (community.length === 0) {
            community.push({ icon: BsShieldCheck, text: 'Gated Community' });
            community.push({ icon: BsShieldCheck, text: '24/7 Security' });
        }

        return { nearbyAmenities, transportation, community };
    };

    const locationInfo = generateLocationInfo();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('path/to/map-pattern.png')] opacity-5" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1A332C]/20 blur-3xl rounded-l-full" />

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                            <FaMapMarkerAlt className="text-[#E5BE90] text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-6xl font-bold mb-4 text-white font-source-serif">Prime Location</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                            <p className="text-gray-400 tracking-wider">Perfectly positioned for your lifestyle</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#E5BE90]"
                            ></motion.span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Interactive Map Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#1A332C] rounded-3xl overflow-hidden"
                    >
                        <div
                            ref={setMapContainer}
                            className="aspect-square bg-gray-800 relative"
                            style={{ minHeight: '400px' }}
                        >
                            {!location && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-gray-400">Location data not available</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Location Details */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Property Address */}
                        {location && (
                            <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-6 text-white">Property Address</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <FaMapMarkerAlt className="text-[#E5BE90]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-300">{location.address}</p>
                                            <p className="text-gray-300">{location.city}, {location.state} {location.zipCode}</p>
                                            <p className="text-gray-400 text-sm">Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Nearby Amenities */}
                        <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-6 text-white">Nearby Amenities</h3>
                            <div className="space-y-4">
                                {locationInfo.nearbyAmenities.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <item.icon className="text-[#E5BE90]" />
                                        </div>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Transportation */}
                        <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-6 text-white">Transportation</h3>
                            <div className="space-y-4">
                                {locationInfo.transportation.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <item.icon className="text-[#E5BE90]" />
                                        </div>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Community Features */}
                        <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-6 text-white">Community</h3>
                            <div className="space-y-4">
                                {locationInfo.community.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                            <item.icon className="text-[#E5BE90]" />
                                        </div>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* POI Summary */}
                        {pois.length > 0 && (
                            <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-6 text-white">Location Summary</h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-[#122620] rounded-lg p-4">
                                        <div className="text-[#E5BE90] font-bold text-xl">
                                            {pois.filter(p => ['school', 'university', 'college'].includes(p.type)).length}
                                        </div>
                                        <div className="text-gray-400 text-sm">Educational</div>
                                    </div>
                                    <div className="bg-[#122620] rounded-lg p-4">
                                        <div className="text-[#E5BE90] font-bold text-xl">
                                            {pois.filter(p => ['restaurant', 'cafe', 'shop', 'supermarket', 'mall'].includes(p.type)).length}
                                        </div>
                                        <div className="text-gray-400 text-sm">Shopping & Dining</div>
                                    </div>
                                    <div className="bg-[#122620] rounded-lg p-4">
                                        <div className="text-[#E5BE90] font-bold text-xl">
                                            {pois.filter(p => ['park', 'hospital', 'station', 'metro', 'subway', 'bus'].includes(p.type)).length}
                                        </div>
                                        <div className="text-gray-400 text-sm">Transport & Recreation</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PropertyLocation; 