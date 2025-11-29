import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Switch, Button, Upload, Card, Space, Divider, Row, Col, message, Image, Typography, Tag } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, LoadingOutlined, EnvironmentOutlined, PictureOutlined, HomeOutlined, DollarOutlined, InfoCircleOutlined, VideoCameraOutlined, LinkOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { cloudinaryService } from '../services/cloudinaryService';
import MapPicker from './MapPicker';
import POIMapPicker from './POIMapPicker';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

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

interface MaterialCertificationForm {
    material: string;
    brand: string;
    certificate: string;
    description: string;
    verified: boolean;
    imageUrl?: string;
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
    materialCertifications: MaterialCertificationForm[];
    pois: Array<{
        name: string;
        type: string;
        latitude: number;
        longitude: number;
        distance?: number;
    }>;
}

interface PropertyFormProps {
    onSubmit: (data: PropertyFormData) => void;
    initialData?: Partial<PropertyFormData>;
}

export type { PropertyFormData };

// Section Header Component
const SectionHeader = ({ title, subtitle, icon, action }: {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    action?: React.ReactNode
}) => (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e2e8f0]">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#eff6ff] rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <div>
                <Title level={4} className="m-0 font-semibold text-[#1e293b] text-[16px]">{title}</Title>
                {subtitle && <Text type="secondary" className="text-[#6b7280] text-sm">{subtitle}</Text>}
            </div>
        </div>
        {action && <div>{action}</div>}
    </div>
);

