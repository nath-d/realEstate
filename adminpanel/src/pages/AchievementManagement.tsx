import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch, message, Space, Popconfirm, Card, Typography, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import config from '../../config';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: string;
    category: string;
    year: string;
    stats: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface CreateAchievementData {
    title: string;
    description: string;
    icon: string;
    category: string;
    year: string;
    stats: string;
    order?: number;
    isActive?: boolean;
}

const AchievementManagement: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
    const [form] = Form.useForm();

    const iconOptions = [
        { value: 'FaCertificate', label: 'Certificate' },
        { value: 'FaCheckCircle', label: 'Check Circle' },
        { value: 'FaShieldAlt', label: 'Shield' },
        { value: 'FaAward', label: 'Award' },
        { value: 'FaMedal', label: 'Medal' },
        { value: 'FaStar', label: 'Star' },
        { value: 'FaTrophy', label: 'Trophy' },
        { value: 'FaRibbon', label: 'Ribbon' },
        { value: 'FaCrown', label: 'Crown' },
        { value: 'FaGem', label: 'Gem' },
    ];

    const categoryOptions = [
        { value: 'Materials', label: 'Materials' },
        { value: 'Structural', label: 'Structural' },
        { value: 'Finishing', label: 'Finishing' },
        { value: 'Electrical', label: 'Electrical' },
        { value: 'Plumbing', label: 'Plumbing' },
        { value: 'Safety', label: 'Safety' },
        { value: 'Quality', label: 'Quality' },
        { value: 'Other', label: 'Other' },
    ];

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${config.api.baseUrl}/achievements`);
            if (response.ok) {
                const data = await response.json();
                setAchievements(data);
            } else {
                message.error('Failed to fetch achievements');
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
            message.error('Failed to fetch achievements');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingAchievement(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (achievement: Achievement) => {
        setEditingAchievement(achievement);
        form.setFieldsValue(achievement);
        setModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${config.api.baseUrl}/achievements/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                message.success('Achievement deleted successfully');
                fetchAchievements();
            } else {
                message.error('Failed to delete achievement');
            }
        } catch (error) {
            console.error('Error deleting achievement:', error);
            message.error('Failed to delete achievement');
        }
    };

    const handleFormSubmit = async (values: CreateAchievementData) => {
        try {
            // Set default order if not provided and always set isActive to true
            const formData = {
                ...values,
                order: values.order || achievements.length,
                isActive: true
            };

            const url = editingAchievement
                ? `${config.api.baseUrl}/achievements/${editingAchievement.id}`
                : `${config.api.baseUrl}/achievements`;

            const method = editingAchievement ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                message.success(
                    editingAchievement
                        ? 'Achievement updated successfully'
                        : 'Achievement created successfully'
                );
                setModalVisible(false);
                form.resetFields();
                fetchAchievements();
            } else {
                const errorData = await response.json().catch(() => ({}));
                message.error(errorData.message || 'Failed to save achievement');
            }
        } catch (error) {
            console.error('Error saving achievement:', error);
            message.error('Failed to save achievement');
        }
    };



    const columns = [
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            width: 80,
            render: (order: number) => <span className="text-sm font-medium">{order}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => (
                <Tag color="blue">{category}</Tag>
            ),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width: 100,
        },
        {
            title: 'Stats',
            dataIndex: 'stats',
            key: 'stats',
            render: (stats: string) => <strong>{stats}</strong>,
        },

        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_: any, record: Achievement) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        size="small"
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this achievement?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <Title level={2} className="mb-2">Certifications</Title>
                <p className="text-gray-600">
                    Manage the certifications displayed on the homepage. You can add, edit, and delete certifications.
                </p>
            </div>

            <Card>
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Achievements</h3>
                        <p className="text-sm text-gray-500">
                            Total: {achievements.length} Certifications
                        </p>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Add Achievement
                    </Button>
                </div>

                <Table
                    dataSource={achievements}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                />
            </Card>

            <Modal
                title={editingAchievement ? 'Edit Achievement' : 'Add Achievement'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={600}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter the title' }]}
                    >
                        <Input placeholder="e.g., Premium Cement Certification" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter the description' }]}
                    >
                        <TextArea
                            rows={3}
                            placeholder="e.g., ISO 9001:2015 certified cement from leading manufacturers"
                        />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="icon"
                            label="Icon"
                            rules={[{ required: true, message: 'Please select an icon' }]}
                        >
                            <Select placeholder="Select an icon">
                                {iconOptions.map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: 'Please select a category' }]}
                        >
                            <Select placeholder="Select a category">
                                {categoryOptions.map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="year"
                            label="Year"
                            rules={[{ required: true, message: 'Please enter the year' }]}
                        >
                            <Input placeholder="e.g., 2024" />
                        </Form.Item>

                        <Form.Item
                            name="stats"
                            label="Stats/Value"
                            rules={[{ required: true, message: 'Please enter the stats' }]}
                        >
                            <Input placeholder="e.g., Grade 53 OPC" />
                        </Form.Item>
                    </div>





                    <Form.Item className="mb-0">
                        <div className="flex justify-end space-x-2">
                            <Button onClick={() => setModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {editingAchievement ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AchievementManagement;
