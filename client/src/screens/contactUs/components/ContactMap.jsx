import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ContactMap = ({ officeLocations }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [mapError, setMapError] = useState(false);

    // Office location coordinates
    const OFFICE_LATITUDE = 22.4927694;
    const OFFICE_LONGITUDE = 88.3039975;
    const MAP_ZOOM = 15;

    useEffect(() => {
        console.log('ContactMap: useEffect triggered', { officeLocations });

        // Wait for the DOM to be ready
        if (!mapRef.current) {
            console.log('ContactMap: mapRef.current is null');
            return;
        }

        console.log('ContactMap: Initializing map...');

        // Clean up any existing map
        if (mapInstanceRef.current) {
            console.log('ContactMap: Cleaning up existing map');
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        try {
            // Initialize map centered on office location
            const map = L.map(mapRef.current).setView([OFFICE_LATITUDE, OFFICE_LONGITUDE], MAP_ZOOM);
            console.log('ContactMap: Map initialized');

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(map);
            console.log('ContactMap: Tiles added');

            // Add marker for the office location
            if (officeLocations && officeLocations.length > 0) {
                const office = officeLocations[0];
                console.log('ContactMap: Adding marker for', office.city);

                // Use default marker
                const marker = L.marker([OFFICE_LATITUDE, OFFICE_LONGITUDE])
                    .addTo(map)
                    .bindPopup(`
                        <div style="min-width: 200px;">
                            <h3 style="margin: 0 0 8px 0; color: #122620; font-weight: bold;">${office.city}</h3>
                            <p style="margin: 4px 0; color: #666; font-size: 14px;">${office.address}</p>
                            <p style="margin: 4px 0; color: #666; font-size: 14px;">${office.state}</p>
                            <p style="margin: 4px 0; color: #D6AD60; font-weight: bold;">${office.phone}</p>
                            <p style="margin: 4px 0; color: #D6AD60; font-weight: bold;">${office.email}</p>
                        </div>
                    `);

                console.log('ContactMap: Marker added for', office.city);
            }

            mapInstanceRef.current = map;
            setMapError(false);
            console.log('ContactMap: Map setup complete');

        } catch (error) {
            console.error('ContactMap: Error initializing map:', error);
            setMapError(true);
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                console.log('ContactMap: Cleaning up map on unmount');
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [officeLocations]);

    if (mapError) {
        return (
            <div
                style={{
                    height: '400px',
                    width: '100%',
                    borderRadius: '12px',
                    border: '2px solid #D6AD60',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '20px'
                }}
            >
                <h3 className="text-xl font-bold text-[#122620] mb-4">Office Location</h3>
                {officeLocations && officeLocations.length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-bold text-[#122620] mb-2">{officeLocations[0].city}</h4>
                        <p className="text-sm text-gray-600 mb-1">{officeLocations[0].address}</p>
                        <p className="text-sm text-gray-600 mb-2">{officeLocations[0].state}</p>
                        <p className="text-sm text-[#D6AD60] font-semibold">{officeLocations[0].phone}</p>
                        <p className="text-sm text-[#D6AD60] font-semibold">{officeLocations[0].email}</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            ref={mapRef}
            style={{
                height: '400px',
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #D6AD60',
                backgroundColor: '#f0f0f0',
                minHeight: '400px'
            }}
        />
    );
};

export default ContactMap; 