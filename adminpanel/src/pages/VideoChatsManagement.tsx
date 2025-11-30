import React, { useState, useEffect } from 'react';
import config from '../../config';
import { useNotifications } from '../context/NotificationContext';
import { Card, Button, message, Modal, Alert, Spin, Table, Tag, Space, Drawer, Descriptions, Typography, Select } from 'antd';
import { EyeOutlined, DeleteOutlined, CalendarOutlined, UserOutlined, PhoneOutlined, HomeOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

interface ScheduleVideoChat {
    id: number;
    name: string;
    email: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    message?: string;
    preferredContact: string;
    platform: string;
    propertyId?: number;
    propertyTitle?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const VideoChatsManagement: React.FC = () => {
    const location = useLocation() as any;
    const [videoChats, setVideoChats] = useState<ScheduleVideoChat[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [viewingVideoChat, setViewingVideoChat] = useState<ScheduleVideoChat | null>(null);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [videoChatToDelete, setVideoChatToDelete] = useState<ScheduleVideoChat | null>(null);
    const { refresh } = useNotifications();
    const [highlightId, setHighlightId] = useState<number | null>(null);

    useEffect(() => {
        fetchVideoChats();
    }, []);

    // pick up highlight from navigation state
    useEffect(() => {
        const hl = location?.state?.highlight;
        if (hl?.type === 'video-chat' && typeof hl?.id === 'number') {
            setHighlightId(hl.id);
            const t = setTimeout(() => setHighlightId(null), 4000);
            return () => clearTimeout(t);
        }
    }, [location?.state]);

    const fetchVideoChats = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${config.api.baseUrl}/schedule-video-chat`);
            if (!response.ok) {
                throw new Error('Failed to fetch video chats');
            }

            const data = await response.json();
            setVideoChats(data);
        } catch (error) {
            console.error('Error fetching video chats:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch video chats';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (videoChat: ScheduleVideoChat) => {
        setViewingVideoChat(videoChat);
        setIsDrawerVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${config.api.baseUrl}/schedule-video-chat/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete video chat');
            }

            setVideoChats(videoChats.filter(v => v.id !== id));
            message.success('Video chat deleted successfully');
            refresh();
        } catch (error) {
            console.error('Error deleting video chat:', error);
            message.error('Failed to delete video chat');
        }
    };

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            const response = await fetch(`${config.api.baseUrl}/schedule-video-chat/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setVideoChats(videoChats.map(v =>
                v.id === id ? { ...v, status } : v
            ));
            message.success('Status updated successfully');
            refresh();
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

    const getPlatformIcon = (platform: string) => {
        const platformMap = {
            'zoom': '📹',
            'google-meet': '🎥',
            'microsoft-teams': '💼',
            'whatsapp': '📱',
            'facetime': '📞'
        };
        return platformMap[platform as keyof typeof platformMap] || '📹';
    };

    const columns = [
        {
            title: 'Visitor Info',
            key: 'visitor',
            width: 250,
            render: (record: ScheduleVideoChat) => (
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
            render: (record: ScheduleVideoChat) => (
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
            title: 'Video Chat Details',
            key: 'videoChat',
            width: 200,
            render: (record: ScheduleVideoChat) => (
                <div className="space-y-1">
                    <div className="text-sm text-gray-800">
                        <strong>Date:</strong> {new Date(record.preferredDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-800">
                        <strong>Time:</strong> {record.preferredTime}
                    </div>
                    <div className="text-sm text-gray-800 flex items-center">
                        <span className="mr-1">{getPlatformIcon(record.platform)}</span>
                        <strong>Platform:</strong> {record.platform.charAt(0).toUpperCase() + record.platform.slice(1).replace('-', ' ')}
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status: string, record: ScheduleVideoChat) => (
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
            render: (record: ScheduleVideoChat) => (
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
                            setVideoChatToDelete(record);
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
                            Video Chat Management
                        </Title>
                        <Text type="secondary" className="text-gray-600">
                            View and manage property video chat scheduling requests
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
                        dataSource={videoChats}
                        rowKey="id"
                        rowClassName={(record: ScheduleVideoChat) => record.id === highlightId ? 'row-highlight' : ''}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} video chats`,
                        }}
                        scroll={{ x: 1200 }}
                        loading={loading}
                        className="custom-table"
                    />
                </div>
            )}

            {/* Video Chat Details Drawer */}
            <Drawer
                title={
                    <div className="flex items-center space-x-3">
                        <VideoCameraOutlined className="text-blue-600" />
                        <span className="text-xl font-semibold text-gray-800">Video Chat Details</span>
                    </div>
                }
                placement="right"
                width={600}
                onClose={() => {
                    setIsDrawerVisible(false);
                    setViewingVideoChat(null);
                }}
                open={isDrawerVisible}
            >
                {viewingVideoChat && (
                    <div className="space-y-6">
                        <Descriptions title="Visitor Information" column={1} bordered>
                            <Descriptions.Item label="Name">{viewingVideoChat.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{viewingVideoChat.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{viewingVideoChat.phone}</Descriptions.Item>
                            <Descriptions.Item label="Preferred Contact">
                                {viewingVideoChat.preferredContact}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={getStatusColor(viewingVideoChat.status)}>
                                    {viewingVideoChat.status.toUpperCase()}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Requested">
                                {new Date(viewingVideoChat.createdAt).toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>

                        <Descriptions title="Video Chat Details" column={1} bordered>
                            <Descriptions.Item label="Preferred Date">
                                {new Date(viewingVideoChat.preferredDate).toLocaleDateString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Preferred Time">
                                {viewingVideoChat.preferredTime}
                            </Descriptions.Item>
                            <Descriptions.Item label="Platform">
                                <div className="flex items-center">
                                    <span className="mr-2">{getPlatformIcon(viewingVideoChat.platform)}</span>
                                    {viewingVideoChat.platform.charAt(0).toUpperCase() + viewingVideoChat.platform.slice(1).replace('-', ' ')}
                                </div>
                            </Descriptions.Item>
                            {viewingVideoChat.propertyTitle && (
                                <Descriptions.Item label="Property">
                                    {viewingVideoChat.propertyTitle}
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        {viewingVideoChat.message && (
                            <div>
                                <Title level={4}>Additional Message</Title>
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <Text className="text-gray-700 whitespace-pre-wrap">
                                        {viewingVideoChat.message}
                                    </Text>
                                </div>
                            </div>
                        )}

                        <div className="flex space-x-2 pt-4">
                            <Button
                                danger
                                onClick={() => {
                                    setIsDrawerVisible(false);
                                    setVideoChatToDelete(viewingVideoChat);
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
                title="Delete Video Chat"
                open={deleteConfirmVisible}
                onCancel={() => {
                    setDeleteConfirmVisible(false);
                    setVideoChatToDelete(null);
                }}
                onOk={() => {
                    if (videoChatToDelete) {
                        handleDelete(videoChatToDelete.id);
                    }
                    setDeleteConfirmVisible(false);
                    setVideoChatToDelete(null);
                }}
                okText="Delete"
                cancelText="Cancel"
                okType="danger"
            >
                <p>Are you sure you want to delete this video chat request?</p>
                <p className="text-gray-600 text-sm mt-2">
                    This action cannot be undone.
                </p>
            </Modal>
        </div>
    );
};

export default VideoChatsManagement;

