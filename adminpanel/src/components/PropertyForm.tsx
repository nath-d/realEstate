import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Switch, Button, Upload, Card, Space, Divider, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;
const { Option } = Select;

interface PropertySpecification {
    structure: string[];
    brickwork: string[];
    windows: string[];
    externalFinish: string[];
    interiorFinish: string[];
    doors: string[];
    flooring: string[];
    kitchen: string[];
    washroom: string[];
    elevator: string[];
    electricity: string[];
    waterSupply: string[];
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
    specifications: PropertySpecification[];
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set initial values when initialData changes
    useEffect(() => {
        if (initialData) {
            // Transform specifications data for form fields
            const formInitialValues = {
                ...initialData,
                // Map specifications array to individual fields for the form
                specification: initialData.specifications && initialData.specifications.length > 0
                    ? initialData.specifications[0]
                    : { structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] }
            };

            form.setFieldsValue(formInitialValues);

            // Set file list for images
            if (initialData.images && initialData.images.length > 0) {
                const files: UploadFile[] = initialData.images.map((url, index) => ({
                    uid: `-${index}`,
                    name: `image-${index}`,
                    status: 'done' as const,
                    url: url,
                }));
                setFileList(files);
            }
        }
    }, [initialData, form]);

    const handleImageUpload = (info: any) => {
        setFileList(info.fileList);
        const imageUrls = info.fileList.map((file: any) => file.url || '').filter(Boolean);
        form.setFieldValue('images', imageUrls);
    };

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);

            // Transform form data to match PropertyFormData structure
            const transformedData: PropertyFormData = {
                ...values,
                // Transform specification object back to specifications array
                specifications: values.specification ? [values.specification] : [{ structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] }],
                // Remove the temporary specification field
                specification: undefined
            };

            console.log('Submitting form data:', transformedData);
            await onSubmit(transformedData);
            setFileList([]);
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
                images: [],
                specification: { structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] },
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
                                    <InputNumber className="w-full" min={0} step={0.5} />
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
                                    <Input placeholder="e.g., 5000 sq ft" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="livingArea"
                                    label="Living Area"
                                    rules={[{ required: true, message: 'Please enter the living area' }]}
                                >
                                    <Input placeholder="e.g., 2500 sq ft" />
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
                    <Card title="Property Specifications (Tags)" bordered={false}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "structure"]}
                                    label="Structure"
                                    rules={[{ required: true, message: 'Please enter at least one structure' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., RCC Frame, Steel Frame" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "brickwork"]}
                                    label="Brickwork"
                                    rules={[{ required: true, message: 'Please enter at least one brickwork' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., Red Brick, Fly Ash" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "windows"]}
                                    label="Windows"
                                    rules={[{ required: true, message: 'Please enter at least one window type' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., UPVC, Aluminum" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "externalFinish"]}
                                    label="External Finish"
                                    rules={[{ required: true, message: 'Please enter at least one external finish' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., Paint, Stone Cladding" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "interiorFinish"]}
                                    label="Interior Finish"
                                    rules={[{ required: true, message: 'Please enter at least one interior finish' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., Wallpaper, Paint, Tiles" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "doors"]}
                                    label="Doors"
                                    rules={[{ required: true, message: 'Please enter at least one door type' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., Wooden, Steel, Glass" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "flooring"]}
                                    label="Flooring"
                                    rules={[{ required: true, message: 'Please enter at least one flooring type' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., Marble, Tiles, Wood" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "kitchen"]}
                                    label="Kitchen"
                                    rules={[{ required: true, message: 'Please enter at least one kitchen feature' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., Modular, Granite Counter" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "washroom"]}
                                    label="Washroom"
                                    rules={[{ required: true, message: 'Please enter at least one washroom feature' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., Modern Fittings, Tiles" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "elevator"]}
                                    label="Elevator"
                                    rules={[{ required: true, message: 'Please enter elevator details' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., Passenger, Service, None" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "electricity"]}
                                    label="Electricity"
                                    rules={[{ required: true, message: 'Please enter electricity details' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., 3 Phase, Backup Power" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["specification", "waterSupply"]}
                                    label="Water Supply"
                                    rules={[{ required: true, message: 'Please enter water supply details' }]}
                                >
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="e.g., 24/7, Borewell, Municipal" />
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
                                {fileList.length >= 8 ? null : (
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
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
                                    label="Zip Code"
                                    rules={[{ required: true, message: 'Please enter the zip code' }]}
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
                                    <InputNumber className="w-full" step={0.000001} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['location', 'longitude']}
                                    label="Longitude"
                                    rules={[{ required: true, message: 'Please enter the longitude' }]}
                                >
                                    <InputNumber className="w-full" step={0.000001} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <div className="flex justify-end space-x-4 mt-6">
                <Button onClick={() => form.resetFields()}>
                    Reset
                </Button>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
        </Form>
    );
}; 