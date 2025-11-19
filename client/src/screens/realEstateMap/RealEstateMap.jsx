// import React, { useState, useRef, useEffect } from 'react';
// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     Popup,
//     useMapEvents,
//     useMap
// } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix Leaflet default icon issues
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl:
//         'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // Custom POI icons using SVG-based markers for full customization
// // This is better than using icon images as it's fully self-contained
// const createColoredIcon = (color) => {
//     return L.divIcon({
//         className: 'custom-div-icon',
//         html: `
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="0 0 100 100">
//                 <path fill="${color}" stroke="#000" stroke-width="2" d="M50 10 c-18 0 -32 14 -32 32 c0 36 32 58 32 58 s32 -22 32 -58 c0 -18 -14 -32 -32 -32 z" />
//                 <circle fill="white" cx="50" cy="42" r="12" />
//             </svg>
//         `,
//         iconSize: [24, 40],
//         iconAnchor: [12, 40],
//         popupAnchor: [0, -40]
//     });
// };

// // Custom POI icons
// const poiIcons = {
//     school: createColoredIcon('#2563EB'), // blue
//     park: createColoredIcon('#16A34A'),   // green
//     station: createColoredIcon('#DC2626'), // red
//     restaurant: createColoredIcon('#D97706'), // amber
//     shop: createColoredIcon('#7C3AED'),    // purple
//     subway: createColoredIcon('#DC2626'),  // red (added for subway)
//     metro: createColoredIcon('#DC2626'),   // red (added for metro)
//     route: createColoredIcon('#6B7280')    // gray (added for route)
// };

// // Component to handle map fly to when selected listing changes
// const MapController = ({ selectedListing }) => {
//     const map = useMap();

//     useEffect(() => {
//         if (selectedListing) {
//             map.flyTo([selectedListing.lat, selectedListing.lng], 15);
//         }
//     }, [selectedListing, map]);

//     return null;
// };

// // Custom form popup component
// const FormPopup = ({ formData, setFormData, handleSubmit }) => {
//     return (
//         <div className="p-1 space-y-2">
//             <input
//                 className="border p-1 w-full"
//                 type="text"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             />
//             <input
//                 className="border p-1 w-full"
//                 type="number"
//                 placeholder="Price"
//                 value={formData.price}
//                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//             />
//             <button
//                 onClick={handleSubmit}
//                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//             >
//                 Add Listing
//             </button>
//         </div>
//     );
// };

// const RealEstateMapApp = () => {
//     const [listings, setListings] = useState([]);
//     const [formLocation, setFormLocation] = useState(null);
//     const [formData, setFormData] = useState({ title: '', price: '' });
//     const [selectedListing, setSelectedListing] = useState(null);
//     const [nearbyPOIs, setNearbyPOIs] = useState([]);
//     const [address, setAddress] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [apiStatus, setApiStatus] = useState({ address: 'idle', poi: 'idle' });
//     const [apiAttribution] = useState({
//         nominatim: '© OpenStreetMap Contributors',
//         overpass: '© OpenStreetMap Contributors'
//     });
//     const mapRef = useRef();

//     const MapClickHandler = () => {
//         useMapEvents({
//             click(e) {
//                 setFormLocation(e.latlng);
//                 setFormData({ title: '', price: '' });
//             },
//         });
//         return null;
//     };

//     const handleSubmit = () => {
//         if (!formData.title || !formData.price) {
//             console.log('Form validation failed: Title or price is missing');
//             return;
//         }

//         const newListing = {
//             ...formData,
//             ...formLocation,
//             id: Date.now(),
//         };
//         console.log('Adding new listing:', newListing);
//         setListings([...listings, newListing]);
//         setFormLocation(null);
//     };

//     const handleCardClick = async (listing) => {
//         console.log('Selected listing:', listing);
//         setSelectedListing(listing);
//         await fetchAddress(listing.lat, listing.lng);
//         await fetchPOIs(listing.lat, listing.lng);
//     };