export const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, initialData }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [mapPOIs, setMapPOIs] = useState<any[]>([]);
    const [poiMapModalOpen, setPoiMapModalOpen] = useState(false);
    const [currentPOIIndex, setCurrentPOIIndex] = useState<number | null>(null);
    const [certificationImages, setCertificationImages] = useState<{ [key: number]: UploadFile[] }>({});

    useEffect(() => {
        if (initialData) {
            const formInitialValues = {
                ...initialData,
                specification: initialData.specifications && initialData.specifications.length > 0
                    ? initialData.specifications[0]
                    : { structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] },
                materialCertifications: initialData.materialCertifications || [],
                pois: initialData.pois || [],
            };
            form.setFieldsValue(formInitialValues);
            if (initialData.images && initialData.images.length > 0) {
                const files: UploadFile[] = initialData.images.map((url, index) => ({
                    uid: `-${index}`,
                    name: `image-${index}`,
                    status: 'done' as const,
                    url: url,
                }));
                setFileList(files);
            }

            if (initialData.materialCertifications) {
                const certImages: { [key: number]: UploadFile[] } = {};
                initialData.materialCertifications.forEach((cert, index) => {
                    if (cert.imageUrl) {
                        certImages[index] = [{
                            uid: `cert-${index}`,
                            name: `certification-${index}`,
                            status: 'done' as const,
                            url: cert.imageUrl,
                        }];
                    }
                });
                setCertificationImages(certImages);
            }
        } else {
            form.resetFields();
            setFileList([]);
            setCertificationImages({});
        }
    }, [initialData, form]);

    const handleImageUpload = async (info: any) => {
        const { fileList: newFileList, file } = info;

        // Check if any files are still uploading
        const isAnyFileUploading = newFileList.some((f: any) => f.status === 'uploading');
        setUploading(isAnyFileUploading);

        if (file.status === 'done') {
            message.success(`${file.name} uploaded successfully`);

            if (file.response && file.response.data && file.response.data.url) {
                file.url = file.response.data.url;
            }
        }

        if (file.status === 'error') {
            message.error(`${file.name} upload failed`);
        }

        setFileList(newFileList);

        const imageUrls = newFileList
            .filter((file: any) => {
                const hasUrl = file.url || (file.response && file.response.data && file.response.data.url);
                return hasUrl;
            })
            .map((file: any) => {
                const url = file.url || (file.response && file.response.data && file.response.data.url);
                return url;
            });

        form.setFieldValue('images', imageUrls);
    };

    const handleCertificationImageUpload = async (info: any, certIndex: number) => {
        const { fileList: newFileList, file } = info;

        if (file.status === 'uploading') {
            setCertificationImages(prev => ({
                ...prev,
                [certIndex]: newFileList
            }));
            return;
        }

        if (file.status === 'done') {
            message.success(`${file.name} uploaded successfully`);

            const currentCertifications = form.getFieldValue('materialCertifications') || [];
            if (currentCertifications[certIndex]) {
                currentCertifications[certIndex].imageUrl = file.url || (file.response && file.response.data && file.response.data.url);
                form.setFieldValue('materialCertifications', currentCertifications);
            }
        }

        if (file.status === 'error') {
            message.error(`${file.name} upload failed`);
            return;
        }

        setCertificationImages(prev => ({
            ...prev,
            [certIndex]: newFileList
        }));
    };

    const customUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;

        try {
            const response = await cloudinaryService.uploadImage(file);

            if (response.success) {
                file.status = 'done';
                file.response = { data: response.data };
                file.url = response.data.url;

                onSuccess({ data: response.data }, file);
            } else {
                onError(new Error('Upload failed'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            onError(error);
        }
    };

    const customCertificationUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;

        try {
            const response = await cloudinaryService.uploadImage(file);

            if (response.success) {
                file.status = 'done';
                file.response = { data: response.data };
                file.url = response.data.url;

                onSuccess({ data: response.data }, file);
            } else {
                onError(new Error('Upload failed'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            onError(error);
        }
    };

    const addCertification = () => {
        const currentCertifications = form.getFieldValue('materialCertifications') || [];
        const newIndex = currentCertifications.length;
        form.setFieldValue('materialCertifications', [
            ...currentCertifications,
            {
                material: '',
                brand: '',
                certificate: '',
                description: '',
                verified: false,
                imageUrl: ''
            }
        ]);
    };

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);
            const filteredMaterialCertifications = (values.materialCertifications || [])
                .filter((cert: any) => cert.material && cert.brand && cert.certificate && cert.description)
                .map((cert: any, index: number) => {
                    const certImages = certificationImages?.[index] || [];
                    const imageUrl = certImages.length > 0 ?
                        (certImages[0]?.url || certImages[0]?.response?.data?.url) :
                        cert.imageUrl || '';

                    return {
                        material: cert.material.trim(),
                        brand: cert.brand.trim(),
                        certificate: cert.certificate.trim(),
                        description: cert.description.trim(),
                        verified: !!cert.verified,
                        imageUrl: imageUrl
                    };
                });
            const transformedData: PropertyFormData = {
                ...values,
                specifications: values.specification ? [values.specification] : [{ structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] }],
                materialCertifications: filteredMaterialCertifications,
                specification: undefined,
                pois: values.pois || [],
            };
            await onSubmit(transformedData);
            setFileList([]);
            setCertificationImages({});
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const uploadButton = (
        <div className="flex flex-col items-center justify-center p-4">
            {uploading ? <LoadingOutlined className="text-2xl text-blue-500" /> : <UploadOutlined className="text-2xl text-gray-400" />}
            <Text className="mt-2 text-sm text-gray-500">
                {uploading ? 'Uploading...' : 'Upload Image'}
            </Text>
        </div>
    );

    const certificationUploadButton = (certIndex: number) => (
        <div className="flex flex-col items-center justify-center p-4">
            <PictureOutlined className="text-2xl text-gray-400" />
            <Text className="mt-2 text-sm text-gray-500">Upload Image</Text>
        </div>
    );

    const handleMapSelect = (locationResult: any) => {
        form.setFieldsValue({
            location: {
                address: locationResult.address,
                city: locationResult.city,
                state: locationResult.state,
                zipCode: locationResult.zipCode,
                latitude: locationResult.latitude,
                longitude: locationResult.longitude,
            }
        });

        const existingPOIs = form.getFieldValue('pois') || [];
        const mapPOIs = locationResult.pois || [];
        const combinedPOIs = [...existingPOIs, ...mapPOIs];

        form.setFieldValue('pois', combinedPOIs);
        setMapPOIs(locationResult.pois || []);
        setMapModalOpen(false);
    };

    const handlePOIMapSelect = (poiResult: any) => {
        const existingPOIs = form.getFieldValue('pois') || [];

        if (currentPOIIndex !== null) {
            const updatedPOIs = [...existingPOIs];
            updatedPOIs[currentPOIIndex] = {
                ...updatedPOIs[currentPOIIndex],
                latitude: poiResult.latitude,
                longitude: poiResult.longitude,
            };
            form.setFieldValue('pois', updatedPOIs);
        } else {
            const newPOI = {
                name: poiResult.name,
                type: poiResult.type,
                latitude: poiResult.latitude,
                longitude: poiResult.longitude,
                distance: poiResult.distance || undefined,
            };
            form.setFieldValue('pois', [...existingPOIs, newPOI]);
        }

        setPoiMapModalOpen(false);
        setCurrentPOIIndex(null);
    };

    const openPOIMapPicker = () => {
        setCurrentPOIIndex(null);
        setPoiMapModalOpen(true);
    };

    const openPOIMapPickerForEdit = (index: number) => {
        setCurrentPOIIndex(index);
        setPoiMapModalOpen(true);
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    featured: false,
                    images: [],
                    specification: { structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] },
                    materialCertifications: [],
                    pois: [],
                }}
                className="space-y-8"
            >
                {/* Basic Information Section */}
                <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                    <SectionHeader
                        title="Basic Information"
                        subtitle="Enter the fundamental details about the property"
                        icon={<HomeOutlined className="text-blue-600 text-lg" />}
                    />

                    <Row gutter={[24, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="title"
                                label="Property Title"
                                rules={[{ required: true, message: 'Please enter the property title' }]}
                            >
                                <Input
                                    placeholder="Enter property title"
                                    size="large"
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: 'Please enter the price' }]}
                            >
                                <InputNumber
                                    placeholder="Enter price"
                                    formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={((value: string | undefined) => {
                                        if (typeof value !== 'string') return 0;
                                        return Number(value.replace(/₹\s?|(,*)/g, ''));
                                    }) as any}
                                    size="large"
                                    className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="type"
                                label="Property Type"
                                rules={[{ required: true, message: 'Please select the property type' }]}
                            >
                                <Select
                                    placeholder="Select property type"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                >
                                    <Option value="villa">Villa</Option>
                                    <Option value="apartment">Apartment</Option>
                                    <Option value="house">House</Option>
                                    <Option value="penthouse">Penthouse</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: 'Please select the status' }]}
                            >
                                <Select
                                    placeholder="Select status"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                >
                                    <Option value="for sale">For Sale</Option>
                                    <Option value="for rent">For Rent</Option>
                                    <Option value="sold">Sold</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="featured"
                                label="Featured Property"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Description Section */}
                <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                    <SectionHeader
                        title="Description"
                        subtitle="Provide a detailed description of the property"
                        icon={<InfoCircleOutlined className="text-blue-600 text-lg" />}
                    />

                    <Form.Item
                        name="description"
                        label="Property Description"
                        rules={[{ required: true, message: 'Please enter the property description' }]}
                    >
                        <TextArea
                            placeholder="Describe the property features, amenities, unique selling points, neighborhood highlights, and any special characteristics that make this property stand out. Include details about the layout, finishes, outdoor spaces, and nearby attractions."
                            className="min-h-[350px] resize-y text-base leading-relaxed p-4 border border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                            showCount
                            maxLength={2000}
                        />
                    </Form.Item>
                </Card>

                {/* Property Details Section */}
                <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                    <SectionHeader
                        title="Property Details"
                        subtitle="Specify the physical characteristics of the property"
                        icon={<HomeOutlined className="text-blue-600 text-lg" />}
                    />

                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="bedrooms"
                                label="Bedrooms"
                                rules={[{ required: true, message: 'Please enter the number of bedrooms' }]}
                            >
                                <InputNumber
                                    placeholder="0"
                                    min={0}
                                    size="large"
                                    className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="bathrooms"
                                label="Bathrooms"
                                rules={[{ required: true, message: 'Please enter the number of bathrooms' }]}
                            >
                                <InputNumber
                                    placeholder="0"
                                    min={0}
                                    step={0.5}
                                    size="large"
                                    className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="garage"
                                label="Garage Spaces"
                                rules={[{ required: true, message: 'Please enter the number of garage spaces' }]}
                            >
                                <InputNumber
                                    placeholder="0"
                                    min={0}
                                    size="large"
                                    className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="lotSize"
                                label="Lot Size"
                                rules={[{ required: true, message: 'Please enter the lot size' }]}
                            >
                                <Input
                                    placeholder="e.g., 5000 sq ft"
                                    size="large"
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="livingArea"
                                label="Living Area"
                                rules={[{ required: true, message: 'Please enter the living area' }]}
                            >
                                <Input
                                    placeholder="e.g., 2500 sq ft"
                                    size="large"
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="yearBuilt"
                                label="Year Built"
                                rules={[{ required: true, message: 'Please enter the year built' }]}
                            >
                                <InputNumber
                                    placeholder="e.g., 2020"
                                    min={1800}
                                    max={new Date().getFullYear()}
                                    size="large"
                                    className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Property Specifications Section */}
                <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                    <SectionHeader
                        title="Property Specifications"
                        subtitle="Add detailed specifications and features (use tags)"
                        icon={<InfoCircleOutlined className="text-blue-600 text-lg" />}
                    />

                    <Row gutter={[24, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "structure"]}
                                label="Structure"
                                rules={[{ required: true, message: 'Please enter at least one structure type' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., RCC Frame, Steel Frame"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "brickwork"]}
                                label="Brickwork"
                                rules={[{ required: true, message: 'Please enter at least one brickwork type' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., Red Brick, Fly Ash"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "windows"]}
                                label="Windows"
                                rules={[{ required: true, message: 'Please enter at least one window type' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., UPVC, Aluminum"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "externalFinish"]}
                                label="External Finish"
                                rules={[{ required: true, message: 'Please enter at least one external finish' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., Paint, Stone Cladding"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "interiorFinish"]}
                                label="Interior Finish"
                                rules={[{ required: true, message: 'Please enter at least one interior finish' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., Wallpaper, Paint, Tiles"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "doors"]}
                                label="Doors"
                                rules={[{ required: true, message: 'Please enter at least one door type' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., Wooden, Steel, Glass"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "flooring"]}
                                label="Flooring"
                                rules={[{ required: true, message: 'Please enter at least one flooring type' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., Marble, Tiles, Wood"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "kitchen"]}
                                label="Kitchen"
                                rules={[{ required: true, message: 'Please enter at least one kitchen feature' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., Modular, Granite Counter"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "washroom"]}
                                label="Washroom"
                                rules={[{ required: true, message: 'Please enter at least one washroom feature' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., Modern Fittings, Tiles"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "elevator"]}
                                label="Elevator"
                                rules={[{ required: true, message: 'Please enter elevator details' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., Passenger, Service, None"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "electricity"]}
                                label="Electricity"
                                rules={[{ required: true, message: 'Please enter electricity details' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., 3 Phase, Backup Power"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={["specification", "waterSupply"]}
                                label="Water Supply"
                                rules={[{ required: true, message: 'Please enter water supply details' }]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="e.g., 24/7, Borewell, Municipal"
                                    size="large"
                                    getPopupContainer={() => document.body}
                                    className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Images Section */}
                <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                    <SectionHeader
                        title="Property Images"
                        subtitle="Upload high-quality images of the property (max 16 images)"
                        icon={<PictureOutlined className="text-blue-600 text-lg" />}
                    />

                    <Form.Item name="images" label="Property Images">
                        <Upload
                            name="image"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleImageUpload}
                            customRequest={customUpload}
                            accept="image/*"
                            multiple
                            maxCount={16}
                            className="property-images-upload border-[#d1d5db] rounded-lg"
                        >
                            {fileList.length >= 16 ? null : uploadButton}
                        </Upload>
                    </Form.Item>

                    <Divider className="my-6" />

                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <VideoCameraOutlined className="text-blue-600 text-lg" />
                            <Text strong className="text-gray-800">Property Video</Text>
                        </div>
                        <Text type="secondary" className="text-sm">
                            Add a YouTube video link to showcase the property
                        </Text>
                    </div>

                    <Form.Item
                        name="videoLink"
                        label="YouTube Video Link"
                        rules={[
                            {
                                type: 'url',
                                message: 'Please enter a valid URL'
                            },
                            {
                                pattern: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/,
                                message: 'Please enter a valid YouTube URL'
                            }
                        ]}
                    >
                        <Input
                            prefix={<LinkOutlined className="text-gray-400" />}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="rounded-[8px] border-[#d1d5db] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </Form.Item>
                </Card>

                {/* Location Section */}
                <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                    <SectionHeader
                        title="Location Details"
                        subtitle="Specify the property location and coordinates"
                        icon={<EnvironmentOutlined className="text-blue-600 text-lg" />}
                        action={
                            <Button
                                type="primary"
                                icon={<EnvironmentOutlined />}
                                onClick={() => setMapModalOpen(true)}
                                size="middle"
                                className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                            >
                                Pick on Map
                            </Button>
                        }
                    />

                    <Row gutter={[24, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={['location', 'address']}
                                label="Address"
                                rules={[{ required: true, message: 'Please enter the address' }]}
                            >
                                <Input placeholder="Enter full address" size="large" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={['location', 'city']}
                                label="City"
                                rules={[{ required: true, message: 'Please enter the city' }]}
                            >
                                <Input placeholder="Enter city name" size="large" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={['location', 'state']}
                                label="State"
                                rules={[{ required: true, message: 'Please enter the state' }]}
                            >
                                <Input placeholder="Enter state name" size="large" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={['location', 'zipCode']}
                                label="Zip Code"
                                rules={[{ required: true, message: 'Please enter the zip code' }]}
                            >
                                <Input placeholder="Enter zip code" size="large" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={['location', 'latitude']}
                                label="Latitude"
                                rules={[{ required: true, message: 'Please enter the latitude' }]}
                            >
                                <InputNumber
                                    placeholder="e.g., 22.4736"
                                    step={0.000001}
                                    size="large"
                                    className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={['location', 'longitude']}
                                label="Longitude"
                                rules={[{ required: true, message: 'Please enter the longitude' }]}
                            >
                                <InputNumber
                                    placeholder="e.g., 88.3607"
                                    step={0.000001}
                                    size="large"
                                    className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="locationPOIs" style={{ display: 'none' }} initialValue={mapPOIs}>
                        <Input type="hidden" />
                    </Form.Item>

                    {mapPOIs && mapPOIs.length > 0 && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <Text strong className="text-blue-800">Nearby Places of Interest (auto-filled):</Text>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {mapPOIs.map((poi, idx) => (
                                    <Tag key={idx} color="blue" className="text-xs rounded-[6px] font-medium text-[12px] px-2 py-1 border-0">
                                        {poi.name} ({poi.type})
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>

                {/* Material Certifications Section */}
                <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                    <SectionHeader
                        title="Material Certifications"
                        subtitle="Add material certifications and quality documents (optional)"
                        icon={<InfoCircleOutlined className="text-blue-600 text-lg" />}
                    />

                    <Form.List name="materialCertifications">
                        {(fields, { add, remove }) => (
                            <div className="space-y-6">
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card key={key} className="bg-[#f8fafc] border border-[#e2e8f0]" size="small">
                                        <div className="flex justify-between items-center mb-4">
                                            <Text strong className="text-gray-700">Certification #{name + 1}</Text>
                                            <Button
                                                danger
                                                type="text"
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(name)}
                                                size="small"
                                                className="bg-white border-[#ef4444] text-[#ef4444] hover:bg-[#fef2f2] hover:border-[#dc2626] hover:text-[#dc2626]"
                                            />
                                        </div>

                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} sm={12} md={6}>
                                                <Form.Item {...restField} name={[name, 'material']} label="Material">
                                                    <Input placeholder="e.g., Cement" size="middle" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Form.Item {...restField} name={[name, 'brand']} label="Brand">
                                                    <Input placeholder="e.g., UltraTech" size="middle" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Form.Item {...restField} name={[name, 'certificate']} label="Certificate">
                                                    <Input placeholder="e.g., ISO 9001:2015" size="middle" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Form.Item {...restField} name={[name, 'verified']} label="Verified" valuePropName="checked">
                                                    <Switch />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <Form.Item {...restField} name={[name, 'description']} label="Description">
                                                    <Input placeholder="Enter detailed description" size="middle" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item label="Material Image" className="mb-0">
                                            <Upload
                                                name="certificationImage"
                                                listType="picture-card"
                                                fileList={certificationImages[name] || []}
                                                onChange={(info) => handleCertificationImageUpload(info, name)}
                                                customRequest={customCertificationUpload}
                                                accept="image/*"
                                                maxCount={1}
                                                className="certification-upload border-[#d1d5db] rounded-lg"
                                            >
                                                {(certificationImages[name] || []).length >= 1 ? null : certificationUploadButton(name)}
                                            </Upload>
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={addCertification}
                                    block
                                    icon={<PlusOutlined />}
                                    size="large"
                                    className="mt-4 border-[#d1d5db] text-[#374151] hover:border-[#3b82f6] hover:text-[#3b82f6]"
                                >
                                    Add Material Certification
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Card>

                {/* Nearby POIs Section */}
                <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                    <SectionHeader
                        title="Nearby Points of Interest"
                        subtitle="Add nearby landmarks and amenities (optional)"
                        icon={<EnvironmentOutlined className="text-blue-600 text-lg" />}
                        action={
                            <Button
                                type="primary"
                                icon={<EnvironmentOutlined />}
                                onClick={openPOIMapPicker}
                                size="middle"
                                className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                            >
                                Add POI on Map
                            </Button>
                        }
                    />

                    <Form.List name="pois">
                        {(fields, { add, remove }) => (
                            <div className="space-y-4">
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card key={key} className="bg-[#f8fafc] border border-[#e2e8f0]" size="small">
                                        <div className="flex justify-between items-center mb-4">
                                            <Text strong className="text-gray-700">POI #{name + 1}</Text>
                                            <Space>
                                                <Button
                                                    type="default"
                                                    icon={<EnvironmentOutlined />}
                                                    onClick={() => openPOIMapPickerForEdit(name)}
                                                    size="small"
                                                    title="Pick location on map"
                                                    className="bg-white border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb] hover:border-[#3b82f6] hover:text-[#3b82f6]"
                                                />
                                                <Button
                                                    danger
                                                    type="text"
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => remove(name)}
                                                    size="small"
                                                    className="bg-white border-[#ef4444] text-[#ef4444] hover:bg-[#fef2f2] hover:border-[#dc2626] hover:text-[#dc2626]"
                                                />
                                            </Space>
                                        </div>

                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} sm={12} md={6}>
                                                <Form.Item {...restField} name={[name, 'name']} label="Name" rules={[{ required: true, message: 'Please enter POI name' }]}>
                                                    <Input placeholder="e.g., Central Park" size="middle" className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Form.Item {...restField} name={[name, 'type']} label="Type" rules={[{ required: true, message: 'Please select type' }]}>
                                                    <Select placeholder="Select type" size="middle" getPopupContainer={() => document.body} className="border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]">
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
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={4}>
                                                <Form.Item {...restField} name={[name, 'latitude']} label="Latitude" rules={[{ required: true, message: 'Please enter latitude' }]}>
                                                    <InputNumber placeholder="22.4736" step={0.000001} size="middle" className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={4}>
                                                <Form.Item {...restField} name={[name, 'longitude']} label="Longitude" rules={[{ required: true, message: 'Please enter longitude' }]}>
                                                    <InputNumber placeholder="88.3607" step={0.000001} size="middle" className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={4}>
                                                <Form.Item {...restField} name={[name, 'distance']} label="Distance (m)">
                                                    <InputNumber placeholder="500" min={0} size="middle" className="w-full border-[#d1d5db] rounded-lg focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe]" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}

                                <div className="flex space-x-3">
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                        size="large"
                                        className="flex-1 border-[#d1d5db] text-[#374151] hover:border-[#3b82f6] hover:text-[#3b82f6]"
                                    >
                                        Add POI Manually
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={openPOIMapPicker}
                                        icon={<EnvironmentOutlined />}
                                        size="large"
                                        className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                                    >
                                        Add POI on Map
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form.List>
                </Card>

                {/* Form Actions */}
                <Card className="bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="flex justify-end space-x-4">
                        <Button
                            onClick={() => form.resetFields()}
                            size="large"
                            className="bg-white border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb] hover:border-[#3b82f6] hover:text-[#3b82f6]"
                        >
                            Reset Form
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            size="large"
                            icon={<DollarOutlined />}
                            className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Property'}
                        </Button>
                    </div>
                </Card>
            </Form>

            <MapPicker
                open={mapModalOpen}
                onCancel={() => setMapModalOpen(false)}
                onSelect={handleMapSelect}
                initialLocation={form.getFieldValue('location')}
            />
            <POIMapPicker
                open={poiMapModalOpen}
                onCancel={() => {
                    setPoiMapModalOpen(false);
                    setCurrentPOIIndex(null);
                }}
                onSelect={handlePOIMapSelect}
                initialLocation={form.getFieldValue('location')}
            />
        </>
    );
}; 