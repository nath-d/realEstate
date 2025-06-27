import { Layout, Avatar, Dropdown, Space, Badge, Button, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';

const { Content, Header } = Layout;
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

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            danger: true,
        },
    ];

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Sidebar collapsed={collapsed} onCollapse={setCollapsed} isMobile={isMobile} />
            <Layout className="min-h-screen">
                <Header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                    <div className="flex items-center justify-between h-full px-6">
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
                                <Text className="text-lg font-semibold text-gray-800 m-0">
                                    Real Estate Admin
                                </Text>
                                <Text className="text-sm text-gray-500 m-0">
                                    Property Management Dashboard
                                </Text>
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
                                        <Text className="text-sm font-medium text-gray-700 m-0">
                                            Admin User
                                        </Text>
                                        <Text className="text-xs text-gray-500 m-0">
                                            Administrator
                                        </Text>
                                    </div>
                                </Space>
                            </Dropdown>
                        </div>
                    </div>
                </Header>

                <Content className="bg-gray-50 overflow-auto">
                    <div className="p-6">
                        <div className="w-full">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-120px)]">
                                {children}
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout; 