//     // Use OpenStreetMap Nominatim API for reverse geocoding (address lookup)
//     const fetchAddress = async (lat, lng) => {
//         console.log('Fetching address for coordinates:', lat, lng);
//         setLoading(true);
//         setApiStatus(prev => ({ ...prev, address: 'loading' }));

//         try {
//             // Use OSM Nominatim with proper rate limiting and attribution
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
//                 {
//                     headers: {
//                         // Required proper user agent as per OSM policy
//                         'User-Agent': 'RealEstateMapDemo/1.0',
//                         'Accept-Language': 'en-US,en;q=0.9'
//                     },
//                     // Add small delay to respect usage policy (max 1 request per second)
//                     cache: 'force-cache'
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch address: ${response.status} ${response.statusText}`);
//             }

//             const data = await response.json();
//             console.log('Address data received:', data);

//             // Format the address in a nice way using addressdetails
//             let formattedAddress = '';
//             if (data.address) {
//                 const addr = data.address;
//                 formattedAddress = [
//                     addr.road,
//                     addr.house_number,
//                     addr.suburb,
//                     addr.city || addr.town || addr.village || addr.hamlet,
//                     addr.state,
//                     addr.postcode,
//                     addr.country
//                 ].filter(Boolean).join(', ');
//             }

//             setAddress(formattedAddress || data.display_name || 'Address not found');
//             setApiStatus(prev => ({ ...prev, address: 'success' }));
//         } catch (err) {
//             console.error('Address lookup error:', err);
//             setAddress('Address lookup failed. Please try again later.');
//             setApiStatus(prev => ({ ...prev, address: 'error' }));
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Use OpenStreetMap Overpass API for POI data
//     const fetchPOIs = async (lat, lng) => {
//         console.log('Fetching POIs for coordinates:', lat, lng);
//         setLoading(true);
//         setNearbyPOIs([]);
//         setApiStatus(prev => ({ ...prev, poi: 'loading' }));

//         try {
//             // Using OSM's Overpass API
//             const radius = 1000; // 1000 meters radius

//             // Create Overpass query to find amenities within radius
//             const query = `
//                 [out:json][timeout:25];
//                 (
//                   node["amenity"~"school|college|university"](around:${radius},${lat},${lng});
//                   node["leisure"="park"](around:${radius},${lat},${lng});
//                   node["railway"~"station|metro|subway"](around:${radius},${lat},${lng});
//                   node["amenity"~"restaurant|cafe"](around:${radius},${lat},${lng});
//                   node["shop"~"supermarket|mall"](around:${radius},${lat},${lng});
//                   node["route"="subway"](around:${radius},${lat},${lng});
//                   node["station"="subway"](around:${radius},${lat},${lng});
//                 );
//                 out body;
//             `;

//             console.log('Overpass API query:', query);

