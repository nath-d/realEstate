import React, { useState, useRef } from 'react';
import { Modal, Input, Button, Spin, List, Typography, Space, message } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const { Text } = Typography;

// Fix Leaflet default icon
// (required for correct marker display)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

interface POI {
    lat: number;
    lng: number;
    type: string;
    name: string;
    distance?: number;
    tags?: Record<string, string>;
}

interface LocationResult {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    pois: Array<{
        name: string;
        type: string;
        latitude: number;
        longitude: number;
        distance?: number;
    }>;
}

interface MapPickerProps {
    open: boolean;
    onCancel: () => void;
    onSelect: (location: LocationResult) => void;
    initialLocation?: {
        latitude: number;
        longitude: number;
        address?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
}

const DEFAULT_CENTER: [number, number] = [22.4736, 88.3607];

const MapPicker: React.FC<MapPickerProps> = ({ open, onCancel, onSelect, initialLocation }) => {
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState(false);
    const [center, setCenter] = useState<[number, number]>(initialLocation ? [initialLocation.latitude, initialLocation.longitude] : DEFAULT_CENTER);
    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(initialLocation ? { lat: initialLocation.latitude, lng: initialLocation.longitude } : null);
    const [address, setAddress] = useState(initialLocation?.address || '');
    const [city, setCity] = useState(initialLocation?.city || '');
    const [state, setState] = useState(initialLocation?.state || '');
    const [zip, setZip] = useState(initialLocation?.zipCode || '');
    const [pois, setPOIs] = useState<POI[]>([]);
    const [loadingPOI, setLoadingPOI] = useState(false);
    const [manualPOIs, setManualPOIs] = useState<POI[]>([]);
    const mapRef = useRef<any>(null);

    // Search location using Nominatim
    const handleSearch = async () => {
        if (!search) return;
        setSearching(true);
        try {
            const response = await fetch(`http://localhost:3000/properties/geocode/search/${encodeURIComponent(search)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const loc = data[0];
                const newCenter: [number, number] = [parseFloat(loc.lat), parseFloat(loc.lon)];
                setCenter(newCenter);
                setMarker({ lat: parseFloat(loc.lat), lng: parseFloat(loc.lon) });
                // Try to extract address details
                setAddress(loc.display_name || '');
                setCity(loc.address?.city || loc.address?.town || loc.address?.village || '');
                setState(loc.address?.state || '');
                setZip(loc.address?.postcode || '');
                fetchPOIs(parseFloat(loc.lat), parseFloat(loc.lon));
            } else {
                message.warning('No results found.');
            }
        } catch (e) {
            message.error('Failed to search location.');
        } finally {
            setSearching(false);
        }
    };

    // Fetch POIs using Overpass API
    const fetchPOIs = async (lat: number, lng: number) => {
        setLoadingPOI(true);
        setPOIs([]);
        try {
            const response = await fetch('http://localhost:3000/properties/pois/fetch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lat, lng, radius: 1000 }),
            });
            const data = await response.json();
            const pois: POI[] = (data.elements || []).map((el: any) => ({
                lat: el.lat,
                lng: el.lon,
                type: el.tags?.amenity || el.tags?.leisure || el.tags?.railway || el.tags?.shop || 'other',
                name: el.tags?.name || el.tags?.amenity || el.tags?.leisure || el.tags?.railway || el.tags?.shop || 'POI',
                tags: el.tags,
            }));
            setPOIs(pois);
        } catch (e) {
            message.error('Failed to fetch POIs.');
        } finally {
            setLoadingPOI(false);
        }
    };

    // Map click handler
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
                reverseGeocode(e.latlng.lat, e.latlng.lng);
                fetchPOIs(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    // Reverse geocode to get address
    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(`http://localhost:3000/properties/geocode/reverse/${lat}/${lng}`);
            const data = await response.json();
            setAddress(data.display_name || '');
            setCity(data.address?.city || data.address?.town || data.address?.village || '');
            setState(data.address?.state || '');
            setZip(data.address?.postcode || '');
        } catch (e) {
            // ignore
        }
    };

    // Add manual POI
    const addManualPOI = () => {
        setManualPOIs([...manualPOIs, { lat: marker?.lat || center[0], lng: marker?.lng || center[1], type: 'custom', name: `Custom POI ${manualPOIs.length + 1}` }]);
    };

    // Confirm selection
    const handleConfirm = () => {
        if (!marker) {
            message.warning('Please select a location on the map.');
            return;
        }
        onSelect({
            latitude: marker.lat,
            longitude: marker.lng,
            address,
            city,
            state,
            zipCode: zip,
            pois: [...pois, ...manualPOIs].map(poi => ({
                name: poi.name,
                type: poi.type,
                latitude: poi.lat,
                longitude: poi.lng,
                distance: poi.distance || undefined
            })),
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={handleConfirm}
            okText="Confirm Location"
            width={900}
            destroyOnClose
            title="Pick Property Location on Map"
        >
            <div style={{ marginBottom: 16 }}>
                <Space>
                    <Input.Search
                        placeholder="Search for a place or address"
                        enterButton="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onSearch={handleSearch}
                        loading={searching}
                        style={{ width: 350 }}
                    />
                    <Button onClick={addManualPOI}>Add Manual POI</Button>
                </Space>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 2, minWidth: 400, height: 400 }}>
                    <MapContainer
                        center={center}
                        zoom={15}
                        style={{ width: '100%', height: 400 }}
                        whenReady={() => {
                            // Map is ready
                        }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <MapClickHandler />
                        {marker && (
                            <Marker position={[marker.lat, marker.lng]}>
                                <Popup>Selected Location</Popup>
                            </Marker>
                        )}
                        {[...pois, ...manualPOIs].map((poi, idx) => (
                            <Marker key={idx} position={[poi.lat, poi.lng]} icon={L.divIcon({ className: 'custom-poi', html: `<div style='background:#2563EB;color:#fff;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:12px;'>${poi.type?.[0]?.toUpperCase() || 'P'}</div>`, iconSize: [18, 18], iconAnchor: [9, 9] })}>
                                <Popup>
                                    <b>{poi.name}</b>
                                    <br />Type: {poi.type}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
                <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ marginBottom: 8 }}>
                        <Text strong>Selected Address:</Text>
                        <div style={{ fontSize: 13, marginTop: 4 }}>{address || 'No address selected'}</div>
                        <div style={{ fontSize: 13, marginTop: 4 }}>{city} {state} {zip}</div>
                        <div style={{ fontSize: 13, marginTop: 4 }}>
                            Lat: {marker?.lat?.toFixed(6) || '-'}<br />Lng: {marker?.lng?.toFixed(6) || '-'}
                        </div>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                        <Text strong>Nearby POIs:</Text>
                        {loadingPOI ? <Spin size="small" /> : (
                            <List
                                size="small"
                                bordered
                                dataSource={[...pois, ...manualPOIs]}
                                renderItem={poi => (
                                    <List.Item>
                                        <span style={{ fontWeight: 500 }}>{poi.name}</span> <span style={{ color: '#888', fontSize: 12 }}>({poi.type})</span>
                                    </List.Item>
                                )}
                                locale={{ emptyText: 'No POIs found' }}
                                style={{ maxHeight: 180, overflow: 'auto' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default MapPicker; 