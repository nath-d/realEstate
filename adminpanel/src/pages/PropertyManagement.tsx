import React, { useState, useEffect } from 'react';
import { Card, Button, message, Modal, List, Alert, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PropertyForm } from '../components/PropertyForm';
import type { PropertyFormData } from '../components/PropertyForm';

interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    type: 'villa' | 'apartment' | 'house' | 'penthouse';
    status: 'for sale' | 'for rent' | 'sold';
    bedrooms: number;
    bathrooms: number;
    garage: number;
    lotSize: string;
    livingArea: string;
    yearBuilt: number;
    featured: boolean;
    images: Array<{ id: number; url: string }>;
    amenities: Array<{ id: number; name: string; category: 'interior' | 'exterior' }>;
    specifications: Array<{ id: number; category: string; details: string[] }>;
    location: {
        id: number;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number;
        longitude: number;
    };
    agentId?: number;
}

const PropertyManagement: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [initialFormData, setInitialFormData] = useState<PropertyFormData | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            console.log('PropertyManagement: Fetching properties');
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3000/properties');
            console.log('PropertyManagement: Fetch response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('PropertyManagement: Server error response:', errorData);
                throw new Error(errorData.message || 'Failed to fetch properties');
            }

            const data = await response.json();
            console.log('PropertyManagement: Properties fetched successfully:', data);
            setProperties(data);
        } catch (error) {
            console.error('PropertyManagement: Error fetching properties:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch properties';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (values: PropertyFormData) => {
        try {
            console.log('Form submission started with values:', values);

            const formattedData = {
                ...values,
                price: Number(values.price) || 0,
                bedrooms: Number(values.bedrooms) || 0,
                bathrooms: Number(values.bathrooms) || 0,
                garage: Number(values.garage) || 0,
                lotSize: String(values.lotSize || ''),
                livingArea: String(values.livingArea || ''),
                yearBuilt: Number(values.yearBuilt) || 0,
                images: (values.images || []).map((url: string) => ({ url })),
                amenities: (values.amenities || []).map((amenity: { name: string; category: 'interior' | 'exterior' }) => ({
                    name: amenity.name,
                    category: amenity.category
                })),
                specifications: (values.specifications || []).map((spec: { category: string; details: string[] }) => ({
                    category: spec.category,
                    details: spec.details || []
                })),
                location: {
                    latitude: Number(values.location?.latitude) || 0,
                    longitude: Number(values.location?.longitude) || 0,
                    address: values.location?.address || '',
                    city: values.location?.city || '',
                    state: values.location?.state || '',
                    zipCode: values.location?.zipCode || ''
                }
            };

            console.log('Formatted data:', formattedData);

            if (editingProperty) {
                console.log('Updating property with ID:', editingProperty.id);
                const response = await fetch(`http://localhost:3000/properties/${editingProperty.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedData),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Failed to update property' }));
                    console.error('Update error response:', errorData);
                    throw new Error(errorData.message || 'Failed to update property');
                }

                const updatedProperty = await response.json();
                console.log('Property updated successfully:', updatedProperty);
                setProperties(properties.map(p => p.id === updatedProperty.id ? updatedProperty : p));
                message.success('Property updated successfully');
                setEditingProperty(null);
                setIsModalVisible(false);
            } else {
                console.log('Creating new property');
                const response = await fetch('http://localhost:3000/properties', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedData),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Failed to create property' }));
                    console.error('Create error response:', errorData);
                    throw new Error(errorData.message || 'Failed to create property');
                }

                const newProperty = await response.json();
                console.log('Property created successfully:', newProperty);
                setProperties([...properties, newProperty]);
                message.success('Property created successfully');
                setIsModalVisible(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            message.error(error instanceof Error ? error.message : 'Failed to submit property');
        }
    };

    const handleEdit = (property: Property) => {
        const formData: PropertyFormData = {
            title: property.title,
            description: property.description,
            price: property.price,
            type: property.type,
            status: property.status,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            garage: property.garage,
            lotSize: property.lotSize,
            livingArea: property.livingArea,
            yearBuilt: property.yearBuilt,
            featured: property.featured,
            images: property.images.map(img => img.url),
            amenities: property.amenities.map(amenity => ({
                name: amenity.name,
                category: amenity.category,
            })),
            specifications: property.specifications.map(spec => ({
                category: spec.category,
                details: spec.details,
            })),
            location: {
                address: property.location.address,
                city: property.location.city,
                state: property.location.state,
                zipCode: property.location.zipCode,
                latitude: property.location.latitude,
                longitude: property.location.longitude,
            },
            agentId: property.agentId,
        };
        setEditingProperty(property);
        setInitialFormData(formData);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/properties/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete property');
            }

            setProperties(properties.filter(p => p.id !== id));
            message.success('Property deleted successfully');
        } catch (error) {
            console.error('Error deleting property:', error);
            message.error('Failed to delete property');
        }
    };

    const formatPropertyForForm = (property: Property): Partial<PropertyFormData> => {
        return {
            ...property,
            images: property.images.map(img => img.url),
            amenities: property.amenities.map(amenity => ({
                name: amenity.name,
                category: amenity.category as 'interior' | 'exterior'
            })),
            specifications: property.specifications.map(spec => ({
                category: spec.category,
                details: spec.details
            })),
            location: property.location ? {
                latitude: property.location.latitude,
                longitude: property.location.longitude,
                address: property.location.address,
                city: property.location.city,
                state: property.location.state,
                zipCode: property.location.zipCode
            } : undefined
        };
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Property Management</h1>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    Add Property
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            ) : error ? (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                />
            ) : (
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                    dataSource={properties}
                    renderItem={(property) => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={property.title}
                                        src={property.images[0]?.url || 'https://via.placeholder.com/300x200'}
                                        className="h-48 w-full object-cover"
                                    />
                                }
                                actions={[
                                    <Button
                                        key="edit"
                                        type="link"
                                        onClick={() => {
                                            setEditingProperty(property);
                                            setIsModalVisible(true);
                                        }}
                                    >
                                        Edit
                                    </Button>,
                                    <Button
                                        key="delete"
                                        type="link"
                                        danger
                                        onClick={() => handleDelete(property.id)}
                                    >
                                        Delete
                                    </Button>,
                                ]}
                            >
                                <Card.Meta
                                    title={property.title}
                                    description={
                                        <div>
                                            <p className="text-lg font-semibold text-green-600">
                                                ${property.price.toLocaleString()}
                                            </p>
                                            <p className="text-gray-600">
                                                {property.type.charAt(0).toUpperCase() + property.type.slice(1)} - {property.status}
                                            </p>
                                            <p className="text-gray-600">
                                                {property.bedrooms} beds • {property.bathrooms} baths • {property.garage} garage
                                            </p>
                                            {property.location && (
                                                <p className="text-gray-600">
                                                    {property.location.address}, {property.location.city}, {property.location.state}
                                                </p>
                                            )}
                                        </div>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            )}

            <Modal
                title={editingProperty ? "Edit Property" : "Add Property"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingProperty(null);
                }}
                footer={null}
                width={1000}
            >
                <PropertyForm
                    onSubmit={handleFormSubmit}
                    initialData={editingProperty ? formatPropertyForForm(editingProperty) : undefined}
                />
            </Modal>
        </div>
    );
};

export default PropertyManagement;