//             // Use Overpass API with proper headers
//             const response = await fetch('https://overpass-api.de/api/interpreter', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     'User-Agent': 'RealEstateMapDemo/1.0'
//                 },
//                 body: `data=${encodeURIComponent(query)}`
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch POIs: ${response.status} ${response.statusText}`);
//             }

//             const data = await response.json();
//             console.log('POI data received:', data);

//             // Parse the POIs from OSM data
//             const pois = data.elements.map(el => {
//                 // Determine POI type
//                 let type = 'other';
//                 if (el.tags) {
//                     if (el.tags.amenity && ['school', 'college', 'university'].includes(el.tags.amenity)) {
//                         type = 'school';
//                     } else if (el.tags.leisure === 'park') {
//                         type = 'park';
//                     } else if (el.tags.railway && ['station', 'metro', 'subway'].includes(el.tags.railway)) {
//                         type = 'station';
//                     } else if (el.tags.amenity && ['restaurant', 'cafe'].includes(el.tags.amenity)) {
//                         type = 'restaurant';
//                     } else if (el.tags.shop && ['supermarket', 'mall'].includes(el.tags.shop)) {
//                         type = 'shop';
//                     } else if (el.tags.route === 'subway') {
//                         type = 'subway';
//                     } else if (el.tags.station === 'subway') {
//                         type = 'subway';
//                     }
//                 }

//                 return {
//                     lat: el.lat,
//                     lng: el.lon,
//                     type: type,
//                     name: el.tags?.name || `${type.charAt(0).toUpperCase() + type.slice(1)}`,
//                     tags: el.tags
//                 };
//             });

//             console.log('Processed POIs:', pois);

//             // If Overpass failed, fall back to local POI generation
//             if (pois.length === 0) {
//                 console.log('No POIs found from Overpass API, using fallback');
//                 generateFallbackPOIs(lat, lng);
//             } else {
//                 setNearbyPOIs(pois);
//                 setApiStatus(prev => ({ ...prev, poi: 'success' }));
//             }
//         } catch (err) {
//             console.error('POI lookup error:', err);
//             // Fallback to generated POIs
//             generateFallbackPOIs(lat, lng);
//             setApiStatus(prev => ({ ...prev, poi: 'error' }));
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Generate fallback POIs when API fails
//     const generateFallbackPOIs = (lat, lng) => {
//         const poiTypes = ["school", "park", "station", "restaurant", "shop"];
//         const fallbackPOIs = [];

//         for (let i = 0; i < 5; i++) {
//             const latOffset = (Math.random() - 0.5) * 0.005;
//             const lngOffset = (Math.random() - 0.5) * 0.005;
//             const type = poiTypes[Math.floor(Math.random() * poiTypes.length)];

//             fallbackPOIs.push({
//                 lat: lat + latOffset,
//                 lng: lng + lngOffset,
//                 type: type,
//                 name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`
//             });
//         }

//         console.log('Generated fallback POIs:', fallbackPOIs);
//         setNearbyPOIs(fallbackPOIs);
//     };

//     // Get POI icon based on type
//     const getPOIIcon = (type) => {
//         // Handle types that might include the word rather than exact match
//         if (type.includes('school')) return poiIcons.school;
//         if (type.includes('park')) return poiIcons.park;
//         if (type.includes('station') || type.includes('metro') || type.includes('subway')) return poiIcons.station;
//         if (type.includes('restaurant') || type.includes('cafe')) return poiIcons.restaurant;
//         if (type.includes('shop') || type.includes('mall') || type.includes('supermarket')) return poiIcons.shop;

//         // Direct lookup for exact matches
//         if (poiIcons[type]) return poiIcons[type];

//         // Default icon for unknown types
//         return createColoredIcon('#6B7280'); // gray for unknown types
//     };

//     return (
//         <div className="flex flex-col h-screen font-sans">
//             <h1 className="text-2xl font-bold bg-blue-100 text-center py-3">
//                 🏠 Real Estate Listings
//             </h1>

//             <div className="flex flex-1 overflow-hidden">
//                 {/* Sidebar */}
//                 <div className="w-1/3 overflow-y-auto p-4 border-r bg-gray-50">
//                     <h2 className="text-xl font-semibold mb-4">Listings</h2>

//                     {listings.length === 0 && (
//                         <div className="text-gray-500 italic mb-4">
//                             No listings yet. Click on the map to add one.
//                         </div>
//                     )}

//                     {listings.map((listing) => (
//                         <div
//                             key={listing.id}
//                             onClick={() => handleCardClick(listing)}
//                             className={`mb-4 p-3 border rounded shadow hover:bg-blue-50 cursor-pointer ${selectedListing && selectedListing.id === listing.id
//                                     ? 'bg-blue-100 border-blue-300'
//                                     : ''
//                                 }`}
//                         >
//                             <h3 className="text-lg font-bold">{listing.title}</h3>
//                             <p className="text-sm text-gray-700">${listing.price}</p>
//                             <p className="text-xs text-gray-500">
//                                 ({listing.lat.toFixed(4)}, {listing.lng.toFixed(4)})
//                             </p>
//                         </div>
//                     ))}

