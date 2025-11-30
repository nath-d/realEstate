import React, { useState, useEffect } from 'react';
import config from '../../config';
import { Card, Row, Col, Statistic, Typography, Progress, List, Avatar, Tag, Space, Button, Alert, Spin } from 'antd';
import {
    HomeOutlined,
    DollarOutlined,
    RiseOutlined,
    ClockCircleOutlined,
    UserOutlined,
    EyeOutlined,
    StarOutlined,
    EnvironmentOutlined,
    PlusOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { TbCurrencyRupee } from "react-icons/tb";
const { Title, Text } = Typography;

interface Property {
    id: number;
    title: string;
    price: number;
    type: 'villa' | 'apartment' | 'house' | 'penthouse';
    status: 'for sale' | 'for rent' | 'sold';
    bedrooms: number;
    bathrooms: number;
    featured: boolean;
    images: Array<{ id: number; url: string }>;
    location: {
        city: string;
        state: string;
    };
}

interface DashboardStats {
    totalProperties: number;
    forSaleProperties: number;
    forRentProperties: number;
    soldProperties: number;
    featuredProperties: number;
    totalValue: number;
    averagePrice: number;
    recentProperties: Property[];
    topProperties: Property[];
    contactForms: {
        total: number;
        new: number;
        read: number;
        responded: number;
    };
    scheduleVisits: {
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
    };
    videoChats: {
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
    };
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalProperties: 0,
        forSaleProperties: 0,
        forRentProperties: 0,
        soldProperties: 0,
        featuredProperties: 0,
        totalValue: 0,
        averagePrice: 0,
        recentProperties: [],
        topProperties: [],
        contactForms: {
            total: 0,
            new: 0,
            read: 0,
            responded: 0
        },
        scheduleVisits: {
            total: 0,
            pending: 0,
            confirmed: 0,
            completed: 0
        },
        videoChats: {
            total: 0,
            pending: 0,
            confirmed: 0,
            completed: 0
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch properties
            const propertiesResponse = await fetch(`${config.api.baseUrl}/properties`);
            if (!propertiesResponse.ok) {
                throw new Error('Failed to fetch properties');
            }
            const properties: Property[] = await propertiesResponse.json();

            // Fetch contact form stats
            const contactStatsResponse = await fetch(`${config.api.baseUrl}/contact/stats`);
            const contactStats = contactStatsResponse.ok ? await contactStatsResponse.json() : { total: 0, new: 0, read: 0, responded: 0 };

            // Fetch schedule visit stats
            const scheduleStatsResponse = await fetch(`${config.api.baseUrl}/schedule-visit/stats`);
            const scheduleStats = scheduleStatsResponse.ok ? await scheduleStatsResponse.json() : { total: 0, pending: 0, confirmed: 0, completed: 0 };

            // Fetch video chats stats
            const videoChatsStatsResponse = await fetch(`${config.api.baseUrl}/schedule-video-chat/stats`);
            const videoChatsStats = videoChatsStatsResponse.ok ? await videoChatsStatsResponse.json() : { total: 0, pending: 0, confirmed: 0, completed: 0 };

            // Calculate statistics
            const totalProperties = properties.length;
            const forSaleProperties = properties.filter(p => p.status === 'for sale').length;
            const forRentProperties = properties.filter(p => p.status === 'for rent').length;
            const soldProperties = properties.filter(p => p.status === 'sold').length;
            const featuredProperties = properties.filter(p => p.featured).length;
            const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
            const averagePrice = totalProperties > 0 ? totalValue / totalProperties : 0;

            // Get recent properties (last 5)
            const recentProperties = properties
                .sort((a, b) => b.id - a.id)
                .slice(0, 5);

            // Get top properties by price (top 5)
            const topProperties = properties
                .sort((a, b) => b.price - a.price)
                .slice(0, 5);

            setStats({
                totalProperties,
                forSaleProperties,
                forRentProperties,
                soldProperties,
                featuredProperties,
                totalValue,
                averagePrice,
                recentProperties,
                topProperties,
                contactForms: contactStats,
                scheduleVisits: scheduleStats,
                videoChats: videoChatsStats
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'for sale': return 'green';
            case 'for rent': return 'orange';
            case 'sold': return 'red';
            default: return 'default';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'villa': return '🏡';
            case 'apartment': return '🏢';
            case 'house': return '🏠';
            case 'penthouse': return '🏙️';
            default: return '🏠';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                className="mb-6"
            />
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <Title level={2} className="mb-2 text-gray-800">
                    Dashboard Overview
                </Title>
                <Text type="secondary" className="text-gray-600">
                    Welcome back! Here's what's happening with your real estate portfolio.
                </Text>
            </div>

            {/* Main Statistics */}
            <Row gutter={[16, 16]} className="mb-8">
                <Col xs={24} sm={12} lg={6}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                        <Statistic
                            title="Total Properties"
                            value={stats.totalProperties}
                            prefix={<HomeOutlined className="text-blue-500" />}
                            valueStyle={{ color: '#3b82f6' }}
                        />
                        <div className="mt-2">
                            <Text type="secondary" className="text-xs">
                                Portfolio Size
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                        <Statistic
                            title="For Sale"
                            value={stats.forSaleProperties}
                            prefix={<RiseOutlined className="text-green-500" />}
                            valueStyle={{ color: '#10b981' }}
                        />
                        <div className="mt-2">
                            <Text type="secondary" className="text-xs">
                                {stats.totalProperties > 0 ? `${((stats.forSaleProperties / stats.totalProperties) * 100).toFixed(1)}%` : '0%'} of portfolio
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                        <Statistic
                            title="For Rent"
                            value={stats.forRentProperties}
                            prefix={<ClockCircleOutlined className="text-orange-500" />}
                            valueStyle={{ color: '#f59e0b' }}
                        />
                        <div className="mt-2">
                            <Text type="secondary" className="text-xs">
                                {stats.totalProperties > 0 ? `${((stats.forRentProperties / stats.totalProperties) * 100).toFixed(1)}%` : '0%'} of portfolio
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                        <Statistic
                            title="Total Value"
                            value={stats.totalValue}
                            // prefix={<TbCurrencyRupee className="text-green-500" />}
                            valueStyle={{ color: '#10b981' }}
                            formatter={(value) => `₹${(value as number).toLocaleString()}`}
                        />
                        <div className="mt-2">
                            <Text type="secondary" className="text-xs">
                                Portfolio Value
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Secondary Statistics */}
            <Row gutter={[16, 16]} className="mb-8">
                <Col xs={24} sm={12} lg={8}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] h-full">
                        <div className="flex items-center justify-between mb-4">
                            <Title level={4} className="m-0">Portfolio Status</Title>
                            <Button
                                type="primary"
                                onClick={() => navigate('/properties')}
                                size="middle"
                                className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                            >
                                View All
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>For Sale</Text>
                                    <Text strong>{stats.forSaleProperties}</Text>
                                </div>
                                <Progress
                                    percent={stats.totalProperties > 0 ? (stats.forSaleProperties / stats.totalProperties) * 100 : 0}
                                    strokeColor="#10b981"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>For Rent</Text>
                                    <Text strong>{stats.forRentProperties}</Text>
                                </div>
                                <Progress
                                    percent={stats.totalProperties > 0 ? (stats.forRentProperties / stats.totalProperties) * 100 : 0}
                                    strokeColor="#f59e0b"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Sold</Text>
                                    <Text strong>{stats.soldProperties}</Text>
                                </div>
                                <Progress
                                    percent={stats.totalProperties > 0 ? (stats.soldProperties / stats.totalProperties) * 100 : 0}
                                    strokeColor="#ef4444"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] h-full">
                        <div className="flex items-center justify-between mb-4">
                            <Title level={4} className="m-0">Featured Properties</Title>
                            <Tag color="gold" icon={<StarOutlined />}>
                                {stats.featuredProperties}
                            </Tag>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-500 mb-2">
                                {stats.featuredProperties}
                            </div>
                            <Text type="secondary">
                                {stats.featuredProperties > 0
                                    ? `${((stats.featuredProperties / stats.totalProperties) * 100).toFixed(1)}% of properties are featured`
                                    : 'No featured properties yet'
                                }
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] h-full">
                        <Title level={4} className="mb-4">Average Price</Title>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                ₹{stats.averagePrice.toLocaleString()}
                            </div>
                            <Text type="secondary">
                                Per property
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Form Submissions Statistics */}
            <Row gutter={[16, 16]} className="mb-8">
                <Col xs={24} sm={12} lg={12}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] h-full">
                        <div className="flex items-center justify-between mb-4">
                            <Title level={4} className="m-0">Contact Forms</Title>
                            <Button
                                type="primary"
                                onClick={() => navigate('/contact-forms')}
                                size="middle"
                                className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                            >
                                View All
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>New</Text>
                                    <Text strong>{stats.contactForms.new}</Text>
                                </div>
                                <Progress
                                    percent={stats.contactForms.total > 0 ? (stats.contactForms.new / stats.contactForms.total) * 100 : 0}
                                    strokeColor="#3b82f6"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Read</Text>
                                    <Text strong>{stats.contactForms.read}</Text>
                                </div>
                                <Progress
                                    percent={stats.contactForms.total > 0 ? (stats.contactForms.read / stats.contactForms.total) * 100 : 0}
                                    strokeColor="#f59e0b"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Responded</Text>
                                    <Text strong>{stats.contactForms.responded}</Text>
                                </div>
                                <Progress
                                    percent={stats.contactForms.total > 0 ? (stats.contactForms.responded / stats.contactForms.total) * 100 : 0}
                                    strokeColor="#10b981"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] h-full">
                        <div className="flex items-center justify-between mb-4">
                            <Title level={4} className="m-0">Schedule Visits</Title>
                            <Button
                                type="primary"
                                onClick={() => navigate('/schedule-visits')}
                                size="middle"
                                className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                            >
                                View All
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Pending</Text>
                                    <Text strong>{stats.scheduleVisits.pending}</Text>
                                </div>
                                <Progress
                                    percent={stats.scheduleVisits.total > 0 ? (stats.scheduleVisits.pending / stats.scheduleVisits.total) * 100 : 0}
                                    strokeColor="#f59e0b"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Confirmed</Text>
                                    <Text strong>{stats.scheduleVisits.confirmed}</Text>
                                </div>
                                <Progress
                                    percent={stats.scheduleVisits.total > 0 ? (stats.scheduleVisits.confirmed / stats.scheduleVisits.total) * 100 : 0}
                                    strokeColor="#3b82f6"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Completed</Text>
                                    <Text strong>{stats.scheduleVisits.completed}</Text>
                                </div>
                                <Progress
                                    percent={stats.scheduleVisits.total > 0 ? (stats.scheduleVisits.completed / stats.scheduleVisits.total) * 100 : 0}
                                    strokeColor="#10b981"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] h-full">
                        <div className="flex items-center justify-between mb-4">
                            <Title level={4} className="m-0">Video Chats</Title>
                            <Button
                                type="primary"
                                onClick={() => navigate('/video-chats')}
                                size="middle"
                                className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-purple-500 to-indigo-600 border-[#8b5cf6] text-white shadow-[0_2px_4px_rgba(139,92,246,0.2)] hover:from-indigo-600 hover:to-purple-700 hover:border-[#7c3aed] hover:shadow-[0_4px_8px_rgba(139,92,246,0.3)]"
                            >
                                View All
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Pending</Text>
                                    <Text strong>{stats.videoChats.pending}</Text>
                                </div>
                                <Progress
                                    percent={stats.videoChats.total > 0 ? (stats.videoChats.pending / stats.videoChats.total) * 100 : 0}
                                    strokeColor="#f59e0b"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Confirmed</Text>
                                    <Text strong>{stats.videoChats.confirmed}</Text>
                                </div>
                                <Progress
                                    percent={stats.videoChats.total > 0 ? (stats.videoChats.confirmed / stats.videoChats.total) * 100 : 0}
                                    strokeColor="#8b5cf6"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Text>Completed</Text>
                                    <Text strong>{stats.videoChats.completed}</Text>
                                </div>
                                <Progress
                                    percent={stats.videoChats.total > 0 ? (stats.videoChats.completed / stats.videoChats.total) * 100 : 0}
                                    strokeColor="#10b981"
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Recent and Top Properties */}
            <Row gutter={[16, 16]} className="mb-8">
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div className="flex items-center justify-between">
                                <span>Recent Properties</span>
                                <Button
                                    type="primary"
                                    onClick={() => navigate('/properties')}
                                    size="middle"
                                    className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                                >
                                    View All
                                </Button>
                            </div>
                        }
                        className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] h-full"
                    >
                        <List
                            dataSource={stats.recentProperties}
                            renderItem={(property) => (
                                <List.Item className="px-0">
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                size={48}
                                                src={property.images[0]?.url}
                                                icon={<HomeOutlined />}
                                                className="bg-blue-100 text-blue-600"
                                            />
                                        }
                                        title={
                                            <div className="flex items-center justify-between">
                                                <Text strong className="text-sm">
                                                    {property.title}
                                                </Text>
                                                {property.featured && (
                                                    <StarOutlined className="text-yellow-500 text-xs" />
                                                )}
                                            </div>
                                        }
                                        description={
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">{getTypeIcon(property.type)}</span>
                                                    <Text type="secondary" className="text-xs capitalize">
                                                        {property.type}
                                                    </Text>
                                                    <Tag
                                                        color={getStatusColor(property.status)}
                                                    >
                                                        {property.status.toUpperCase()}
                                                    </Tag>
                                                </div>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>🏠 {property.bedrooms} beds</span>
                                                    <span>🚿 {property.bathrooms} baths</span>
                                                    <span>📍 {property.location?.city}, {property.location?.state}</span>
                                                </div>
                                                <div className="text-sm font-semibold text-green-600">
                                                    ₹{property.price.toLocaleString()}
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                            locale={{ emptyText: 'No recent properties' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div className="flex items-center justify-between">
                                <span>Top Properties by Value</span>
                                <Button
                                    type="primary"
                                    onClick={() => navigate('/properties')}
                                    size="middle"
                                    className="rounded-[8px] font-medium h-10 px-4 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)]"
                                >
                                    View All
                                </Button>
                            </div>
                        }
                        className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] h-full"
                    >
                        <List
                            dataSource={stats.topProperties}
                            renderItem={(property, index) => (
                                <List.Item className="px-0">
                                    <List.Item.Meta
                                        avatar={
                                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-bold">
                                                #{index + 1}
                                            </div>
                                        }
                                        title={
                                            <div className="flex items-center justify-between">
                                                <Text strong className="text-sm">
                                                    {property.title}
                                                </Text>
                                                <ArrowUpOutlined className="text-green-500 text-xs" />
                                            </div>
                                        }
                                        description={
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">{getTypeIcon(property.type)}</span>
                                                    <Text type="secondary" className="text-xs capitalize">
                                                        {property.type}
                                                    </Text>
                                                    <Tag
                                                        color={getStatusColor(property.status)}
                                                    >
                                                        {property.status.toUpperCase()}
                                                    </Tag>
                                                </div>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>🏠 {property.bedrooms} beds</span>
                                                    <span>🚿 {property.bathrooms} baths</span>
                                                    <span>📍 {property.location?.city}, {property.location?.state}</span>
                                                </div>
                                                <div className="text-green-500 flex items-center text-lg font-medium">
                                                    <TbCurrencyRupee className="text-green-600 mr-1" />
                                                    <p className="">{property.price.toLocaleString()} INR</p>
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                            locale={{ emptyText: 'No properties found' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Quick Actions */}
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card className="bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <Title level={4} className="mb-2">Quick Actions</Title>
                                <Text type="secondary">
                                    Manage your properties and view detailed information
                                </Text>
                            </div>
                            <Space>
                                <Button
                                    type="primary"
                                    icon={<HomeOutlined />}
                                    onClick={() => navigate('/properties')}
                                    className="rounded-[8px] font-medium h-12 px-6 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)] text-base"
                                    size="large"
                                >
                                    View Properties
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => navigate('/properties')}
                                    className="rounded-[8px] font-medium h-12 px-6 flex items-center justify-center gap-2 border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 border-[#3b82f6] text-white shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:from-indigo-600 hover:to-blue-700 hover:border-[#2563eb] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)] text-base"
                                    size="large"
                                >
                                    Add Property
                                </Button>
                            </Space>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard; 