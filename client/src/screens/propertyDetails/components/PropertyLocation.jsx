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

// Add custom scrollbar styles
const scrollbarStyles = `
    .custom-scrollbar {
        /* Firefox */
        scrollbar-width: thin;
        scrollbar-color: rgba(229, 190, 144, 0.3) transparent;
    }
    
    /* Webkit browsers (Chrome, Safari, Edge) */
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(229, 190, 144, 0.3);
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(229, 190, 144, 0.5);
    }
    
    /* Hide scrollbar on mobile and tablet */
    @media (max-width: 1023px) {
        .custom-scrollbar {
            /* Firefox */
            scrollbar-width: none;
            /* IE/Edge */
            -ms-overflow-style: none;
        }
        
        /* Webkit browsers */
        .custom-scrollbar::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
        }
    }
`;

const PropertyLocation = ({ location, pois = [] }) => {
    const [map, setMap] = useState(null);
    const [mapContainer, setMapContainer] = useState(null);
    const [mapError, setMapError] = useState(false);
    const [isMapLoading, setIsMapLoading] = useState(false);

    // Check if Leaflet is loaded
    useEffect(() => {
        if (typeof L === 'undefined') {
            console.error('PropertyLocation: Leaflet library not loaded');
            setMapError(true);
            return;
        }
        console.log('PropertyLocation: Leaflet library loaded successfully');
        setMapError(false);
    }, []);

    // Create custom POI icons
    const createPOIIcon = (type) => {
        const colorMap = {
            school: '#3B82F6',
            university: '#1D4ED8',
            college: '#1D4ED8',
            park: '#10B981',
            restaurant: '#F59E0B',
            cafe: '#F97316',
            shop: '#8B5CF6',
            supermarket: '#7C3AED',
            mall: '#6D28D9',
            hospital: '#EF4444',
            station: '#DC2626',
            metro: '#DC2626',
            subway: '#DC2626',
            bus: '#3B82F6',
            bank: '#059669',
            gym: '#F59E0B',
            cinema: '#EC4899',
            other: '#6B7280'
        };

        const iconMap = {
            school: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>`,
            university: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>`,
            college: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>`,
            park: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>`,
            restaurant: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
            </svg>`,
            cafe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zM20 8h-2V5h2v3zM4 19h16v2H4z"/>
            </svg>`,
            shop: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>`,
            supermarket: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>`,
            mall: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>`,
            hospital: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 1h-4v4h-4V4H6v16h12V4z"/>
            </svg>`,
            station: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h2l2-2h4l2 2h2v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm5.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-7h-5V6h5v4z"/>
            </svg>`,
            metro: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h2l2-2h4l2 2h2v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm5.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-7h-5V6h5v4z"/>
            </svg>`,
            subway: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h2l2-2h4l2 2h2v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm5.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-7h-5V6h5v4z"/>
            </svg>`,
            bus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-9H6V6h6.5v2zm5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM18 8h-6.5V6H18v2z"/>
            </svg>`,
            bank: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 1L2 6v2h19V6m-5 4v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10m-2 0v2h1V10M2 22h19v-3H2m0-4h19v-3H2m0-4h19V8H2z"/>
            </svg>`,
            gym: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
            </svg>`,
            cinema: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>`,
            other: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>`
        };

        const color = colorMap[type] || '#6B7280';
        const icon = iconMap[type] || iconMap.other;

        return L.divIcon({
            className: 'custom-poi-icon',
            html: `
                <div style="
                    background: ${color}; 
                    color: white; 
                    border-radius: 12px; 
                    width: 32px; 
                    height: 32px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 16px; 
                    font-weight: bold; 
                    border: 3px solid white; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    backdrop-filter: blur(10px);
                    transition: all 0.2s ease;
                ">${icon}</div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    };

    // Initialize map
    useEffect(() => {
        console.log('PropertyLocation: Map initialization effect triggered', {
            mapContainer: !!mapContainer,
            location: !!location,
            map: !!map,
            pois: pois.length
        });

        if (mapContainer && location && !map) {
            console.log('PropertyLocation: Initializing map with location:', location);
            setIsMapLoading(true);

            // Small delay to ensure container is properly rendered
            const timer = setTimeout(() => {
                try {
                    // Create the map instance with optimized performance settings
                    const newMap = L.map(mapContainer, {
                        center: [location.latitude, location.longitude],
                        zoom: 15,
                        zoomControl: true,
                        scrollWheelZoom: true,
                        doubleClickZoom: true,
                        boxZoom: true,
                        keyboard: true,
                        dragging: true,
                        touchZoom: true,
                        zoomSnap: 0.5,
                        zoomDelta: 0.5,
                        wheelPxPerZoomLevel: 60,
                        tap: true,
                        tapTolerance: 15,
                        preferCanvas: true,
                        fadeAnimation: true,
                        zoomAnimation: true,
                        markerZoomAnimation: true,
                        transform3DLimit: 8388608,
                        maxZoom: 19,
                        minZoom: 3
                    });

                    console.log('PropertyLocation: Map created successfully');

                    // Add tile layer with optimized loading for smooth zooming
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors',
                        maxZoom: 19,
                        subdomains: 'abc',
                        updateWhenIdle: false,
                        updateWhenZooming: false,
                        keepBuffer: 4,
                        maxNativeZoom: 18,
                        tileSize: 256,
                        zoomOffset: 0,
                        detectRetina: true,
                        crossOrigin: true
                    }).addTo(newMap);

                    console.log('PropertyLocation: Tile layer added');

                    // Add property marker with custom icon
                    const propertyIcon = L.divIcon({
                        className: 'property-marker',
                        html: `
                            <div style="
                                background: linear-gradient(135deg, #D6AD60 0%, #E5BE90 100%); 
                                color: #122620; 
                                border-radius: 16px; 
                                width: 48px; 
                                height: 48px; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                font-size: 24px; 
                                font-weight: bold; 
                                border: 4px solid white; 
                                box-shadow: 0 8px 24px rgba(214, 173, 96, 0.4);
                                backdrop-filter: blur(10px);
                                transition: all 0.3s ease;
                                position: relative;
                                will-change: transform;
                            ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                </svg>
                                <div style="
                                    position: absolute;
                                    top: -4px;
                                    right: -4px;
                                    background: #EF4444;
                                    color: white;
                                    border-radius: 50%;
                                    width: 20px;
                                    height: 20px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 12px;
                                    font-weight: bold;
                                    border: 2px solid white;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                                ">★</div>
                            </div>
                        `,
                        iconSize: [48, 48],
                        iconAnchor: [24, 48],
                        popupAnchor: [0, -48]
                    });

                    const propertyMarker = L.marker([location.latitude, location.longitude], {
                        icon: propertyIcon,
                        keyboard: false,
                        title: 'Property Location'
                    })
                        .addTo(newMap)
                        .bindPopup(`
                            <div style="
                                text-align: center; 
                                padding: 8px; 
                                min-width: 200px;
                                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                            ">
                                <div style="
                                    background: linear-gradient(135deg, #D6AD60 0%, #E5BE90 100%);
                                    color: #122620;
                                    padding: 12px;
                                    border-radius: 12px;
                                    margin-bottom: 8px;
                                    font-weight: bold;
                                    font-size: 16px;
                                    box-shadow: 0 4px 12px rgba(214, 173, 96, 0.2);
                                ">🏠 Property Location</div>
                                <div style="
                                    color: #666;
                                    font-size: 14px;
                                    line-height: 1.4;
                                    padding: 8px;
                                    background: #f8f9fa;
                                    border-radius: 8px;
                                    border-left: 4px solid #D6AD60;
                                ">${location.address}</div>
                            </div>
                        `);

                    console.log('PropertyLocation: Property marker added');

                    // Add POI markers with performance optimization
                    const poiMarkers = [];
                    pois.forEach((poi, index) => {
                        const poiIcon = createPOIIcon(poi.type);
                        const marker = L.marker([poi.latitude, poi.longitude], {
                            icon: poiIcon,
                            keyboard: false,
                            title: poi.name
                        })
                            .addTo(newMap)
                            .bindPopup(`
                                <div style="
                                    text-align: center; 
                                    padding: 8px; 
                                    min-width: 180px;
                                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                                ">
                                    <div style="
                                        background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
                                        color: white;
                                        padding: 10px;
                                        border-radius: 10px;
                                        margin-bottom: 6px;
                                        font-weight: bold;
                                        font-size: 14px;
                                        box-shadow: 0 3px 10px rgba(59, 130, 246, 0.3);
                                    ">${poi.name}</div>
                                    <div style="
                                        color: #666;
                                        font-size: 12px;
                                        padding: 6px;
                                        background: #f8f9fa;
                                        border-radius: 6px;
                                        margin-bottom: 4px;
                                        border-left: 3px solid #3B82F6;
                                    ">${poi.type.charAt(0).toUpperCase() + poi.type.slice(1)}</div>
                                    ${poi.distance ? `
                                        <div style="
                                            color: #888;
                                            font-size: 11px;
                                            padding: 4px;
                                            background: #e9ecef;
                                            border-radius: 4px;
                                            font-weight: 500;
                                        ">📍 ${poi.distance}m away</div>
                                    ` : ''}
                                </div>
                            `);
                        poiMarkers.push(marker);
                        console.log(`PropertyLocation: POI marker ${index + 1} added:`, poi.name);
                    });

                    // Fit bounds to include all markers if there are POIs
                    if (pois.length > 0) {
                        const bounds = L.latLngBounds([[location.latitude, location.longitude]]);
                        pois.forEach(poi => {
                            bounds.extend([poi.latitude, poi.longitude]);
                        });
                        newMap.fitBounds(bounds, { padding: [20, 20] });
                        console.log('PropertyLocation: Map bounds fitted to include all POIs');
                    }

                    setMap(newMap);
                    setIsMapLoading(false);
                    console.log('PropertyLocation: Map state updated');
                } catch (error) {
                    console.error('PropertyLocation: Error initializing map:', error);
                    setMapError(true);
                    setIsMapLoading(false);
                }
            }, 100);

            // Cleanup function
            return () => {
                clearTimeout(timer);
                if (map) {
                    map.remove();
                }
            };
        }
    }, [mapContainer, location, pois, map]);

    // Handle map resizing
    useEffect(() => {
        if (map) {
            // Invalidate map size after a short delay to ensure proper rendering
            const timer = setTimeout(() => {
                map.invalidateSize();
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [map, mapContainer]);

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
        <>
            <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
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

                    {/* Responsive grid: 3 columns on lg+, stacked on mobile/tablet */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Map section: sticky on large screens, takes 2 columns */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 bg-gradient-to-br from-[#1A332C] to-[#122620] rounded-3xl overflow-hidden shadow-2xl border border-[#E5BE90]/20 lg:sticky lg:top-32 h-full"
                        >
                            <div className="p-4 bg-gradient-to-r from-[#E5BE90]/10 to-transparent border-b border-[#E5BE90]/20">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-[#E5BE90]" />
                                    Interactive Location Map
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">Explore the property location and nearby amenities</p>
                            </div>
                            <div
                                ref={setMapContainer}
                                className="w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 relative"
                                style={{ minHeight: '400px' }}
                            >
                                {mapError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FaMapMarkerAlt className="text-red-500 text-2xl" />
                                            </div>
                                            <p className="text-red-600 font-semibold mb-2">Map failed to load</p>
                                            <p className="text-gray-500 text-sm">Please refresh the page to try again</p>
                                        </div>
                                    </div>
                                )}
                                {!location && !mapError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FaMapMarkerAlt className="text-gray-400 text-2xl" />
                                            </div>
                                            <p className="text-gray-600 font-semibold mb-2">Location data not available</p>
                                            <p className="text-gray-500 text-sm">Property location information is missing</p>
                                        </div>
                                    </div>
                                )}
                                {location && !mapError && !map && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-[#E5BE90]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#E5BE90] border-t-transparent"></div>
                                            </div>
                                            <p className="text-gray-600 font-semibold mb-2">Loading interactive map...</p>
                                            <p className="text-gray-500 text-sm">Preparing location data and nearby points of interest</p>
                                            {isMapLoading && (
                                                <div className="mt-4">
                                                    <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#E5BE90] rounded-full animate-pulse" style={{ width: '60%' }}></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Details section: scrollable if content is long */}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="space-y-4 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:pr-2 custom-scrollbar"
                        >
                            {/* Property Address */}
                            {location && (
                                <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8 shadow-xl border border-[#E5BE90]/10">
                                    <h3 className="text-2xl font-bold mb-6 text-[#E5BE90] font-source-serif">Property Address</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[#E5BE90]/10 rounded-full flex items-center justify-center">
                                                <FaMapMarkerAlt className="text-[#E5BE90]" />
                                            </div>
                                            <div>
                                                <p className="text-gray-300">{location.address},</p>
                                                {/* <p className="text-gray-300">{location.city}, {location.state} {location.zipCode}</p> */}
                                                <p className="text-gray-300">{location.city}</p>

                                                {/* <p className="text-gray-400 text-sm">Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Nearby Amenities */}
                            <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8 shadow-xl border border-[#E5BE90]/10">
                                <h3 className="text-2xl font-bold mb-6 text-[#E5BE90] font-source-serif">Nearby Amenities</h3>
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
                            <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8 shadow-xl border border-[#E5BE90]/10">
                                <h3 className="text-2xl font-bold mb-6 text-[#E5BE90] font-source-serif">Transportation</h3>
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
                            <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8 shadow-xl border border-[#E5BE90]/10">
                                <h3 className="text-2xl font-bold mb-6 text-[#E5BE90] font-source-serif">Community</h3>
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
                            {/* {pois.length > 0 && (
                            <motion.div variants={item} className="bg-[#1A332C] rounded-3xl p-8 shadow-xl border border-[#E5BE90]/10">
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
                        )} */}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PropertyLocation; 