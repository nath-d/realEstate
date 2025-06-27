import { Avatar, Dropdown, Space, Badge, Button, Typography } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';

const { Text } = Typography;

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 992);
            if (window.innerWidth < 992) {
                setCollapsed(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />, label: 'Profile',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />, label: 'Settings',
        },
        { type: 'divider' as const },
        {
            key: 'logout',
            icon: <LogoutOutlined />, label: 'Logout', danger: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar collapsed={collapsed} onCollapse={setCollapsed} isMobile={isMobile} />
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-16 min-h-[64px] py-0 px-6 flex items-center justify-between bg-white border-b border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        {isMobile && (
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className="text-gray-500 hover:text-blue-500 transition-colors"
                                size="large"
                            />
                        )}
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-800">Real Estate Admin</span>
                            <span className="text-sm text-gray-500">Property Management Dashboard</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Badge count={3} size="small" className="cursor-pointer">
                            <Button
                                type="text"
                                icon={<BellOutlined />}
                                className="text-gray-600 hover:text-blue-500 transition-colors"
                                size="large"
                            />
                        </Badge>
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            placement="bottomRight"
                            trigger={['click']}
                            overlayClassName="user-dropdown"
                        >
                            <Space className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <Avatar
                                    icon={<UserOutlined />}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600"
                                    size="default"
                                />
                                <div className="hidden sm:flex flex-col items-start">
                                    <span className="text-sm font-medium text-gray-700">Admin User</span>
                                    <span className="text-xs text-gray-500">Administrator</span>
                                </div>
                            </Space>
                        </Dropdown>
                    </div>
                </header>
                {/* Content */}
                <main className="flex-1 bg-gray-50 overflow-auto">
                    <div className="p-6">
                        <div className="w-full">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-120px)]">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout; 