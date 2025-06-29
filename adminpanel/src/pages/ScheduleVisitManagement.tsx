import React, { useState, useEffect } from 'react';
import { Card, Button, message, Modal, Alert, Spin, Table, Tag, Space, Drawer, Descriptions, Typography, Select } from 'antd';
import { EyeOutlined, DeleteOutlined, CalendarOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface ScheduleVisit {
    id: number;
    name: string;
    email: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    message?: string;
    preferredContact: string;
    propertyId?: number;
    propertyTitle?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const ScheduleVisitManagement: React.FC = () => {
    const [scheduleVisits, setScheduleVisits] = useState<ScheduleVisit[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [viewingVisit, setViewingVisit] = useState<ScheduleVisit | null>(null);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [visitToDelete, setVisitToDelete] = useState<ScheduleVisit | null>(null);

    useEffect(() => {
        fetchScheduleVisits();
    }, []);

    const fetchScheduleVisits = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3000/schedule-visit');
            if (!response.ok) {
                throw new Error('Failed to fetch schedule visits');
            }

            const data = await response.json();
            setScheduleVisits(data);
        } catch (error) {
            console.error('Error fetching schedule visits:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch schedule visits';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (visit: ScheduleVisit) => {
        setViewingVisit(visit);
        setIsDrawerVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/schedule-visit/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete schedule visit');
            }

            setScheduleVisits(scheduleVisits.filter(v => v.id !== id));
            message.success('Schedule visit deleted successfully');
        } catch (error) {
            console.error('Error deleting schedule visit:', error);
            message.error('Failed to delete schedule visit');
        }
    };

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            const response = await fetch(`http://localhost:3000/schedule-visit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setScheduleVisits(scheduleVisits.map(v =>
                v.id === id ? { ...v, status } : v
            ));
            message.success('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            message.error('Failed to update status');
        }
    };

    const getStatusColor = (status: string) => {
        const colorMap = {
            'pending': 'orange',
            'confirmed': 'blue',
            'completed': 'green',
            'cancelled': 'red'
        };
        return colorMap[status as keyof typeof colorMap] || 'default';
    };

    const columns = [
        {
            title: 'Visitor Info',
            key: 'visitor',
            width: 250,
            render: (record: ScheduleVisit) => (
                <div className="space-y-1">
                    <div className="font-semibold text-gray-900 flex items-center">
                        <UserOutlined className="mr-2 text-blue-500" />
                        {record.name}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                        <CalendarOutlined className="mr-2 text-green-500" />
                        {record.email}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                        <PhoneOutlined className="mr-2 text-purple-500" />
                        {record.phone}
                    </div>
                </div>
            ),
        },
        {
            title: 'Property',
            key: 'property',
            width: 200,
            render: (record: ScheduleVisit) => (
                <div className="space-y-1">
                    {record.propertyTitle ? (
                        <div className="font-medium text-gray-800 flex items-center">
                            <HomeOutlined className="mr-2 text-orange-500" />
                            {record.propertyTitle}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">No specific property</div>
                    )}
                    <div className="text-sm text-gray-600">
                        Preferred: {record.preferredContact}
                    </div>
                </div>
            ),
        },
        {
            title: 'Visit Details',
            key: 'visit',
            width: 200,
            render: (record: ScheduleVisit) => (
                <div className="space-y-1">
                    <div className="text-sm text-gray-800">
                        <strong>Date:</strong> {new Date(record.preferredDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-800">
                        <strong>Time:</strong> {record.preferredTime}
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status: string, record: ScheduleVisit) => (
                <Select
                    value={status}
                    onChange={(value) => handleStatusUpdate(record.id, value)}
                    style={{ width: '100%' }}
                >
                    <Option value="pending">Pending</Option>
                    <Option value="confirmed">Confirmed</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            ),
        },
        {
            title: 'Requested',
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
            render: (record: ScheduleVisit) => (
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
                            setVisitToDelete(record);
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
                            Schedule Visit Management
                        </Title>
                        <Text type="secondary" className="text-gray-600">
                            View and manage property visit scheduling requests
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
                        dataSource={scheduleVisits}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} schedule visits`,
                        }}
                        scroll={{ x: 1200 }}
                        loading={loading}
                        className="custom-table"
                    />
                </div>
            )}

            {/* Schedule Visit Details Drawer */}
            <Drawer
                title={
                    <div className="flex items-center space-x-3">
                        <CalendarOutlined className="text-blue-600" />
                        <span className="text-xl font-semibold text-gray-800">Schedule Visit Details</span>
                    </div>
                }
                placement="right"
                width={600}
                onClose={() => {
                    setIsDrawerVisible(false);
                    setViewingVisit(null);
                }}
                open={isDrawerVisible}
            >
                {viewingVisit && (
                    <div className="space-y-6">
                        <Descriptions title="Visitor Information" column={1} bordered>
                            <Descriptions.Item label="Name">{viewingVisit.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{viewingVisit.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{viewingVisit.phone}</Descriptions.Item>
                            <Descriptions.Item label="Preferred Contact">
                                {viewingVisit.preferredContact}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={getStatusColor(viewingVisit.status)}>
                                    {viewingVisit.status.toUpperCase()}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Requested">
                                {new Date(viewingVisit.createdAt).toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>

                        <Descriptions title="Visit Details" column={1} bordered>
                            <Descriptions.Item label="Preferred Date">
                                {new Date(viewingVisit.preferredDate).toLocaleDateString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Preferred Time">
                                {viewingVisit.preferredTime}
                            </Descriptions.Item>
                            {viewingVisit.propertyTitle && (
                                <Descriptions.Item label="Property">
                                    {viewingVisit.propertyTitle}
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        {viewingVisit.message && (
                            <div>
                                <Title level={4}>Additional Message</Title>
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <Text className="text-gray-700 whitespace-pre-wrap">
                                        {viewingVisit.message}
                                    </Text>
                                </div>
                            </div>
                        )}

                        <div className="flex space-x-2 pt-4">
                            <Button
                                type="primary"
                                onClick={() => {
                                    // Handle confirm action
                                    message.info('Confirmation functionality to be implemented');
                                }}
                                className="flex-1"
                            >
                                Confirm Visit
                            </Button>
                            <Button
                                danger
                                onClick={() => {
                                    setIsDrawerVisible(false);
                                    setVisitToDelete(viewingVisit);
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
                title="Delete Schedule Visit"
                open={deleteConfirmVisible}
                onCancel={() => {
                    setDeleteConfirmVisible(false);
                    setVisitToDelete(null);
                }}
                onOk={() => {
                    if (visitToDelete) {
                        handleDelete(visitToDelete.id);
                    }
                    setDeleteConfirmVisible(false);
                    setVisitToDelete(null);
                }}
                okText="Delete"
                cancelText="Cancel"
                okType="danger"
            >
                <p>Are you sure you want to delete this schedule visit request?</p>
                <p className="text-gray-600 text-sm mt-2">
                    This action cannot be undone.
                </p>
            </Modal>
        </div>
    );
};

export default ScheduleVisitManagement; 