//                     {/* POI & Address Details */}
//                     {selectedListing && (
//                         <div className="mt-6 p-4 bg-white rounded shadow border">
//                             <h3 className="font-bold text-lg mb-1">📍 Location Details</h3>

//                             {loading ? (
//                                 <div className="text-gray-500">Loading location data...</div>
//                             ) : (
//                                 <>
//                                     <p className="text-sm text-gray-600 mb-2">{address}</p>
//                                     <h4 className="font-semibold mb-1">Nearby Places:</h4>
//                                     <ul className="text-sm list-disc list-inside">
//                                         {nearbyPOIs.length > 0 ? (
//                                             nearbyPOIs.map((poi, idx) => (
//                                                 <li key={idx}>
//                                                     {poi.type.charAt(0).toUpperCase() + poi.type.slice(1)}: {poi.name}
//                                                 </li>
//                                             ))
//                                         ) : (
//                                             <li>No nearby POIs found</li>
//                                         )}
//                                     </ul>
//                                 </>
//                             )}

//                             <div className="mt-3 border rounded overflow-hidden">
//                                 <MapContainer
//                                     center={[selectedListing.lat, selectedListing.lng]}
//                                     zoom={15}
//                                     style={{ height: 200 }}
//                                     scrollWheelZoom={false}
//                                 >
//                                     <TileLayer
//                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                         attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//                                     />
//                                     <Marker position={[selectedListing.lat, selectedListing.lng]}>
//                                         <Popup>{selectedListing.title}</Popup>
//                                     </Marker>
//                                     {nearbyPOIs.map((poi, idx) => (
//                                         <Marker
//                                             key={idx}
//                                             position={[poi.lat, poi.lng]}
//                                             icon={getPOIIcon(poi.type)}
//                                         >
//                                             <Popup>
//                                                 <strong>{poi.type.charAt(0).toUpperCase() + poi.type.slice(1)}</strong>
//                                                 <br />
//                                                 {poi.name}
//                                             </Popup>
//                                         </Marker>
//                                     ))}
//                                 </MapContainer>
//                             </div>

//                             {/* Attribution section - required for open source APIs */}
//                             <div className="mt-2 text-xs text-gray-500">
//                                 Data: {apiAttribution.nominatim} | {apiAttribution.overpass}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Main Map */}
//                 <div className="w-2/3">
//                     <MapContainer
//                         center={[22.4736, 88.3607]}
//                         zoom={13}
//                         style={{ height: '100%', width: '100%' }}
//                         ref={mapRef}
//                     >
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//                         />
//                         <MapClickHandler />
//                         <MapController selectedListing={selectedListing} />

//                         {/* Existing listings */}
//                         {listings.map((listing) => (
//                             <Marker key={listing.id} position={[listing.lat, listing.lng]}>
//                                 <Popup>
//                                     <strong>{listing.title}</strong>
//                                     <br />${listing.price}
//                                 </Popup>
//                             </Marker>
//                         ))}

//                         {/* POIs for selected listing */}
//                         {selectedListing && nearbyPOIs.map((poi, idx) => (
//                             <Marker
//                                 key={`poi-${idx}`}
//                                 position={[poi.lat, poi.lng]}
//                                 icon={getPOIIcon(poi.type)}
//                             >
//                                 <Popup>
//                                     <strong>{poi.type.charAt(0).toUpperCase() + poi.type.slice(1)}</strong>
//                                     <br />
//                                     {poi.name}
//                                 </Popup>
//                             </Marker>
//                         ))}

