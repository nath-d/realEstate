import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Form, 
    Input, 
    InputNumber, 
    Button, 
    Upload, 
    message, 
    Row, 
    Col, 
    Space, 
    Divider,
    Typography,
    Tag
} from 'antd';
import { 
    UploadOutlined, 
    SaveOutlined, 
    PlusOutlined, 
    DeleteOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    WhatsAppOutlined
} from '@ant-design/icons';
import { cloudinaryService } from '../services/cloudinaryService';
import contactInfoService from '../services/contactInfoService';
import type { ContactInfoDTO } from '../services/contactInfoService';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContactInfoManagement: React.FC = () => {
    const [form] = Form.useForm<ContactInfoDTO>();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [heroFileList, setHeroFileList] = useState<any[]>([]);
    const [locationFileList, setLocationFileList] = useState<any[]>([]);
    const [heroUploading, setHeroUploading] = useState(false);
    const [locationUploading, setLocationUploading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const contactInfo = await contactInfoService.getContactInfo();
            form.setFieldsValue(contactInfo);
            
            // Set file lists for images
            if (contactInfo.heroBackgroundUrl) {
                setHeroFileList([{
                    uid: '-1',
                    name: 'hero-background.jpg',
                    status: 'done',
                    url: contactInfo.heroBackgroundUrl,
                }]);
            }
            
            if (contactInfo.locationImage) {
                setLocationFileList([{
                    uid: '-1',
                    name: 'location-image.jpg',
                    status: 'done',
                    url: contactInfo.locationImage,
                }]);
            }
        } catch (error) {
            console.error('Error fetching contact info:', error);
            message.error('Failed to load contact information');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onHeroChange = (info: any) => {
        const { fileList } = info;
        setHeroFileList(fileList);
        const file = info.file;
        if (file.status === 'done') {
            const url = file.url || file.response?.data?.url;
            if (url) {
                form.setFieldValue('heroBackgroundUrl', url);
            }
        }
        if (file.status === 'error') {
            message.error(`${file.name} upload failed`);
        }
    };

    const onLocationImageChange = (info: any) => {
        const { fileList } = info;
        setLocationFileList(fileList);
        const file = info.file;
        if (file.status === 'done') {
            const url = file.url || file.response?.data?.url;
            if (url) {
                form.setFieldValue('locationImage', url);
            }
        }
        if (file.status === 'error') {
            message.error(`${file.name} upload failed`);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const values = await form.validateFields();
            
            // Convert string arrays from form to proper arrays
            const processedValues = {
                ...values,
                phoneNumbers: values.phoneNumbers || [],
                emails: values.emails || [],
                businessHours: values.businessHours || [],
            };
            
            await contactInfoService.updateContactInfo(processedValues);
            message.success('Contact information updated successfully!');
        } catch (error: any) {
            console.error('Error saving contact info:', error);
            if (error.errorFields) {
                message.error('Please fix the form errors before saving');
            } else {
                message.error('Failed to save contact information');
            }
        } finally {
            setSaving(false);
        }
    };

    const uploadProps = {
        customRequest: async ({ file, onSuccess, onError }: any) => {
            try {
                setHeroUploading(true);
                const result = await cloudinaryService.uploadImage(file);
                onSuccess(result);
            } catch (error) {
                onError(error);
            } finally {
                setHeroUploading(false);
            }
        },
        onChange: onHeroChange,
        fileList: heroFileList,
        maxCount: 1,
        accept: 'image/*',
        listType: 'picture' as const,
    };

    const locationUploadProps = {
        customRequest: async ({ file, onSuccess, onError }: any) => {
            try {
                setLocationUploading(true);
                const result = await cloudinaryService.uploadImage(file);
                onSuccess(result);
            } catch (error) {
                onError(error);
            } finally {
                setLocationUploading(false);
            }
        },
        onChange: onLocationImageChange,
        fileList: locationFileList,
        maxCount: 1,
        accept: 'image/*',
        listType: 'picture' as const,
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={2}>Contact Information Management</Title>
                <Button 
                    type="primary" 
                    icon={<SaveOutlined />} 
                    onClick={handleSave}
                    loading={saving}
                    size="large"
                >
                    Save Changes
                </Button>
            </div>

            <Form
                form={form}
                layout="vertical"
                className="space-y-6"
            >
                {/* Hero Section */}
                <Card title={<><EnvironmentOutlined className="mr-2" />Hero Section</>} className="mb-6">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Hero Title"
                                name="heroTitle"
                                rules={[{ required: true, message: 'Please enter hero title' }]}
                            >
                                <Input placeholder="Contact Us" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Hero Subtitle"
                                name="heroSubtitle"
                            >
                                <Input placeholder="Get in touch with our team of real estate experts" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Hero Background Image"
                                name="heroBackgroundUrl"
                            >
                                <div>
                                    <Upload {...uploadProps}>
                                        <Button icon={<UploadOutlined />} loading={heroUploading}>
                                            Upload Hero Background
                                        </Button>
                                    </Upload>
                                    <Text type="secondary" className="block mt-2">
                                        Recommended size: 1920x1080px
                                    </Text>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Contact Information */}
                <Card title={<><PhoneOutlined className="mr-2" />Contact Information</>} className="mb-6">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Phone Numbers"
                                name="phoneNumbers"
                            >
                                <Form.List name="phoneNumbers">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name]}
                                                        rules={[{ required: true, message: 'Missing phone number' }]}
                                                    >
                                                        <Input placeholder="Phone number" />
                                                    </Form.Item>
                                                    <DeleteOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add Phone Number
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Email Addresses"
                                name="emails"
                            >
                                <Form.List name="emails">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name]}
                                                        rules={[
                                                            { required: true, message: 'Missing email' },
                                                            { type: 'email', message: 'Invalid email format' }
                                                        ]}
                                                    >
                                                        <Input placeholder="Email address" />
                                                    </Form.Item>
                                                    <DeleteOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add Email Address
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Office Address */}
                <Card title={<><EnvironmentOutlined className="mr-2" />Office Address</>} className="mb-6">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Office Address"
                                name="officeAddress"
                                rules={[{ required: true, message: 'Please enter office address' }]}
                            >
                                <Input placeholder="285, Gopal Misra Road, Behala" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="City"
                                name="officeCity"
                                rules={[{ required: true, message: 'Please enter city' }]}
                            >
                                <Input placeholder="Kolkata" />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Zip Code"
                                name="officeZipCode"
                            >
                                <Input placeholder="700034" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="State"
                                name="officeState"
                            >
                                <Input placeholder="West Bengal" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Business Hours */}
                <Card title={<><ClockCircleOutlined className="mr-2" />Business Hours</>} className="mb-6">
                    <Form.Item
                        label="Business Hours"
                        name="businessHours"
                    >
                        <Form.List name="businessHours">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name]}
                                                rules={[{ required: true, message: 'Missing business hour' }]}
                                            >
                                                <Input placeholder="Mon - Fri: 9:00 AM - 6:00 PM" />
                                            </Form.Item>
                                            <DeleteOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Business Hour
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>
                </Card>

                {/* Location Details */}
                <Card title={<><EnvironmentOutlined className="mr-2" />Location Details</>} className="mb-6">
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                label="Location City"
                                name="locationCity"
                            >
                                <Input placeholder="Kolkata" />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                label="Location Address"
                                name="locationAddress"
                            >
                                <Input placeholder="285, Gopal Misra Road, Behala" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Location Phone"
                                name="locationPhone"
                            >
                                <Input placeholder="+91 9748853901" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Location Email"
                                name="locationEmail"
                                rules={[{ type: 'email', message: 'Invalid email format' }]}
                            >
                                <Input placeholder="mgconstructions1995@gmail.com" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Location State"
                                name="locationState"
                            >
                                <Input placeholder="Kolkata 700034" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Latitude"
                                name="latitude"
                            >
                                <InputNumber 
                                    placeholder="22.4707" 
                                    step={0.000001}
                                    precision={6}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Longitude"
                                name="longitude"
                            >
                                <InputNumber 
                                    placeholder="88.3103" 
                                    step={0.000001}
                                    precision={6}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Location Image"
                                name="locationImage"
                            >
                                <div>
                                    <Upload {...locationUploadProps}>
                                        <Button icon={<UploadOutlined />} loading={locationUploading}>
                                            Upload Location Image
                                        </Button>
                                    </Upload>
                                    <Text type="secondary" className="block mt-2">
                                        Recommended size: 800x600px
                                    </Text>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Social Media Links */}
                <Card title="Social Media Links" className="mb-6">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label={<><FacebookOutlined className="mr-2" />Facebook URL</>}
                                name="facebookUrl"
                            >
                                <Input placeholder="https://facebook.com/yourpage" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<><TwitterOutlined className="mr-2" />Twitter URL</>}
                                name="twitterUrl"
                            >
                                <Input placeholder="https://twitter.com/yourhandle" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<><InstagramOutlined className="mr-2" />Instagram URL</>}
                                name="instagramUrl"
                            >
                                <Input placeholder="https://instagram.com/yourpage" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<><LinkedinOutlined className="mr-2" />LinkedIn URL</>}
                                name="linkedinUrl"
                            >
                                <Input placeholder="https://linkedin.com/company/yourcompany" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<><WhatsAppOutlined className="mr-2" />WhatsApp URL</>}
                                name="whatsappUrl"
                            >
                                <Input placeholder="https://wa.me/919748853901" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default ContactInfoManagement;


