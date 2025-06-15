import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Switch, Button, Upload, Card, Space, Divider, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;
const { Option } = Select;

interface Amenity {
    name: string;
    category: 'interior' | 'exterior';
}

interface Specification {
    category: string;
    details: string[];
}

interface PropertyFormData {
    title: string;
    description: string;
    price: number;
    type: 'villa' | 'apartment' | 'house' | 'penthouse';
    status: 'for sale' | 'for rent' | 'sold';
    featured: boolean;
    bedrooms: number;
    bathrooms: number;
    garage: number;
    lotSize: string;
    livingArea: string;
    yearBuilt: number;
    images: string[];
    amenities: Amenity[];
    specifications: Specification[];
    location: {
        latitude: number;
        longitude: number;
        address: string;
        city: string;
        state: string;
        zipCode: string;
    };
    agentId?: number;
}

interface PropertyFormProps {
    onSubmit: (data: PropertyFormData) => void;
    initialData?: Partial<PropertyFormData>;
}

export type { PropertyFormData };

export const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, initialData }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [amenities, setAmenities] = useState<Amenity[]>(initialData?.amenities || []);
    const [specifications, setSpecifications] = useState<Specification[]>(initialData?.specifications || []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = (info: any) => {
        setFileList(info.fileList);
        const imageUrls = info.fileList.map((file: any) => file.url || '').filter(Boolean);
        form.setFieldValue('images', imageUrls);
    };

    const addAmenity = () => {
        const newAmenity: Amenity = { name: '', category: 'interior' };
        const newAmenities = [...amenities, newAmenity];
        setAmenities(newAmenities);
        form.setFieldValue('amenities', newAmenities);
    };

    const addSpecification = () => {
        const newSpec: Specification = { category: '', details: [] };
        const newSpecs = [...specifications, newSpec];
        setSpecifications(newSpecs);
        form.setFieldValue('specifications', newSpecs);
    };

    const handleAmenityChange = (index: number, field: keyof Amenity, value: string) => {
        const newAmenities = [...amenities];
        const currentAmenity = newAmenities[index] || { name: '', category: 'interior' as const };
        newAmenities[index] = {
            name: field === 'name' ? value : currentAmenity.name,
            category: field === 'category' ? (value as 'interior' | 'exterior') : currentAmenity.category,
        };
        setAmenities(newAmenities);
        form.setFieldValue('amenities', newAmenities);
    };

    const handleSpecificationChange = (index: number, field: keyof Specification, value: string | string[]) => {
        const newSpecs = [...specifications];
        const currentSpec = newSpecs[index] || { category: '', details: [] };
        newSpecs[index] = {
            category: field === 'category' ? (value as string) : currentSpec.category,
            details: field === 'details' ? (value as string[]) : currentSpec.details,
        };
        setSpecifications(newSpecs);
        form.setFieldValue('specifications', newSpecs);
    };

    const onFinish = async (values: PropertyFormData) => {
        try {
            setIsSubmitting(true);
            console.log('Submitting form data:', values);
            await onSubmit(values);
            setFileList([]);
            setAmenities([]);
            setSpecifications([]);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                featured: false,
                amenities: [],
                specifications: [],
                images: [],
                ...initialData,
            }}
            className="p-6"
        >
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card title="Basic Information" bordered={false}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[{ required: true, message: 'Please enter the title' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[{ required: true, message: 'Please enter the price' }]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="type"
                                    label="Type"
                                    rules={[{ required: true, message: 'Please select the type' }]}
                                >
                                    <Select>
                                        <Option value="villa">Villa</Option>
                                        <Option value="apartment">Apartment</Option>
                                        <Option value="house">House</Option>
                                        <Option value="penthouse">Penthouse</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="status"
                                    label="Status"
                                    rules={[{ required: true, message: 'Please select the status' }]}
                                >
                                    <Select>
                                        <Option value="for sale">For Sale</Option>
                                        <Option value="for rent">For Rent</Option>
                                        <Option value="sold">Sold</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[{ required: true, message: 'Please enter the description' }]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="featured"
                                    label="Featured"
                                    valuePropName="checked"
                                >
                                    <Switch />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Property Details" bordered={false}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item
                                    name="bedrooms"
                                    label="Bedrooms"
                                    rules={[{ required: true, message: 'Please enter the number of bedrooms' }]}
                                >
                                    <InputNumber className="w-full" min={0} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="bathrooms"
                                    label="Bathrooms"
                                    rules={[{ required: true, message: 'Please enter the number of bathrooms' }]}
                                >
                                    <InputNumber className="w-full" min={0} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="garage"
                                    label="Garage"
                                    rules={[{ required: true, message: 'Please enter the number of garage spaces' }]}
                                >
                                    <InputNumber className="w-full" min={0} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="lotSize"
                                    label="Lot Size"
                                    rules={[{ required: true, message: 'Please enter the lot size' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="livingArea"
                                    label="Living Area"
                                    rules={[{ required: true, message: 'Please enter the living area' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="yearBuilt"
                                    label="Year Built"
                                    rules={[{ required: true, message: 'Please enter the year built' }]}
                                >
                                    <InputNumber className="w-full" min={1800} max={new Date().getFullYear()} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Location" bordered={false}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name={['location', 'address']}
                                    label="Address"
                                    rules={[{ required: true, message: 'Please enter the address' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['location', 'city']}
                                    label="City"
                                    rules={[{ required: true, message: 'Please enter the city' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['location', 'state']}
                                    label="State"
                                    rules={[{ required: true, message: 'Please enter the state' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['location', 'zipCode']}
                                    label="ZIP Code"
                                    rules={[{ required: true, message: 'Please enter the ZIP code' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['location', 'latitude']}
                                    label="Latitude"
                                    rules={[{ required: true, message: 'Please enter the latitude' }]}
                                >
                                    <InputNumber className="w-full" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['location', 'longitude']}
                                    label="Longitude"
                                    rules={[{ required: true, message: 'Please enter the longitude' }]}
                                >
                                    <InputNumber className="w-full" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Images" bordered={false}>
                        <Form.Item name="images">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleImageUpload}
                                beforeUpload={() => false}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Amenities" bordered={false}>
                        {amenities.map((amenity, index) => (
                            <Row key={index} gutter={16} className="mb-4">
                                <Col span={10}>
                                    <Input
                                        placeholder="Amenity name"
                                        value={amenity.name}
                                        onChange={(e) => handleAmenityChange(index, 'name', e.target.value)}
                                    />
                                </Col>
                                <Col span={10}>
                                    <Select
                                        value={amenity.category}
                                        onChange={(value) => handleAmenityChange(index, 'category', value)}
                                    >
                                        <Option value="interior">Interior</Option>
                                        <Option value="exterior">Exterior</Option>
                                    </Select>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            const newAmenities = amenities.filter((_, i) => i !== index);
                                            setAmenities(newAmenities);
                                            form.setFieldValue('amenities', newAmenities);
                                        }}
                                    />
                                </Col>
                            </Row>
                        ))}
                        <Button type="dashed" onClick={addAmenity} block icon={<PlusOutlined />}>
                            Add Amenity
                        </Button>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Specifications" bordered={false}>
                        {specifications.map((spec, index) => (
                            <Row key={index} gutter={16} className="mb-4">
                                <Col span={10}>
                                    <Input
                                        placeholder="Category"
                                        value={spec.category}
                                        onChange={(e) => handleSpecificationChange(index, 'category', e.target.value)}
                                    />
                                </Col>
                                <Col span={10}>
                                    <Select
                                        mode="tags"
                                        placeholder="Details"
                                        value={spec.details}
                                        onChange={(value) => handleSpecificationChange(index, 'details', value)}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            const newSpecs = specifications.filter((_, i) => i !== index);
                                            setSpecifications(newSpecs);
                                            form.setFieldValue('specifications', newSpecs);
                                        }}
                                    />
                                </Col>
                            </Row>
                        ))}
                        <Button type="dashed" onClick={addSpecification} block icon={<PlusOutlined />}>
                            Add Specification
                        </Button>
                    </Card>
                </Col>
            </Row>

            <div className="mt-6 flex justify-end">
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                    {initialData ? 'Update Property' : 'Create Property'}
                </Button>
            </div>
        </Form>
    );
}; 