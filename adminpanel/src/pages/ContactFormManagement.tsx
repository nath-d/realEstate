import React, { useState, useEffect } from 'react';
import { Card, Button, message, Modal, Alert, Spin, Table, Tag, Space, Drawer, Descriptions, Typography, Select } from 'antd';
import { EyeOutlined, DeleteOutlined, MailOutlined, UserOutlined, PhoneOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface ContactForm {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const ContactFormManagement: React.FC = () => {
    const [contactForms, setContactForms] = useState<ContactForm[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [viewingForm, setViewingForm] = useState<ContactForm | null>(null);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [formToDelete, setFormToDelete] = useState<ContactForm | null>(null);

    useEffect(() => {
        fetchContactForms();
    }, []);

    const fetchContactForms = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3000/contact');
            if (!response.ok) {
                throw new Error('Failed to fetch contact forms');
            }

            const data = await response.json();
            setContactForms(data);
        } catch (error) {
            console.error('Error fetching contact forms:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch contact forms';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (form: ContactForm) => {
        setViewingForm(form);
        setIsDrawerVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/contact/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete contact form');
            }

            setContactForms(contactForms.filter(f => f.id !== id));
            message.success('Contact form deleted successfully');
        } catch (error) {
            console.error('Error deleting contact form:', error);
            message.error('Failed to delete contact form');
        }
    };

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            const response = await fetch(`http://localhost:3000/contact/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setContactForms(contactForms.map(f =>
                f.id === id ? { ...f, status } : f
            ));
            message.success('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            message.error('Failed to update status');
        }
    };

    const getStatusColor = (status: string) => {
        const colorMap = {
            'new': 'blue',
            'read': 'orange',
            'responded': 'green',
            'closed': 'red'
        };
        return colorMap[status as keyof typeof colorMap] || 'default';
    };

    const columns = [
        {
            title: 'Contact Info',
            key: 'contact',
            width: 250,
            render: (record: ContactForm) => (
                <div className="space-y-1">
                    <div className="font-semibold text-gray-900 flex items-center">
                        <UserOutlined className="mr-2 text-blue-500" />
                        {record.name}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                        <MailOutlined className="mr-2 text-green-500" />
                        {record.email}
                    </div>
                    {record.phone && (
                        <div className="text-sm text-gray-600 flex items-center">
                            <PhoneOutlined className="mr-2 text-purple-500" />
                            {record.phone}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            width: 200,
            render: (subject: string) => (
                <div className="font-medium text-gray-800">{subject}</div>
            ),
        },
        {
            title: 'Message',
            key: 'message',
            width: 300,
            render: (record: ContactForm) => (
                <div className="text-sm text-gray-600 line-clamp-2">
                    {record.message.length > 100
                        ? `${record.message.substring(0, 100)}...`
                        : record.message
                    }
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status: string, record: ContactForm) => (
                <Select
                    value={status}
                    onChange={(value) => handleStatusUpdate(record.id, value)}
                    style={{ width: '100%' }}
                >
                    <Option value="new">New</Option>
                    <Option value="read">Read</Option>
                    <Option value="responded">Responded</Option>
                    <Option value="closed">Closed</Option>
                </Select>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date: string) => (
                <div className="text-sm text-gray-600">
                    {new Date(date).toLocaleDateString()}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (record: ContactForm) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                        size="small"
                    >
                        View
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setFormToDelete(record);
                            setDeleteConfirmVisible(true);
                        }}
                        size="small"
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="h-full">
            {/* Header Section */}
            <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Title level={2} className="mb-2 text-gray-800">
                            Contact Form Management
                        </Title>
                        <Text type="secondary" className="text-gray-600">
                            View and manage contact form submissions from your website
                        </Text>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : error ? (
                <div className="px-6">
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        className="mb-6"
                    />
                </div>
            ) : (
                <div className="w-full">
                    <Table
                        columns={columns}
                        dataSource={contactForms}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} contact forms`,
                        }}
                        scroll={{ x: 1200 }}
                        loading={loading}
                        className="custom-table"
                    />
                </div>
            )}

            {/* Contact Form Details Drawer */}
            <Drawer
                title={
                    <div className="flex items-center space-x-3">
                        <MessageOutlined className="text-blue-600" />
                        <span className="text-xl font-semibold text-gray-800">Contact Form Details</span>
                    </div>
                }
                placement="right"
                width={600}
                onClose={() => {
                    setIsDrawerVisible(false);
                    setViewingForm(null);
                }}
                open={isDrawerVisible}
            >
                {viewingForm && (
                    <div className="space-y-6">
                        <Descriptions title="Contact Information" column={1} bordered>
                            <Descriptions.Item label="Name">{viewingForm.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{viewingForm.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{viewingForm.phone || 'Not provided'}</Descriptions.Item>
                            <Descriptions.Item label="Subject">{viewingForm.subject}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={getStatusColor(viewingForm.status)}>
                                    {viewingForm.status.toUpperCase()}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Submitted">
                                {new Date(viewingForm.createdAt).toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>

                        <div>
                            <Title level={4}>Message</Title>
                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <Text className="text-gray-700 whitespace-pre-wrap">
                                    {viewingForm.message}
                                </Text>
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-4">
                            <Button
                                type="primary"
                                onClick={() => {
                                    // Handle respond action
                                    message.info('Response functionality to be implemented');
                                }}
                                className="flex-1"
                            >
                                Respond
                            </Button>
                            <Button
                                danger
                                onClick={() => {
                                    setIsDrawerVisible(false);
                                    setFormToDelete(viewingForm);
                                    setDeleteConfirmVisible(true);
                                }}
                                className="flex-1"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
            </Drawer>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Contact Form"
                open={deleteConfirmVisible}
                onCancel={() => {
                    setDeleteConfirmVisible(false);
                    setFormToDelete(null);
                }}
                onOk={() => {
                    if (formToDelete) {
                        handleDelete(formToDelete.id);
                    }
                    setDeleteConfirmVisible(false);
                    setFormToDelete(null);
                }}
                okText="Delete"
                cancelText="Cancel"
                okType="danger"
            >
                <p>Are you sure you want to delete this contact form submission?</p>
                <p className="text-gray-600 text-sm mt-2">
                    This action cannot be undone.
                </p>
            </Modal>
        </div>
    );
};

export default ContactFormManagement; 