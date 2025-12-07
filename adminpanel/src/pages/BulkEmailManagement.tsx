import React, { useState, useEffect } from 'react';
import { Card, Button, message, Spin, Alert, Space, Typography, Statistic, Row, Col, Modal, Progress } from 'antd';
import { MailOutlined, UserOutlined, SendOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import config from '../../config';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

interface UserCount {
    count: number;
    message: string;
}

const BulkEmailManagement: React.FC = () => {
    const [userCount, setUserCount] = useState<UserCount | null>(null);
    const [loading, setLoading] = useState(false);
    const [sendingEmails, setSendingEmails] = useState<{ [key: string]: boolean }>({});

    const getAuthHeaders = () => {
        const token = localStorage.getItem('admin_token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchUserCount = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.api.baseUrl}/marketing/user-count`, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setUserCount(response.data);
            } else {
                message.error('Failed to fetch user count');
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                message.error('Authentication required. Please login again.');
            } else {
                message.error('Error fetching user count: ' + (error.response?.data?.message || error.message));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserCount();
    }, []);

    const sendBulkEmail = async (type: 'property-guide' | 'investment-tips' | 'other', title: string) => {
        const emailTypeMap = {
            'property-guide': 'Property Guide',
            'investment-tips': 'Investment Tips',
            'other': 'Other Resources'
        };

        confirm({
            title: `Send ${emailTypeMap[type]} to All Users?`,
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>
                    <p>This will send <strong>{emailTypeMap[type]}</strong> emails to <strong>{userCount?.count || 0}</strong> users.</p>
                    <p>All active PDFs in the "{emailTypeMap[type]}" category will be attached to each email.</p>
                    <Alert 
                        message="This action cannot be undone!" 
                        type="warning" 
                        showIcon 
                        style={{ marginTop: 10 }}
                    />
                </div>
            ),
            okText: 'Send Emails',
            okType: 'primary',
            cancelText: 'Cancel',
            width: 500,
            async onOk() {
                setSendingEmails(prev => ({ ...prev, [type]: true }));
                try {
                    const endpoint = `${config.api.baseUrl}/marketing/send-${type.replace('_', '-')}-all`;
                    const response = await axios.post(endpoint, {}, {
                        headers: getAuthHeaders()
                    });
                    
                    if (response.data.success) {
                        message.success(`${title} emails sent successfully to all users!`);
                    } else {
                        message.error(`Failed to send ${title} emails: ` + response.data.message);
                    }
                } catch (error: any) {
                    if (error.response?.status === 401) {
                        message.error('Authentication required. Please login again.');
                    } else {
                        message.error(`Error sending ${title} emails: ` + (error.response?.data?.message || error.message));
                    }
                } finally {
                    setSendingEmails(prev => ({ ...prev, [type]: false }));
                }
            },
        });
    };

    const emailCategories = [
        {
            key: 'property-guide',
            title: 'Property Guide',
            description: 'Send property evaluation guides, pricing strategies, and legal considerations to help users make informed property decisions.',
            icon: '🏠',
            color: '#52c41a',
        },
        {
            key: 'investment-tips',
            title: 'Investment Tips',
            description: 'Share investment strategies, market insights, and financial advice to help users build their real estate portfolio.',
            icon: '💰',
            color: '#1890ff',
        },
        {
            key: 'other',
            title: 'Other Resources',
            description: 'Send special resources, announcements, or miscellaneous documents that provide additional value to users.',
            icon: '📄',
            color: '#722ed1',
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <div style={{ marginBottom: '24px' }}>
                    <Title level={2} style={{ marginBottom: '8px' }}>
                        <MailOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                        Bulk Email Management
                    </Title>
                    <Paragraph type="secondary">
                        Send marketing emails with PDF attachments to all registered users. 
                        Each email category will include all active PDFs from that category.
                    </Paragraph>
                </div>

                {/* User Statistics */}
                <Card size="small" style={{ marginBottom: '24px', backgroundColor: '#f6ffed' }}>
                    <Row gutter={16} align="middle">
                        <Col span={12}>
                            <Statistic
                                title="Total Users Available"
                                value={userCount?.count || 0}
                                prefix={<UserOutlined />}
                                loading={loading}
                            />
                        </Col>
                        <Col span={12}>
                            <Button 
                                onClick={fetchUserCount} 
                                loading={loading}
                                icon={<SendOutlined />}
                            >
                                Refresh Count
                            </Button>
                        </Col>
                    </Row>
                    {userCount && (
                        <Alert
                            message={userCount.message}
                            type="info"
                            showIcon
                            style={{ marginTop: '12px' }}
                        />
                    )}
                </Card>

                {/* Email Categories */}
                <Row gutter={[16, 16]}>
                    {emailCategories.map((category) => (
                        <Col xs={24} sm={24} md={8} key={category.key}>
                            <Card
                                hoverable
                                style={{ 
                                    height: '100%',
                                    borderColor: category.color,
                                    borderWidth: '2px'
                                }}
                                bodyStyle={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    height: '280px' 
                                }}
                            >
                                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                    <div style={{ 
                                        fontSize: '48px', 
                                        marginBottom: '12px' 
                                    }}>
                                        {category.icon}
                                    </div>
                                    <Title level={4} style={{ 
                                        margin: 0, 
                                        color: category.color 
                                    }}>
                                        {category.title}
                                    </Title>
                                </div>

                                <Paragraph 
                                    style={{ 
                                        flex: 1, 
                                        textAlign: 'center',
                                        color: '#666'
                                    }}
                                >
                                    {category.description}
                                </Paragraph>

                                <Button
                                    type="primary"
                                    block
                                    size="large"
                                    loading={sendingEmails[category.key as keyof typeof sendingEmails]}
                                    disabled={!userCount || userCount.count === 0}
                                    onClick={() => sendBulkEmail(
                                        category.key as 'property-guide' | 'investment-tips' | 'other', 
                                        category.title
                                    )}
                                    style={{ 
                                        backgroundColor: category.color,
                                        borderColor: category.color,
                                        marginTop: 'auto'
                                    }}
                                >
                                    {sendingEmails[category.key as keyof typeof sendingEmails] ? (
                                        <>
                                            <Spin size="small" style={{ marginRight: '8px' }} />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send to {userCount?.count || 0} Users
                                        </>
                                    )}
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Information Section */}
                <Card 
                    title="Important Notes" 
                    style={{ marginTop: '24px' }}
                    size="small"
                >
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Alert
                            message="All registered users will receive emails (including unverified email addresses)."
                            type="info"
                            showIcon
                        />
                        <Alert
                            message="All active PDFs in the selected category will be automatically attached."
                            type="info"
                            showIcon
                        />
                        <Alert
                            message="Admin users are excluded from bulk email campaigns."
                            type="info"
                            showIcon
                        />
                        <Alert
                            message="Emails are sent individually to ensure deliverability and personalization."
                            type="warning"
                            showIcon
                        />
                    </Space>
                </Card>
            </Card>
        </div>
    );
};

export default BulkEmailManagement;
