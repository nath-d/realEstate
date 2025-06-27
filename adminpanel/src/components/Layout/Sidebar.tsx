import { Layout, Menu, Button, Typography } from 'antd';
import {
    DashboardOutlined,
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    FileOutlined,
    TeamOutlined,
    BarChartOutlined,
    ShoppingOutlined,
    MessageOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
    isMobile: boolean;
}

const Sidebar = ({ collapsed, onCollapse, isMobile }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'properties',
            icon: <HomeOutlined />,
            label: 'Properties',
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: 'Users',
        },
        {
            key: 'team',
            icon: <TeamOutlined />,
            label: 'Team',
        },
        {
            key: 'analytics',
            icon: <BarChartOutlined />,
            label: 'Analytics',
        },
        {
            key: 'orders',
            icon: <ShoppingOutlined />,
            label: 'Orders',
        },
        {
            key: 'messages',
            icon: <MessageOutlined />,
            label: 'Messages',
        },
        {
            key: 'files',
            icon: <FileOutlined />,
            label: 'Files',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
    ];

    const currentPath = location.pathname.split('/')[1] || 'dashboard';

    return (
        <Sider
            theme="light"
            className={`h-screen border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300 ${isMobile ? 'fixed z-50' : ''}`}
            width={280}
            collapsed={collapsed}
            collapsible
            trigger={null}
            breakpoint="lg"
            collapsedWidth={isMobile ? 0 : 80}
        >
            {/* Logo/Brand Section */}
            <div className="h-16 flex items-center justify-between border-b border-gray-200 flex-shrink-0 px-6">
                {!collapsed ? (
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <EnvironmentOutlined className="text-white text-lg" />
                        </div>
                        <div className="flex flex-col">
                            <Text className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent m-0">
                                Real Estate
                            </Text>
                            <Text className="text-xs text-gray-500 m-0">
                                Admin Panel
                            </Text>
                        </div>
                    </div>
                ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto">
                        <EnvironmentOutlined className="text-white text-lg" />
                    </div>
                )}

                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => onCollapse(!collapsed)}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                    size="small"
                />
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto py-4">
                <div className="px-3 mb-4">
                    {!collapsed && (
                        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Navigation
                        </Text>
                    )}
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={[currentPath]}
                    items={menuItems}
                    onClick={({ key }) => {
                        navigate(`/${key}`);
                        if (isMobile) {
                            onCollapse(true);
                        }
                    }}
                    className="border-0 h-full text-gray-600"
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </div>

            {/* Footer Section */}
            {!collapsed && (
                <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
                    <div className="text-center">
                        <Text className="text-xs text-gray-500 block">
                            Version 1.0.0
                        </Text>
                        <Text className="text-xs text-gray-400 block mt-1">
                            © 2024 Real Estate
                        </Text>
                    </div>
                </div>
            )}
        </Sider>
    );
};

export default Sidebar; 