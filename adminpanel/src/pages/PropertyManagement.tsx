import React, { useState, useEffect } from 'react';
import { Card, Button, message, Modal, Alert, Spin, Table, Image, Tag, Space, Drawer, Descriptions, Divider, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, HomeOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { PropertyForm } from '../components/PropertyForm';
import type { PropertyFormData } from '../components/PropertyForm';

const { Title, Text } = Typography;

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
    specifications: Array<{
        id: number;
        structure: string[];
        brickwork: string[];
        windows: string[];
    }>;
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
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [viewingProperty, setViewingProperty] = useState<Property | null>(null);

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

            // Base property data
            const baseData = {
                ...values,
                price: Number(values.price) || 0,
                bedrooms: Number(values.bedrooms) || 0,
                bathrooms: Number(values.bathrooms) || 0,
                garage: Number(values.garage) || 0,
                lotSize: String(values.lotSize || ''),
                livingArea: String(values.livingArea || ''),
                yearBuilt: Number(values.yearBuilt) || 0,
            };

            if (editingProperty) {
                // For updates, we need to replace existing relations
                console.log('Updating property with ID:', editingProperty.id);
                const updateData = {
                    ...baseData,
                    images: {
                        deleteMany: {},
                        create: (values.images || []).map((url: string) => ({ url }))
                    },
                    specifications: {
                        deleteMany: {},
                        create: (values.specifications || []).map((spec: any) => ({
                            structure: spec.structure || [],
                            brickwork: spec.brickwork || [],
                            windows: spec.windows || []
                        }))
                    },
                    location: {
                        delete: true,
                        create: {
                            latitude: Number(values.location?.latitude) || 0,
                            longitude: Number(values.location?.longitude) || 0,
                            address: values.location?.address || '',
                            city: values.location?.city || '',
                            state: values.location?.state || '',
                            zipCode: values.location?.zipCode || ''
                        }
                    }
                };

                console.log('Update formatted data:', updateData);

                const response = await fetch(`http://localhost:3000/properties/${editingProperty.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
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
                // For creates, we just use create
                console.log('Creating new property');
                const createData = {
                    ...baseData,
                    images: {
                        create: (values.images || []).map((url: string) => ({ url }))
                    },
                    specifications: {
                        create: (values.specifications || []).map((spec: any) => ({
                            structure: spec.structure || [],
                            brickwork: spec.brickwork || [],
                            windows: spec.windows || []
                        }))
                    },
                    location: {
                        create: {
                            latitude: Number(values.location?.latitude) || 0,
                            longitude: Number(values.location?.longitude) || 0,
                            address: values.location?.address || '',
                            city: values.location?.city || '',
                            state: values.location?.state || '',
                            zipCode: values.location?.zipCode || ''
                        }
                    }
                };

                console.log('Create formatted data:', createData);

                const response = await fetch('http://localhost:3000/properties', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(createData),
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
        const formData = formatPropertyForForm(property) as PropertyFormData;
        setEditingProperty(property);
        setInitialFormData(formData);
        setIsModalVisible(true);
    };

    const handleView = (property: Property) => {
        setViewingProperty(property);
        setIsDrawerVisible(true);
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
            specifications: property.specifications && property.specifications.length > 0
                ? property.specifications.map(spec => ({
                    structure: spec.structure || [],
                    brickwork: spec.brickwork || [],
                    windows: spec.windows || []
                }))
                : [{ structure: [], brickwork: [], windows: [] }],
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

    const columns = [
        {
            title: 'Property',
            key: 'property',
            width: 320,
            render: (record: Property) => (
                <div className="flex items-center space-x-4 py-2">
                    <div className="relative">
                        <Image
                            width={90}
                            height={70}
                            src={record.images[0]?.url || 'https://via.placeholder.com/90x70'}
                            alt="Property"
                            style={{ objectFit: 'cover', borderRadius: '12px' }}
                            preview={false}
                            className="shadow-md"
                        />
                        {record.featured && (
                            <div className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
                                ★
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate text-base mb-1">{record.title}</div>
                        <div className="text-sm text-gray-500 flex items-center mb-1">
                            <HomeOutlined className="mr-2 text-blue-500" />
                            <span className="capitalize">{record.type}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <EnvironmentOutlined className="mr-2 text-green-500" />
                            {record.location ? `${record.location.city}, ${record.location.state}` : 'No location'}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (price: number) => (
                <div className="text-center py-2">
                    <div className="text-xl font-bold text-green-600 flex items-center justify-center mb-1">
                        <DollarOutlined className="mr-1" />
                        {price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                        USD
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            render: (status: string) => {
                const colorMap = {
                    'for sale': { color: 'green', bg: 'bg-green-50', text: 'FOR SALE' },
                    'for rent': { color: 'orange', bg: 'bg-orange-50', text: 'FOR RENT' },
                    'sold': { color: 'red', bg: 'bg-red-50', text: 'SOLD' }
                };
                const config = colorMap[status as keyof typeof colorMap] || colorMap['for sale'];

                return (
                    <div className="text-center py-2">
                        <Tag
                            color={config.color}
                            className={`text-xs font-semibold px-3 py-1 rounded-full border-0 ${config.bg}`}
                        >
                            {config.text}
                        </Tag>
                    </div>
                );
            },
        },
        {
            title: 'Details',
            key: 'details',
            width: 200,
            render: (record: Property) => (
                <div className="space-y-2 py-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Beds:
                        </span>
                        <span className="font-semibold text-gray-800">{record.bedrooms}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Baths:
                        </span>
                        <span className="font-semibold text-gray-800">{record.bathrooms}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            Garage:
                        </span>
                        <span className="font-semibold text-gray-800">{record.garage}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                            Year:
                        </span>
                        <span className="font-semibold text-gray-800">{record.yearBuilt}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Size',
            key: 'size',
            width: 160,
            render: (record: Property) => (
                <div className="space-y-2 py-2">
                    <div className="text-sm bg-gray-50 p-2 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Lot:</span>
                            <span className="font-semibold text-gray-800">{record.lotSize}</span>
                        </div>
                    </div>
                    <div className="text-sm bg-blue-50 p-2 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Living:</span>
                            <span className="font-semibold text-gray-800">{record.livingArea}</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (record: Property) => (
                <div className="flex space-x-2 py-2">
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                        size="small"
                        className="bg-blue-600 hover:bg-blue-700 shadow-sm border-0"
                    >
                        View
                    </Button>
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        size="small"
                        className="border-gray-300 hover:border-blue-500 hover:text-blue-600 shadow-sm"
                    >
                        Edit
                    </Button>
                    <Button
                        type="default"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                        size="small"
                        className="border-red-300 hover:border-red-500 shadow-sm"
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <Title level={2} className="mb-2 text-gray-800">Property Management</Title>
                    <Text type="secondary" className="text-gray-600">Manage your real estate properties</Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                    size="large"
                    className="bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                    Add Property
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : error ? (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-6"
                />
            ) : (
                <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
                    <div className="p-6 bg-white">
                        <Table
                            columns={columns}
                            dataSource={properties}
                            rowKey="id"
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} properties`,
                                className: "mt-6",
                                itemRender: (page, type, originalElement) => {
                                    if (type === 'page') {
                                        return (
                                            <span className="px-3 py-2 rounded-md hover:bg-blue-50 transition-colors">
                                                {page}
                                            </span>
                                        );
                                    }
                                    return originalElement;
                                }
                            }}
                            scroll={{ x: 1200 }}
                            loading={loading}
                            className="custom-table"
                            rowClassName="hover:bg-blue-50 transition-all duration-200 border-b border-gray-100"
                            size="middle"
                        />
                    </div>
                </Card>
            )}

            <Modal
                title={
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <HomeOutlined className="text-white text-lg" />
                        </div>
                        <span className="text-xl font-semibold text-gray-800">
                            {editingProperty ? "Edit Property" : "Add Property"}
                        </span>
                    </div>
                }
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingProperty(null);
                }}
                footer={null}
                width={1000}
                className="modern-modal"
            >
                <PropertyForm
                    onSubmit={handleFormSubmit}
                    initialData={editingProperty ? formatPropertyForForm(editingProperty) : undefined}
                />
            </Modal>

            <Drawer
                title={
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <HomeOutlined className="text-white text-lg" />
                        </div>
                        <span className="text-xl font-semibold text-gray-800">Property Details</span>
                    </div>
                }
                placement="right"
                width={600}
                onClose={() => {
                    setIsDrawerVisible(false);
                    setViewingProperty(null);
                }}
                open={isDrawerVisible}
                className="modern-drawer"
            >
                {viewingProperty && (
                    <div className="space-y-6">
                        {/* Property Images */}
                        <div>
                            <Title level={4}>Images</Title>
                            <div className="grid grid-cols-2 gap-2">
                                {viewingProperty.images.map((image, index) => (
                                    <Image
                                        key={image.id}
                                        width="100%"
                                        height={120}
                                        src={image.url}
                                        alt={`Property ${index + 1}`}
                                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                ))}
                            </div>
                        </div>

                        <Divider />

                        {/* Basic Information */}
                        <div>
                            <Title level={4}>Basic Information</Title>
                            <Descriptions column={1} size="small" bordered>
                                <Descriptions.Item label="Title">{viewingProperty.title}</Descriptions.Item>
                                <Descriptions.Item label="Type">
                                    <Tag color="blue">{viewingProperty.type.charAt(0).toUpperCase() + viewingProperty.type.slice(1)}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Status">
                                    <Tag color={viewingProperty.status === 'for sale' ? 'green' : viewingProperty.status === 'for rent' ? 'orange' : 'red'}>
                                        {viewingProperty.status.toUpperCase()}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Price">
                                    <Text strong className="text-green-600">${viewingProperty.price.toLocaleString()}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Featured">
                                    <Tag color={viewingProperty.featured ? 'gold' : 'default'}>
                                        {viewingProperty.featured ? 'Yes' : 'No'}
                                    </Tag>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>

                        <Divider />

                        {/* Property Details */}
                        <div>
                            <Title level={4}>Property Details</Title>
                            <Descriptions column={2} size="small" bordered>
                                <Descriptions.Item label="Bedrooms">{viewingProperty.bedrooms}</Descriptions.Item>
                                <Descriptions.Item label="Bathrooms">{viewingProperty.bathrooms}</Descriptions.Item>
                                <Descriptions.Item label="Garage">{viewingProperty.garage}</Descriptions.Item>
                                <Descriptions.Item label="Year Built">{viewingProperty.yearBuilt}</Descriptions.Item>
                                <Descriptions.Item label="Lot Size">{viewingProperty.lotSize}</Descriptions.Item>
                                <Descriptions.Item label="Living Area">{viewingProperty.livingArea}</Descriptions.Item>
                            </Descriptions>
                        </div>

                        <Divider />

                        {/* Specifications */}
                        {viewingProperty.specifications && viewingProperty.specifications.length > 0 && (
                            <div>
                                <Title level={4}>Specifications</Title>
                                {viewingProperty.specifications.map((spec, index) => (
                                    <div key={spec.id} className="space-y-3">
                                        {index > 0 && <Divider />}
                                        <div className="space-y-2">
                                            <div>
                                                <Text strong className="text-gray-700">Structure:</Text>
                                                <div className="mt-1">
                                                    {spec.structure && spec.structure.length > 0 ? (
                                                        spec.structure.map((item, i) => (
                                                            <Tag key={i} color="blue" className="mb-1 mr-1">
                                                                {item}
                                                            </Tag>
                                                        ))
                                                    ) : (
                                                        <Text type="secondary">No structure specifications</Text>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <Text strong className="text-gray-700">Brickwork:</Text>
                                                <div className="mt-1">
                                                    {spec.brickwork && spec.brickwork.length > 0 ? (
                                                        spec.brickwork.map((item, i) => (
                                                            <Tag key={i} color="green" className="mb-1 mr-1">
                                                                {item}
                                                            </Tag>
                                                        ))
                                                    ) : (
                                                        <Text type="secondary">No brickwork specifications</Text>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <Text strong className="text-gray-700">Windows:</Text>
                                                <div className="mt-1">
                                                    {spec.windows && spec.windows.length > 0 ? (
                                                        spec.windows.map((item, i) => (
                                                            <Tag key={i} color="orange" className="mb-1 mr-1">
                                                                {item}
                                                            </Tag>
                                                        ))
                                                    ) : (
                                                        <Text type="secondary">No window specifications</Text>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Divider />

                        {/* Description */}
                        <div>
                            <Title level={4}>Description</Title>
                            <Text className="text-gray-700 leading-relaxed">{viewingProperty.description}</Text>
                        </div>

                        <Divider />

                        {/* Location */}
                        {viewingProperty.location && (
                            <div>
                                <Title level={4}>Location</Title>
                                <Descriptions column={1} size="small" bordered>
                                    <Descriptions.Item label="Address">{viewingProperty.location.address}</Descriptions.Item>
                                    <Descriptions.Item label="City">{viewingProperty.location.city}</Descriptions.Item>
                                    <Descriptions.Item label="State">{viewingProperty.location.state}</Descriptions.Item>
                                    <Descriptions.Item label="Zip Code">{viewingProperty.location.zipCode}</Descriptions.Item>
                                    <Descriptions.Item label="Coordinates">
                                        {viewingProperty.location.latitude}, {viewingProperty.location.longitude}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-4">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setIsDrawerVisible(false);
                                    handleEdit(viewingProperty);
                                }}
                                className="flex-1"
                            >
                                Edit Property
                            </Button>
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    setIsDrawerVisible(false);
                                    handleDelete(viewingProperty.id);
                                }}
                                className="flex-1"
                            >
                                Delete Property
                            </Button>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default PropertyManagement;