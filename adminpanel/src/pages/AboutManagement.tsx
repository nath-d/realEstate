import React, { useEffect, useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Upload, message, Row, Col, Table, Space, Popconfirm, Modal, Divider } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { cloudinaryService } from '../services/cloudinaryService';
import aboutService from '../services/aboutService';
import type { AboutContentDTO, AboutTimelineItemDTO } from '../services/aboutService';

const AboutManagement: React.FC = () => {
    const [form] = Form.useForm<AboutContentDTO>();
    const [timeline, setTimeline] = useState<AboutTimelineItemDTO[]>([]);
    const [timelineForm] = Form.useForm<AboutTimelineItemDTO>();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [heroFileList, setHeroFileList] = useState<any[]>([]);
    const [heroUploading, setHeroUploading] = useState(false);
    const [timelineModalOpen, setTimelineModalOpen] = useState(false);
    const [timelineModalMode, setTimelineModalMode] = useState<'add' | 'edit'>('add');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [timelineFileList, setTimelineFileList] = useState<any[]>([]);
    const [timelineUploading, setTimelineUploading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const content = await aboutService.getContent();
            form.setFieldsValue(content);
            setTimeline(content.timelineItems || []);
        } catch {
            // ignore, will use defaults until saved
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
                form.setFieldValue('heroImageUrl', url);
            }
        }
        if (file.status === 'error') {
            message.error(`${file.name} upload failed`);
        }
    };

    const customHeroUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;
        try {
            setHeroUploading(true);
            const response = await cloudinaryService.uploadImage(file);
            const url = response.data.url;
            file.status = 'done';
            file.response = { data: response.data };
            file.url = url;
            onSuccess({ data: response.data }, file);
            setHeroFileList((prev) => [...prev.filter((f: any) => f.uid !== file.uid), file]);
            form.setFieldValue('heroImageUrl', url);
            message.success('Hero image uploaded');
        } catch (error) {
            onError(error);
        } finally {
            setHeroUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const values = await form.validateFields();
            const payload: AboutContentDTO = { ...values };
            const saved = await aboutService.upsertContent(payload);
            message.success('About content saved');
            setTimeline(saved.timelineItems || []);
        } catch (e) {
            // validation or request error
        } finally {
            setSaving(false);
        }
    };

    const openAddTimeline = () => {
        setTimelineModalMode('add');
        setEditingIndex(null);
        const year = new Date().getFullYear().toString();
        timelineForm.setFieldsValue({ year, title: '', description: '', order: (timeline?.length || 0) + 1, imageUrl: '' } as any);
        setTimelineFileList([]);
        setTimelineModalOpen(true);
    };

    const openEditTimeline = (index: number, item: AboutTimelineItemDTO) => {
        setTimelineModalMode('edit');
        setEditingIndex(index);
        timelineForm.setFieldsValue({ ...item } as any);
        if (item.imageUrl) {
            setTimelineFileList([
                { uid: '-1', name: 'timeline-image', status: 'done', url: item.imageUrl },
            ]);
        } else {
            setTimelineFileList([]);
        }
        setTimelineModalOpen(true);
    };

    const handleTimelineImageUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;
        try {
            setTimelineUploading(true);
            const res = await cloudinaryService.uploadImage(file);
            const url = res.data.url;
            file.status = 'done';
            file.response = { data: res.data };
            file.url = url;
            onSuccess({ data: res.data }, file);
            setTimelineFileList((prev) => [...prev.filter((f: any) => f.uid !== file.uid), file]);
            timelineForm.setFieldValue('imageUrl', url);
            message.success('Image uploaded');
        } catch (e) {
            onError(e);
            message.error('Failed to upload image');
        } finally {
            setTimelineUploading(false);
        }
    };

    const onTimelineChange = (info: any) => {
        const { fileList } = info;
        setTimelineFileList(fileList);
        const file = info.file;
        if (file.status === 'done') {
            const url = file.url || file.response?.data?.url;
            if (url) timelineForm.setFieldValue('imageUrl', url);
        }
        if (file.status === 'removed') {
            timelineForm.setFieldValue('imageUrl', undefined);
        }
        if (file.status === 'error') {
            message.error(`${file.name} upload failed`);
        }
    };

    const submitTimelineModal = async () => {
        try {
            const values = await timelineForm.validateFields();
            if (timelineModalMode === 'add') {
                const created = await aboutService.addTimelineItem(values);
                setTimeline([...(timeline || []), created]);
                message.success('Timeline item added');
            } else if (timelineModalMode === 'edit' && editingIndex !== null) {
                const existing = timeline[editingIndex];
                if (existing) {
                    const updated = await aboutService.updateTimelineItem(existing.id as number, { ...existing, ...values });
                    const next = [...timeline];
                    next[editingIndex] = updated;
                    setTimeline(next);
                    message.success('Timeline item updated');
                }
            }
            setTimelineModalOpen(false);
            setEditingIndex(null);
            timelineForm.resetFields();
        } catch (e) {
            // validation or request error
        }
    };

    const saveTimelineItem = async (index: number, item: AboutTimelineItemDTO) => {
        // create or update by presence of id
        if (item && item.id) {
            const updated = await aboutService.updateTimelineItem(item.id, item);
            const next = [...timeline];
            next[index] = updated;
            setTimeline(next);
            message.success('Timeline updated');
        } else if (item) {
            const created = await aboutService.addTimelineItem(item);
            const next = [...timeline];
            next[index] = created;
            setTimeline(next);
            message.success('Timeline item added');
        }
    };

    const deleteTimelineItem = async (index: number) => {
        const item = timeline[index];
        if (item && item.id) {
            await aboutService.deleteTimelineItem(item.id);
        }
        const next = [...timeline];
        next.splice(index, 1);
        setTimeline(next);
        message.success('Timeline item removed');
    };

    const columns = [
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            width: 60,
            align: 'center' as const,
            render: (value: number) => (
                <span className="font-semibold text-gray-700 text-sm">{value}</span>
            )
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width: 70,
            align: 'center' as const,
            render: (value: string) => (
                <span className="font-medium text-blue-600 text-sm">{value}</span>
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 180,
            ellipsis: true,
            render: (value: string) => (
                <span className="font-medium text-gray-800 text-sm">{value}</span>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            width: 200,
            render: (value: string) => (
                <span className="text-gray-600 text-sm">{value}</span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 180,
            align: 'right' as const,
            render: (_: any, record: AboutTimelineItemDTO, idx: number) => (
                <Space size={4}>
                    <Button
                        size="small"
                        icon={<UploadOutlined />}
                        onClick={async () => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async () => {
                                if (!input.files || input.files.length === 0) return;
                                try {
                                    const res = await cloudinaryService.uploadImage(input.files[0] as any);
                                    const url = res.data.url;
                                    await saveTimelineItem(idx, { ...record, imageUrl: url });
                                } catch { message.error('Upload failed'); }
                            };
                            input.click();
                        }}
                    >
                        Image
                    </Button>
                    <Button
                        size="small"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => openEditTimeline(idx, record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this timeline item?"
                        description="This action cannot be undone."
                        onConfirm={() => deleteTimelineItem(idx)}
                        okText="Delete"
                        cancelText="Cancel"
                        okType="danger"
                    >
                        <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-3">About Page Management</h1>
                            <p className="text-gray-600 text-base">Manage the content and timeline for your about page</p>
                        </div>
                        <Button
                            type="primary"
                            size="middle"
                            icon={<SaveOutlined />}
                            onClick={handleSave}
                            loading={saving}
                            className="bg-blue-600 hover:bg-blue-700 border-blue-600"
                        >
                            Save All Changes
                        </Button>
                    </div>
                </div>

                {/* Main Content Card */}
                <Card
                    title={
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                            <span className="text-lg font-semibold text-gray-900">About Content</span>
                        </div>
                    }
                    loading={loading}
                    className="shadow-sm border-gray-200 rounded-lg"
                    bodyStyle={{ padding: '36px' }}
                >
                    <Form form={form} layout="vertical" className="space-y-8">
                        {/* Header Section */}
                        <div className="bg-gray-50 rounded-lg p-8 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Header Section</h3>
                            <Row gutter={[24, 20]}>
                                <Col xs={24} lg={12}>
                                    <Form.Item
                                        name="headerTitle"
                                        label="Header Title"
                                        rules={[{ required: true, message: 'Header title is required' }]}
                                    >
                                        <Input
                                            placeholder="Our Story"
                                            size="middle"
                                            className="rounded-md"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={12}>
                                    <Form.Item
                                        name="headerSubtitle"
                                        label="Header Subtitle"
                                    >
                                        <Input
                                            placeholder="A journey of excellence, innovation, and unwavering commitment"
                                            size="middle"
                                            className="rounded-md"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>

                        {/* Main Content Section */}
                        <div className="bg-gray-50 rounded-lg p-8 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Main Content</h3>
                            <Row gutter={[24, 20]}>
                                <Col xs={24} lg={12}>
                                    <Form.Item
                                        name="rightHeading"
                                        label="Content Heading"
                                    >
                                        <Input
                                            placeholder="Building Dreams, Creating Communities"
                                            size="middle"
                                            className="rounded-md"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="rightParagraph1"
                                        label="First Paragraph"
                                    >
                                        <Input.TextArea
                                            rows={3}
                                            placeholder="Enter the first paragraph of your content..."
                                            className="rounded-md"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="rightParagraph2"
                                        label="Second Paragraph"
                                    >
                                        <Input.TextArea
                                            rows={3}
                                            placeholder="Enter the second paragraph of your content..."
                                            className="rounded-md"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={12}>
                                    <div className="space-y-8">
                                        {/* Hero Image Section */}
                                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                                            <h4 className="font-medium text-gray-900 mb-4 text-base">Hero Image</h4>
                                            <Row gutter={[20, 16]} align="top">
                                                <Col span={16}>
                                                    <Form.Item name="heroImageUrl" label="Image URL" className="mb-2">
                                                        <Input
                                                            placeholder="https://..."
                                                            className="rounded-md"
                                                            size="small"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item label="Upload Image" colon={false} className="mb-2">
                                                        <Upload
                                                            name="hero"
                                                            listType="picture-card"
                                                            fileList={heroFileList}
                                                            onChange={onHeroChange}
                                                            customRequest={customHeroUpload}
                                                            accept="image/*"
                                                            maxCount={1}
                                                            className="w-full"
                                                        >
                                                            {heroFileList.length >= 1 ? null : (
                                                                <div className="flex flex-col items-center justify-center h-full">
                                                                    <UploadOutlined className="text-gray-400 text-lg mb-1" />
                                                                    <div className="text-xs text-gray-500">
                                                                        {heroUploading ? 'Uploading...' : 'Upload'}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Upload>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Form.Item name="heroImageCaption" label="Image Caption" className="mb-0">
                                                <Input
                                                    placeholder="Enter image caption..."
                                                    className="rounded-md"
                                                    size="small"
                                                />
                                            </Form.Item>
                                        </div>

                                        {/* Statistics Section */}
                                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                                            <h4 className="font-medium text-gray-900 mb-4 text-base">Statistics</h4>
                                            <Row gutter={[16, 16]}>
                                                <Col span={12}>
                                                    <Form.Item name="stat1Value" label="Stat 1 Value" className="mb-2">
                                                        <Input placeholder="13+" className="rounded-md" size="small" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="stat1Label" label="Stat 1 Label" className="mb-2">
                                                        <Input placeholder="Years of Excellence" className="rounded-md" size="small" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="stat2Value" label="Stat 2 Value" className="mb-2">
                                                        <Input placeholder="50K+" className="rounded-md" size="small" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="stat2Label" label="Stat 2 Label" className="mb-2">
                                                        <Input placeholder="Happy Customers" className="rounded-md" size="small" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="stat3Value" label="Stat 3 Value" className="mb-2">
                                                        <Input placeholder="100+" className="rounded-md" size="small" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="stat3Label" label="Stat 3 Label" className="mb-0">
                                                        <Input placeholder="Cities Covered" className="rounded-md" size="small" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>

                                        {/* CTA Section */}
                                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                                            <h4 className="font-medium text-gray-900 mb-4 text-base">Call to Action</h4>
                                            <Row gutter={[16, 16]}>
                                                <Col span={12}>
                                                    <Form.Item name="ctaText" label="CTA Text" className="mb-0">
                                                        <Input placeholder="Learn More About Us" className="rounded-md" size="small" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="ctaLink" label="CTA Link" className="mb-0">
                                                        <Input placeholder="/about" className="rounded-md" size="small" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Card>

                {/* Timeline Card */}
                <Card
                    title={
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-6 bg-green-600 rounded-full"></div>
                                <span className="text-lg font-semibold text-gray-900">Timeline Management</span>
                            </div>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={openAddTimeline}
                                className="bg-green-600 hover:bg-green-700 border-green-600"
                                size="middle"
                            >
                                Add Timeline Item
                            </Button>
                        </div>
                    }
                    className="shadow-sm border-gray-200 rounded-lg"
                    bodyStyle={{ padding: '32px' }}
                >
                    <div className="overflow-x-auto">
                        <Table
                            rowKey={(r) => String(r.id ?? `${r.year}-${r.title}`)}
                            columns={columns as any}
                            dataSource={timeline}
                            pagination={false}
                            size="small"
                            className="timeline-table"
                            rowClassName="hover:bg-gray-50 transition-colors"
                            scroll={{ x: 690 }}
                        />
                    </div>
                </Card>
            </div>

            {/* Timeline Modal */}
            <Modal
                title={
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-5 bg-blue-600 rounded-full"></div>
                        <span className="text-base font-semibold">
                            {timelineModalMode === 'add' ? 'Add Timeline Item' : 'Edit Timeline Item'}
                        </span>
                    </div>
                }
                open={timelineModalOpen}
                onCancel={() => { setTimelineModalOpen(false); setEditingIndex(null); }}
                onOk={submitTimelineModal}
                okText={timelineModalMode === 'add' ? 'Add Item' : 'Save Changes'}
                cancelText="Cancel"
                width={700}
                okButtonProps={{
                    className: 'bg-blue-600 hover:bg-blue-700 border-blue-600'
                }}
                destroyOnClose
            >
                <Form form={timelineForm} layout="vertical" className="mt-8">
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Form.Item
                                name="year"
                                label="Year"
                                rules={[{ required: true, message: 'Year is required' }]}
                            >
                                <Input
                                    placeholder="e.g., 2024"
                                    size="middle"
                                    className="rounded-md"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="order"
                                label="Display Order"
                                rules={[{ required: true, message: 'Order is required' }]}
                            >
                                <InputNumber
                                    min={1}
                                    className="w-full rounded-md"
                                    size="middle"
                                    placeholder="1"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: 'Title is required' }]}
                            >
                                <Input
                                    placeholder="Milestone title"
                                    size="middle"
                                    className="rounded-md"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Description is required' }]}
                            >
                                <Input.TextArea
                                    rows={3}
                                    placeholder="Describe this milestone in detail..."
                                    className="rounded-md"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h4 className="font-medium text-gray-900 mb-4 text-base">Timeline Image</h4>
                                <Row gutter={[20, 16]} align="top">
                                    <Col span={16}>
                                        <Form.Item name="imageUrl" label="Image URL" className="mb-0">
                                            <Input
                                                placeholder="https://..."
                                                className="rounded-md"
                                                size="small"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Upload Image" colon={false} className="mb-0">
                                            <Upload
                                                name="timeline"
                                                listType="picture-card"
                                                fileList={timelineFileList}
                                                onChange={onTimelineChange}
                                                customRequest={handleTimelineImageUpload}
                                                accept="image/*"
                                                maxCount={1}
                                                className="w-full"
                                            >
                                                {timelineFileList.length >= 1 ? null : (
                                                    <div className="flex flex-col items-center justify-center h-full">
                                                        <UploadOutlined className="text-gray-400 text-lg mb-1" />
                                                        <div className="text-xs text-gray-500">
                                                            {timelineUploading ? 'Uploading...' : 'Upload'}
                                                        </div>
                                                    </div>
                                                )}
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default AboutManagement;

