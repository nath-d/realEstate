import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, Input, Button, Spin, List, Typography, Space, message, Card, Row, Col, Tag, Divider } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import config from '../../config';
import { EnvironmentOutlined, PlusOutlined, DeleteOutlined, AimOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

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

// Map click handler component
const MapClickHandler: React.FC<{
    onMapClick: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

// Map center updater component
const MapCenterUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (map && center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
};

// Map initialization component
const MapInitializer: React.FC<{ onMapReady: () => void }> = ({ onMapReady }) => {
    const map = useMap();

    useEffect(() => {
        if (map) {
            // Force a resize to ensure proper tile loading
            setTimeout(() => {
                map.invalidateSize();
                onMapReady();
            }, 100);
        }
    }, [map, onMapReady]);

    return null;
};

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
    const [mapLoading, setMapLoading] = useState(true);
    const [mapReady, setMapReady] = useState(false);
    const [showManualPOIForm, setShowManualPOIForm] = useState(false);
    const [newPOI, setNewPOI] = useState({ name: '', type: 'other' });
    const mapRef = useRef<any>(null);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (open) {
            setMapLoading(true);
            setMapReady(false);
            if (initialLocation) {
                setCenter([initialLocation.latitude, initialLocation.longitude]);
                setMarker({ lat: initialLocation.latitude, lng: initialLocation.longitude });
                setAddress(initialLocation.address || '');
                setCity(initialLocation.city || '');
                setState(initialLocation.state || '');
                setZip(initialLocation.zipCode || '');
            }
        } else {
            setMapLoading(true);
            setMapReady(false);
            setManualPOIs([]);
            setPOIs([]);
            setShowManualPOIForm(false);
            setNewPOI({ name: '', type: 'other' });
        }
    }, [open, initialLocation]);

    // Handle map ready
    const handleMapReady = useCallback(() => {
        setMapLoading(false);
        setMapReady(true);
    }, []);

    // Search location using Nominatim
    const handleSearch = async () => {
        if (!search.trim()) return;
        setSearching(true);
        try {
            const response = await fetch(`${config.api.baseUrl}/properties/geocode/search/${encodeURIComponent(search)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const loc = data[0];
                const newCenter: [number, number] = [parseFloat(loc.lat), parseFloat(loc.lon)];
                setCenter(newCenter);
                setMarker({ lat: parseFloat(loc.lat), lng: parseFloat(loc.lon) });
                setAddress(loc.display_name || '');
                setCity(loc.address?.city || loc.address?.town || loc.address?.village || '');
                setState(loc.address?.state || '');
                setZip(loc.address?.postcode || '');
                fetchPOIs(parseFloat(loc.lat), parseFloat(loc.lon));
                message.success('Location found!');
            } else {
                message.warning('No results found for this search.');
            }
        } catch (e) {
            message.error('Failed to search location. Please try again.');
        } finally {
            setSearching(false);
        }
    };

    // Fetch POIs using Overpass API
    const fetchPOIs = async (lat: number, lng: number) => {
        setLoadingPOI(true);
        setPOIs([]);
        try {
            const response = await fetch(`${config.api.baseUrl}/properties/pois/fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Modest radius for speed; backend caps and caches results
                body: JSON.stringify({ lat, lng, radius: 600 }),
            });
            let data: any = {};
            try {
                data = await response.json();
            } catch (err) {
                data = { elements: [] };
            }
            const pois: POI[] = (data.elements || [])
                .map((el: any) => {
                    const poiLat = el.lat ?? el.center?.lat;
                    const poiLng = el.lon ?? el.center?.lon;
                    if (poiLat == null || poiLng == null) return null;
                    const type = el.tags?.amenity || el.tags?.leisure || el.tags?.railway || el.tags?.shop || 'other';
                    const name = el.tags?.name || el.tags?.amenity || el.tags?.leisure || el.tags?.railway || el.tags?.shop || 'POI';
                    return {
                        lat: poiLat,
                        lng: poiLng,
                        type,
                        name,
                        tags: el.tags,
                    } as POI;
                })
                .filter((p: POI | null) => p !== null) as POI[];
            setPOIs(pois);
            if (pois.length > 0) {
                message.success(`Found ${pois.length} nearby places of interest`);
            }
        } catch (e) {
            message.error('Failed to fetch nearby places. You can still add them manually.');
        } finally {
            setLoadingPOI(false);
        }
    };

    // Handle map click
    const handleMapClick = (lat: number, lng: number) => {
        setMarker({ lat, lng });
        reverseGeocode(lat, lng);
        fetchPOIs(lat, lng);
    };

    // Reverse geocode to get address
    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(`${config.api.baseUrl}/properties/geocode/reverse/${lat}/${lng}`);
            const data = await response.json();
            setAddress(data.display_name || '');
            setCity(data.address?.city || data.address?.town || data.address?.village || '');
            setState(data.address?.state || '');
            setZip(data.address?.postcode || '');
        } catch (e) {
            console.log('Reverse geocoding failed, but continuing...');
        }
    };

    // Add manual POI with map selection
    const addManualPOIWithMap = () => {
        if (!marker) {
            message.warning('Please select a location on the map first.');
            return;
        }
        setShowManualPOIForm(true);
    };

    // Confirm manual POI addition
    const confirmManualPOI = () => {
        if (!newPOI.name.trim()) {
            message.warning('Please enter a name for the POI.');
            return;
        }
        const poi: POI = {
            lat: marker!.lat,
            lng: marker!.lng,
            type: newPOI.type,
            name: newPOI.name.trim(),
        };
        setManualPOIs([...manualPOIs, poi]);
        setNewPOI({ name: '', type: 'other' });
        setShowManualPOIForm(false);
        message.success('POI added successfully!');
    };

    // Remove manual POI
    const removeManualPOI = (index: number) => {
        setManualPOIs(manualPOIs.filter((_, i) => i !== index));
    };

    // Use current location
    const useCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCenter: [number, number] = [latitude, longitude];
                    setCenter(newCenter);
                    setMarker({ lat: latitude, lng: longitude });
                    reverseGeocode(latitude, longitude);
                    fetchPOIs(latitude, longitude);
                    message.success('Current location set!');
                },
                (error) => {
                    message.error('Unable to get current location. Please select manually.');
                }
            );
        } else {
            message.error('Geolocation is not supported by this browser.');
        }
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
            cancelText="Cancel"
            width={1200}
            destroyOnClose
            title={
                <div className="flex items-center space-x-2">
                    <EnvironmentOutlined className="text-blue-600" />
                    <span className="text-lg font-semibold">Pick Property Location on Map</span>
                </div>
            }
            className="map-picker-modal"
        >
            <div className="space-y-4">
                {/* Search and Controls */}
                <Card size="small" className="shadow-sm">
                    <Row gutter={16} align="middle">
                        <Col flex="auto">
                            <Input.Search
                                placeholder="Search for a place or address (e.g., 'Times Square, New York')"
                                enterButton="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onSearch={handleSearch}
                                loading={searching}
                                size="large"
                                onPressEnter={handleSearch}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<AimOutlined />}
                                onClick={useCurrentLocation}
                                size="large"
                                type="default"
                            >
                                My Location
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={addManualPOIWithMap}
                                size="large"
                                disabled={!marker}
                            >
                                Add POI
                            </Button>
                        </Col>
                    </Row>
                </Card>

                <Row gutter={16}>
                    {/* Map Container */}
                    <Col span={16}>
                        <Card size="small" className="shadow-sm" bodyStyle={{ padding: 0 }}>
                            <div style={{ height: 500, position: 'relative' }}>
                                {mapLoading && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: '#f5f5f5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 1000
                                    }}>
                                        <Spin size="large" />
                                        <div className="ml-3 text-gray-600">Loading map...</div>
                                    </div>
                                )}
                                <MapContainer
                                    center={center}
                                    zoom={15}
                                    style={{ width: '100%', height: '100%' }}
                                    whenReady={() => {
                                        // Map is ready, but we'll wait for tiles to load
                                    }}
                                    ref={mapRef}
                                    zoomControl={true}
                                    attributionControl={true}
                                    doubleClickZoom={true}
                                    scrollWheelZoom={true}
                                    dragging={true}
                                    easeLinearity={0.35}
                                    worldCopyJump={false}
                                    maxBounds={undefined}
                                    maxBoundsViscosity={0.0}
                                    keyboard={true}
                                    keyboardPanDelta={80}
                                    inertia={true}
                                    inertiaDeceleration={3000}
                                    inertiaMaxSpeed={3000}
                                    zoomAnimation={true}
                                    zoomAnimationThreshold={4}
                                    fadeAnimation={true}
                                    markerZoomAnimation={true}
                                    transform3DLimit={8388608}
                                    tapTolerance={15}
                                    trackResize={true}
                                    boxZoom={true}
                                    closePopupOnClick={true}
                                    bounceAtZoomLimits={true}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                                        maxZoom={19}
                                        minZoom={1}
                                        tileSize={256}
                                        zoomOffset={0}
                                        updateWhenZooming={true}
                                        updateWhenIdle={true}
                                        keepBuffer={2}
                                        maxNativeZoom={18}
                                        subdomains="abc"
                                    />
                                    <MapClickHandler onMapClick={handleMapClick} />
                                    <MapCenterUpdater center={center} />
                                    <MapInitializer onMapReady={handleMapReady} />

                                    {/* Main property marker */}
                                    {marker && (
                                        <Marker
                                            position={[marker.lat, marker.lng]}
                                            icon={L.divIcon({
                                                className: 'property-marker',
                                                html: `<div style='background:#1890ff;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:3px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.3);'>🏠</div>`,
                                                iconSize: [24, 24],
                                                iconAnchor: [12, 12]
                                            })}
                                        >
                                            <Popup>
                                                <div>
                                                    <strong>Selected Property Location</strong><br />
                                                    {address && <span>{address}</span>}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )}

                                    {/* POI markers */}
                                    {[...pois, ...manualPOIs].map((poi, idx) => (
                                        <Marker
                                            key={idx}
                                            position={[poi.lat, poi.lng]}
                                            icon={L.divIcon({
                                                className: 'poi-marker',
                                                html: `<div style='background:#52c41a;color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3);'>${poi.type?.[0]?.toUpperCase() || 'P'}</div>`,
                                                iconSize: [20, 20],
                                                iconAnchor: [10, 10]
                                            })}
                                        >
                                            <Popup>
                                                <div>
                                                    <strong>{poi.name}</strong><br />
                                                    Type: {poi.type}<br />
                                                    {poi.distance && `Distance: ${poi.distance}m`}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>
                        </Card>
                    </Col>

                    {/* Sidebar */}
                    <Col span={8}>
                        <div className="space-y-4">
                            {/* Selected Location Info */}
                            <Card size="small" title="Selected Location" className="shadow-sm">
                                <div className="space-y-2">
                                    <div>
                                        <Text strong>Address:</Text>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {address || 'No address selected'}
                                        </div>
                                    </div>
                                    <div>
                                        <Text strong>City:</Text>
                                        <div className="text-sm text-gray-600">{city || 'Not specified'}</div>
                                    </div>
                                    <div>
                                        <Text strong>State:</Text>
                                        <div className="text-sm text-gray-600">{state || 'Not specified'}</div>
                                    </div>
                                    <div>
                                        <Text strong>Zip Code:</Text>
                                        <div className="text-sm text-gray-600">{zip || 'Not specified'}</div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <Text strong>Coordinates:</Text>
                                        <div className="text-sm text-gray-600">
                                            {marker ? (
                                                <>
                                                    Lat: {marker.lat.toFixed(6)}<br />
                                                    Lng: {marker.lng.toFixed(6)}
                                                </>
                                            ) : (
                                                'No location selected'
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Manual POI Form */}
                            {showManualPOIForm && (
                                <Card size="small" title="Add Custom POI" className="shadow-sm">
                                    <div className="space-y-3">
                                        <div>
                                            <Text strong>Name:</Text>
                                            <Input
                                                value={newPOI.name}
                                                onChange={e => setNewPOI({ ...newPOI, name: e.target.value })}
                                                placeholder="Enter POI name"
                                                size="small"
                                            />
                                        </div>
                                        <div>
                                            <Text strong>Type:</Text>
                                            <select
                                                value={newPOI.type}
                                                onChange={e => setNewPOI({ ...newPOI, type: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded text-sm"
                                            >
                                                <option value="school">School</option>
                                                <option value="park">Park</option>
                                                <option value="station">Station</option>
                                                <option value="restaurant">Restaurant</option>
                                                <option value="shop">Shop</option>
                                                <option value="hospital">Hospital</option>
                                                <option value="bank">Bank</option>
                                                <option value="gym">Gym</option>
                                                <option value="cinema">Cinema</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                type="primary"
                                                size="small"
                                                onClick={confirmManualPOI}
                                            >
                                                Add POI
                                            </Button>
                                            <Button
                                                size="small"
                                                onClick={() => setShowManualPOIForm(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* POIs List */}
                            <Card size="small" title="Points of Interest" className="shadow-sm">
                                {loadingPOI ? (
                                    <div className="text-center py-4">
                                        <Spin size="small" />
                                        <div className="text-sm text-gray-500 mt-2">Loading nearby places...</div>
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {[...pois, ...manualPOIs].length === 0 ? (
                                            <div className="text-center py-4 text-gray-500">
                                                No POIs found. Click on the map to search for nearby places or add custom POIs.
                                            </div>
                                        ) : (
                                            [...pois, ...manualPOIs].map((poi, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm">{poi.name}</div>
                                                        <div className="text-xs text-gray-500 flex items-center">
                                                            <Tag color="blue">{poi.type}</Tag>
                                                            {poi.distance && (
                                                                <span className="ml-2">{poi.distance}m</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {idx >= pois.length && (
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            danger
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => removeManualPOI(idx - pois.length)}
                                                        />
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default MapPicker; 