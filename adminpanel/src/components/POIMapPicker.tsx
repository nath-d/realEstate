import React, { useState, useRef, useEffect, useCallback } from 'react';
import config from '../../config';
import { Modal, Input, Button, Spin, Typography, message, Card, Row, Col, Select } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

interface POIResult {
    name: string;
    type: string;
    latitude: number;
    longitude: number;
    distance?: number;
}

interface POIMapPickerProps {
    open: boolean;
    onCancel: () => void;
    onSelect: (poi: POIResult) => void;
    initialLocation?: {
        latitude: number;
        longitude: number;
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

const POIMapPicker: React.FC<POIMapPickerProps> = ({ open, onCancel, onSelect, initialLocation }) => {
    const [center, setCenter] = useState<[number, number]>(initialLocation ? [initialLocation.latitude, initialLocation.longitude] : DEFAULT_CENTER);
    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(initialLocation ? { lat: initialLocation.latitude, lng: initialLocation.longitude } : null);
    const [mapLoading, setMapLoading] = useState(true);
    const [mapReady, setMapReady] = useState(false);
    const [poiName, setPoiName] = useState('');
    const [poiType, setPoiType] = useState('other');
    const [address, setAddress] = useState('');
    const mapRef = useRef<any>(null);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (open) {
            setMapLoading(true);
            setMapReady(false);
            if (initialLocation) {
                setCenter([initialLocation.latitude, initialLocation.longitude]);
                setMarker({ lat: initialLocation.latitude, lng: initialLocation.longitude });
                reverseGeocode(initialLocation.latitude, initialLocation.longitude);
            }
        } else {
            setMapLoading(true);
            setMapReady(false);
            setPoiName('');
            setPoiType('other');
            setAddress('');
        }
    }, [open, initialLocation]);

    // Handle map ready
    const handleMapReady = useCallback(() => {
        setMapLoading(false);
        setMapReady(true);
    }, []);

    // Handle map click
    const handleMapClick = (lat: number, lng: number) => {
        setMarker({ lat, lng });
        reverseGeocode(lat, lng);
    };

    // Reverse geocode to get address
    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(`${config.api.baseUrl}/properties/geocode/reverse/${lat}/${lng}`);
            const data = await response.json();
            setAddress(data.display_name || '');
        } catch (e) {
            console.log('Reverse geocoding failed, but continuing...');
        }
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

    // Confirm POI selection
    const handleConfirm = () => {
        if (!marker) {
            message.warning('Please select a location on the map.');
            return;
        }
        if (!poiName.trim()) {
            message.warning('Please enter a name for the POI.');
            return;
        }
        onSelect({
            name: poiName.trim(),
            type: poiType,
            latitude: marker.lat,
            longitude: marker.lng,
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={handleConfirm}
            okText="Add POI"
            cancelText="Cancel"
            width={800}
            destroyOnClose
            title={
                <div className="flex items-center space-x-2">
                    <EnvironmentOutlined className="text-blue-600" />
                    <span className="text-lg font-semibold">Add Point of Interest</span>
                </div>
            }
            className="poi-map-picker-modal"
        >
            <div className="space-y-4">
                {/* Controls */}
                <Card size="small" className="shadow-sm">
                    <Row gutter={16} align="middle">
                        <Col>
                            <Button
                                icon={<AimOutlined />}
                                onClick={useCurrentLocation}
                                size="large"
                                type="default"
                            >
                                Use My Location
                            </Button>
                        </Col>
                        <Col flex="auto">
                            <Text type="secondary">
                                Click on the map to select the POI location, then fill in the details below.
                            </Text>
                        </Col>
                    </Row>
                </Card>

                <Row gutter={16}>
                    {/* Map Container */}
                    <Col span={12}>
                        <Card size="small" className="shadow-sm" bodyStyle={{ padding: 0 }}>
                            <div style={{ height: 400, position: 'relative' }}>
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

                                    {/* POI marker */}
                                    {marker && (
                                        <Marker
                                            position={[marker.lat, marker.lng]}
                                            icon={L.divIcon({
                                                className: 'poi-marker',
                                                html: `<div style='background:#52c41a;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:3px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.3);'>📍</div>`,
                                                iconSize: [24, 24],
                                                iconAnchor: [12, 12]
                                            })}
                                        >
                                            <Popup>
                                                <div>
                                                    <strong>Selected POI Location</strong><br />
                                                    {address && <span>{address}</span>}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )}
                                </MapContainer>
                            </div>
                        </Card>
                    </Col>

                    {/* POI Details Form */}
                    <Col span={12}>
                        <div className="space-y-4">
                            {/* Location Info */}
                            <Card size="small" title="Selected Location" className="shadow-sm">
                                <div className="space-y-2">
                                    <div>
                                        <Text strong>Address:</Text>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {address || 'No address selected'}
                                        </div>
                                    </div>
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

                            {/* POI Details Form */}
                            <Card size="small" title="POI Details" className="shadow-sm">
                                <div className="space-y-4">
                                    <div>
                                        <Text strong>Name:</Text>
                                        <Input
                                            value={poiName}
                                            onChange={e => setPoiName(e.target.value)}
                                            placeholder="Enter POI name (e.g., Central Park)"
                                            size="large"
                                        />
                                    </div>
                                    <div>
                                        <Text strong>Type:</Text>
                                        <Select
                                            value={poiType}
                                            onChange={setPoiType}
                                            placeholder="Select POI type"
                                            size="large"
                                            style={{ width: '100%' }}
                                        >
                                            <Option value="school">School</Option>
                                            <Option value="park">Park</Option>
                                            <Option value="station">Station</Option>
                                            <Option value="restaurant">Restaurant</Option>
                                            <Option value="shop">Shop</Option>
                                            <Option value="hospital">Hospital</Option>
                                            <Option value="bank">Bank</Option>
                                            <Option value="gym">Gym</Option>
                                            <Option value="cinema">Cinema</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Text strong>Distance (optional):</Text>
                                        <Input
                                            placeholder="Distance in meters (e.g., 500)"
                                            size="large"
                                            type="number"
                                            min={0}
                                        />
                                    </div>
                                </div>
                            </Card>

                            {/* Instructions */}
                            <Card size="small" className="shadow-sm bg-blue-50">
                                <div className="text-sm text-blue-800">
                                    <strong>Instructions:</strong>
                                    <ol className="list-decimal ml-4 mt-2 space-y-1">
                                        <li>Click on the map to select the POI location</li>
                                        <li>Fill in the POI name and select the type</li>
                                        <li>Optionally add the distance from the property</li>
                                        <li>Click "Add POI" to confirm</li>
                                    </ol>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default POIMapPicker; 