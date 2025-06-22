import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Switch, Button, Upload, Card, Space, Divider, Row, Col, message } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, MinusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { cloudinaryService } from '../services/cloudinaryService';

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

interface MaterialCertificationForm {
    material: string;
    brand: string;
    certificate: string;
    description: string;
    verified: boolean;
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
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            const formInitialValues = {
                ...initialData,
                specification: initialData.specifications && initialData.specifications.length > 0
                    ? initialData.specifications[0]
                    : { structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] },
                materialCertifications: initialData.materialCertifications || [],
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
        } else {
            form.resetFields();
            setFileList([]);
        }
    }, [initialData, form]);

    const handleImageUpload = async (info: any) => {
        const { fileList: newFileList, file } = info;

        console.log('handleImageUpload called with:', { fileList: newFileList, file });
        console.log('File status:', file.status);
        console.log('File response:', file.response);

        // Handle file status changes
        if (file.status === 'uploading') {
            console.log('File is uploading...');
            setUploading(true);
            return;
        }

        if (file.status === 'done') {
            console.log('File upload done!');
            setUploading(false);
            message.success(`${file.name} uploaded successfully`);

            // Ensure the file has the URL set from the response
            if (file.response && file.response.data && file.response.data.url) {
                file.url = file.response.data.url;
                console.log('Set file.url to:', file.url);
            }
        }

        if (file.status === 'error') {
            console.log('File upload error!');
            setUploading(false);
            message.error(`${file.name} upload failed`);
            return;
        }

        setFileList(newFileList);

        // Extract URLs from uploaded files
        const imageUrls = newFileList
            .filter((file: any) => {
                // Check if file has a URL (either from response or direct url property)
                const hasUrl = file.url || (file.response && file.response.data && file.response.data.url);
                console.log(`File ${file.name} has URL:`, hasUrl, 'URL:', file.url || (file.response && file.response.data && file.response.data.url));
                return hasUrl;
            })
            .map((file: any) => {
                const url = file.url || (file.response && file.response.data && file.response.data.url);
                console.log(`Extracting URL for ${file.name}:`, url);
                return url;
            });

        console.log('Extracted image URLs:', imageUrls);
        console.log('Setting form field images to:', imageUrls);

        // Ensure images is always an array of strings
        form.setFieldValue('images', imageUrls);

        // Also log the current form values to verify
        const currentImages = form.getFieldValue('images');
        console.log('Current form images value:', currentImages);
    };

    const customUpload = async (options: any) => {
        const { file, onSuccess, onError, onProgress } = options;

        console.log('customUpload called with options:', options);
        console.log('File object:', file);

        try {
            setUploading(true);
            console.log('Starting upload for file:', file.name);

            // Upload to Cloudinary via our server
            const response = await cloudinaryService.uploadImage(file);
            console.log('Upload response:', response);

            if (response.success) {
                console.log('Upload successful, calling onSuccess with:', response.data);

                // Manually update the file object with the response
                file.status = 'done';
                file.response = { data: response.data };
                file.url = response.data.url;

                // AntD expects the first arg to be a plain object (the response)
                onSuccess({ data: response.data }, file);
                console.log('onSuccess called');

                // Manually trigger the onChange handler to update the form
                const updatedFileList = [...fileList, file];
                setFileList(updatedFileList);

                // Extract URLs and update form
                const imageUrls = updatedFileList
                    .filter((f: any) => f.url || (f.response && f.response.data && f.response.data.url))
                    .map((f: any) => f.url || (f.response && f.response.data && f.response.data.url));

                console.log('Manually updating form with URLs:', imageUrls);
                form.setFieldValue('images', imageUrls);
            } else {
                console.error('Upload failed:', response);
                onError(new Error('Upload failed'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            onError(error);
        } finally {
            setUploading(false);
        }
    };

    const addCertification = () => {
        const currentCertifications = form.getFieldValue('materialCertifications') || [];
        form.setFieldValue('materialCertifications', [
            ...currentCertifications,
            {
                material: '',
                brand: '',
                certificate: '',
                description: '',
                verified: false
            }
        ]);
    };

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);
            const filteredMaterialCertifications = (values.materialCertifications || [])
                .filter((cert: any) => cert.material && cert.brand && cert.certificate && cert.description)
                .map((cert: any) => ({
                    material: cert.material.trim(),
                    brand: cert.brand.trim(),
                    certificate: cert.certificate.trim(),
                    description: cert.description.trim(),
                    verified: !!cert.verified
                }));
            const transformedData: PropertyFormData = {
                ...values,
                specifications: values.specification ? [values.specification] : [{ structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] }],
                materialCertifications: filteredMaterialCertifications,
                specification: undefined
            };
            await onSubmit(transformedData);
            setFileList([]);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const uploadButton = (
        <div className="flex flex-col items-center justify-center">
            {uploading ? <LoadingOutlined /> : <UploadOutlined />}
            <span>{uploading ? 'Uploading...' : 'Upload'}</span>
        </div>
    );

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                featured: false,
                images: [],
                specification: { structure: [], brickwork: [], windows: [], externalFinish: [], interiorFinish: [], doors: [], flooring: [], kitchen: [], washroom: [], elevator: [], electricity: [], waterSupply: [] },
                materialCertifications: [],
            }}
            className="p-0"
        >
            {/* Basic Information Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter the title' }]}
                    >
                        <Input className="w-full" />
                    </Form.Item>
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
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true, message: 'Please select the type' }]}
                    >
                        <Select
                            placeholder="Select property type"
                            getPopupContainer={() => document.body}
                            onDropdownVisibleChange={(open) => console.log('Type dropdown open:', open)}
                            style={{ width: '100%' }}
                        >
                            <Option value="villa">Villa</Option>
                            <Option value="apartment">Apartment</Option>
                            <Option value="house">House</Option>
                            <Option value="penthouse">Penthouse</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select the status' }]}
                    >
                        <Select
                            placeholder="Select property status"
                            getPopupContainer={() => document.body}
                            onDropdownVisibleChange={(open) => console.log('Status dropdown open:', open)}
                            style={{ width: '100%' }}
                        >
                            <Option value="for sale">For Sale</Option>
                            <Option value="for rent">For Rent</Option>
                            <Option value="sold">Sold</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="featured"
                        label="Featured"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Description</h3>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the description' }]}
                >
                    <TextArea rows={4} className="w-full" />
                </Form.Item>
            </div>

            {/* Property Details Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Form.Item
                        name="bedrooms"
                        label="Bedrooms"
                        rules={[{ required: true, message: 'Please enter the number of bedrooms' }]}
                    >
                        <InputNumber className="w-full" min={0} />
                    </Form.Item>
                    <Form.Item
                        name="bathrooms"
                        label="Bathrooms"
                        rules={[{ required: true, message: 'Please enter the number of bathrooms' }]}
                    >
                        <InputNumber className="w-full" min={0} step={0.5} />
                    </Form.Item>
                    <Form.Item
                        name="garage"
                        label="Garage"
                        rules={[{ required: true, message: 'Please enter the number of garage spaces' }]}
                    >
                        <InputNumber className="w-full" min={0} />
                    </Form.Item>
                    <Form.Item
                        name="lotSize"
                        label="Lot Size"
                        rules={[{ required: true, message: 'Please enter the lot size' }]}
                    >
                        <Input placeholder="e.g., 5000 sq ft" />
                    </Form.Item>
                    <Form.Item
                        name="livingArea"
                        label="Living Area"
                        rules={[{ required: true, message: 'Please enter the living area' }]}
                    >
                        <Input placeholder="e.g., 2500 sq ft" />
                    </Form.Item>
                    <Form.Item
                        name="yearBuilt"
                        label="Year Built"
                        rules={[{ required: true, message: 'Please enter the year built' }]}
                    >
                        <InputNumber className="w-full" min={1800} max={new Date().getFullYear()} />
                    </Form.Item>
                </div>
            </div>

            {/* Property Specifications Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Property Specifications (Tags)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name={["specification", "structure"]}
                        label="Structure"
                        rules={[{ required: true, message: 'Please enter at least one structure' }]}
                    >
                        <Select mode="tags" placeholder="e.g., RCC Frame, Steel Frame" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "brickwork"]}
                        label="Brickwork"
                        rules={[{ required: true, message: 'Please enter at least one brickwork' }]}
                    >
                        <Select mode="tags" placeholder="e.g., Red Brick, Fly Ash" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "windows"]}
                        label="Windows"
                        rules={[{ required: true, message: 'Please enter at least one window type' }]}
                    >
                        <Select mode="tags" placeholder="e.g., UPVC, Aluminum" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "externalFinish"]}
                        label="External Finish"
                        rules={[{ required: true, message: 'Please enter at least one external finish' }]}
                    >
                        <Select mode="tags" placeholder="e.g., Paint, Stone Cladding" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "interiorFinish"]}
                        label="Interior Finish"
                        rules={[{ required: true, message: 'Please enter at least one interior finish' }]}
                    >
                        <Select mode="tags" placeholder="e.g., Wallpaper, Paint, Tiles" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "doors"]}
                        label="Doors"
                        rules={[{ required: true, message: 'Please enter at least one door type' }]}
                    >
                        <Select mode="tags" placeholder="e.g., Wooden, Steel, Glass" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "flooring"]}
                        label="Flooring"
                        rules={[{ required: true, message: 'Please enter at least one flooring type' }]}
                    >
                        <Select mode="tags" placeholder="e.g., Marble, Tiles, Wood" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "kitchen"]}
                        label="Kitchen"
                        rules={[{ required: true, message: 'Please enter at least one kitchen feature' }]}
                    >
                        <Select mode="tags" placeholder="e.g., Modular, Granite Counter" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "washroom"]}
                        label="Washroom"
                        rules={[{ required: true, message: 'Please enter at least one washroom feature' }]}
                    >
                        <Select mode="tags" placeholder="e.g., Modern Fittings, Tiles" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "elevator"]}
                        label="Elevator"
                        rules={[{ required: true, message: 'Please enter elevator details' }]}
                    >
                        <Select mode="tags" placeholder="e.g., Passenger, Service, None" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "electricity"]}
                        label="Electricity"
                        rules={[{ required: true, message: 'Please enter electricity details' }]}
                    >
                        <Select mode="tags" placeholder="e.g., 3 Phase, Backup Power" getPopupContainer={() => document.body} />
                    </Form.Item>
                    <Form.Item
                        name={["specification", "waterSupply"]}
                        label="Water Supply"
                        rules={[{ required: true, message: 'Please enter water supply details' }]}
                    >
                        <Select mode="tags" placeholder="e.g., 24/7, Borewell, Municipal" getPopupContainer={() => document.body} />
                    </Form.Item>
                </div>
            </div>

            {/* Images Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Images</h3>
                <Form.Item name="images" label="Images">
                    <Upload
                        name="image"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleImageUpload}
                        customRequest={customUpload}
                        accept="image/*"
                        maxCount={8}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </Form.Item>
            </div>

            {/* Location Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item name={['location', 'address']} label="Address" rules={[{ required: true, message: 'Please enter the address' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['location', 'city']} label="City" rules={[{ required: true, message: 'Please enter the city' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['location', 'state']} label="State" rules={[{ required: true, message: 'Please enter the state' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['location', 'zipCode']} label="Zip Code" rules={[{ required: true, message: 'Please enter the zip code' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['location', 'latitude']} label="Latitude" rules={[{ required: true, message: 'Please enter the latitude' }]}>
                        <InputNumber className="w-full" step={0.000001} />
                    </Form.Item>
                    <Form.Item name={['location', 'longitude']} label="Longitude" rules={[{ required: true, message: 'Please enter the longitude' }]}>
                        <InputNumber className="w-full" step={0.000001} />
                    </Form.Item>
                </div>
            </div>

            {/* Material Certifications Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Material Certifications (Optional)</h3>
                <Form.List name="materialCertifications">
                    {(fields, { add, remove }) => (
                        <div>
                            {fields.map(({ key, name, ...restField }) => (
                                <div className="grid grid-cols-12 gap-4 mb-4 items-end" key={key}>
                                    <div className="col-span-2">
                                        <Form.Item {...restField} name={[name, 'material']} label="Material">
                                            <Input placeholder="e.g., Cement" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-span-2">
                                        <Form.Item {...restField} name={[name, 'brand']} label="Brand">
                                            <Input placeholder="e.g., UltraTech" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-span-2">
                                        <Form.Item {...restField} name={[name, 'certificate']} label="Certificate">
                                            <Input placeholder="e.g., ISO 9001:2015" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-span-4">
                                        <Form.Item {...restField} name={[name, 'description']} label="Description">
                                            <Input placeholder="Description" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-span-1">
                                        <Form.Item {...restField} name={[name, 'verified']} label="Verified" valuePropName="checked">
                                            <Switch />
                                        </Form.Item>
                                    </div>
                                    <div className="col-span-1">
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(name)}
                                            className="mb-6"
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button type="dashed" onClick={addCertification} block icon={<PlusOutlined />}>Add Certification</Button>
                        </div>
                    )}
                </Form.List>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200">
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