//                         {/* Form popup for new listing */}
//                         {formLocation && (
//                             <Marker position={[formLocation.lat, formLocation.lng]}>
//                                 <Popup>
//                                     <FormPopup
//                                         formData={formData}
//                                         setFormData={setFormData}
//                                         handleSubmit={handleSubmit}
//                                     />
//                                 </Popup>
//                             </Marker>
//                         )}
//                     </MapContainer>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RealEstateMapApp;










// RealEstateMapApp.jsx
import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
});

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

function RealEstateMapApp() {
    const [customMarkers, setCustomMarkers] = useState([]);
    const [markerPOIs, setMarkerPOIs] = useState({}); // key: marker ID, value: array of filtered POIs

    const fetchPOIsForMarker = async (markerId, lat, lon) => {
        const query = `
      [out:json][timeout:25];
      (
        node(around:1000,${lat},${lon})["railway"];
        node(around:1000,${lat},${lon})["amenity"];
        node(around:1000,${lat},${lon})["shop"];
        node(around:1000,${lat},${lon})["police"];
        node(around:1000,${lat},${lon})["hospital"];
        node(around:1000,${lat},${lon})["school"];
        node(around:1000,${lat},${lon})["college"];
        node(around:1000,${lat},${lon})["university"];
        node(around:1000,${lat},${lon})["park"];
        node(around:1000,${lat},${lon})["restaurant"];
        node(around:1000,${lat},${lon})["supermarket"];
        node(around:1000,${lat},${lon})["mall"];
        node(around:1000,${lat},${lon})["grocery"];
        node(around:1000,${lat},${lon})["pharmacy"];
        node(around:1000,${lat},${lon})["hospital"];
      );
      out body;
    `;
        const response = await fetch(OVERPASS_API_URL, {
            method: "POST",
            body: query
        });
        const data = await response.json();
        const filtered = (data.elements || []).filter(poi =>
            poi.tags
            // &&
            // (poi.tags.railway === "station" || poi.tags.subway === "yes")
            // poi.tags.operator === "Metro Railway, Kolkata"
        );
        console.log(filtered[0].tags);
        setMarkerPOIs((prev) => ({
            ...prev,
            [markerId]: filtered
        }));
    };

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                const markerId = Date.now();
                setCustomMarkers((prev) => [...prev, { id: markerId, lat, lng }]);
                fetchPOIsForMarker(markerId, lat, lng);
            }
        });
        return null;
    };

    return (
        <div>
            <h2 className="text-center text-xl font-bold mb-2">
                Subway Railway Stations Finder (Click to Add Marker)
            </h2>
            <MapContainer center={[22.4736, 88.3607]} zoom={20} style={{ height: "80vh", width: "100%" }}>
                <TileLayer
                    attribution='© OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler />

                {/* Custom Markers */}
                {customMarkers.map((marker) => (
                    <Marker key={marker.id} position={[marker.lat, marker.lng]}>
                        <Popup>
                            <strong>Custom Marker</strong><br />
                            Lat: {marker.lat.toFixed(5)}<br />
                            Lng: {marker.lng.toFixed(5)}<br />
                            Nearby Subway Stations: {markerPOIs[marker.id]?.length || 0}
                        </Popup>
                    </Marker>
                ))}

                {/* Filtered Subway Stations */}
                {Object.entries(markerPOIs).flatMap(([markerId, pois]) =>
                    pois.map((poi) => (
                        <Marker key={`${markerId}-${poi.id}`} position={[poi.lat, poi.lon]}>
                            <Popup>
                                <strong>{poi.tags?.name || "Unnamed Station"}</strong><br />
                                {Object.entries(poi.tags || {}).map(([k, v]) => (
                                    <div key={k}><strong>{k}:</strong> {v}</div>
                                ))}
                            </Popup>
                        </Marker>
                    ))
                )}
            </MapContainer>
        </div>
    );
}

export default RealEstateMapApp;





// 22.4736, 88.3607/