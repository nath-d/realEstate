import { Layout, Menu, Button } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    FileOutlined,
    TeamOutlined,
    BarChartOutlined,
    ShoppingOutlined,
    MessageOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { Sider } = Layout;

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

    return (
        <Sider
            theme="light"
            className={`h-screen border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300 ${isMobile ? 'fixed z-50' : 'relative'
                }`}
            width={260}
            collapsed={collapsed}
            collapsible
            trigger={null}
            breakpoint="lg"
            collapsedWidth={isMobile ? 0 : 80}
        >
            <div className="h-16 flex items-center justify-between border-b border-gray-200 flex-shrink-0 px-6">
                {!collapsed && (
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                )}
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => onCollapse(!collapsed)}
                    className="text-gray-500 hover:text-blue-500"
                />
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
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
            {!collapsed && (
                <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
                    <div className="text-xs text-gray-500 text-center">
                        Version 1.0.0
                    </div>
                </div>
            )}
        </Sider>
    );
};

export default Sidebar; 