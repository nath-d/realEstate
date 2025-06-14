import { Layout, Avatar, Dropdown, Space, Badge, Button } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';

const { Content, Header } = Layout;

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
        <Layout className="min-h-screen h-screen overflow-hidden bg-gray-50">
            <Sidebar collapsed={collapsed} onCollapse={setCollapsed} isMobile={isMobile} />
            <Layout className="h-full overflow-auto">
                <Header className="bg-white px-6 flex items-center justify-between border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center space-x-4">
                        {isMobile && (
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className="text-gray-500 hover:text-blue-500"
                            />
                        )}
                        <div className="text-lg font-semibold text-gray-700">Dashboard</div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Badge count={5} size="small">
                            <BellOutlined className="text-xl text-gray-600 hover:text-blue-500 transition-colors cursor-pointer" />
                        </Badge>
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                            <Space className="cursor-pointer px-3 rounded-lg transition-colors border-gray-200">
                                <Avatar
                                    icon={<UserOutlined />}
                                    className="bg-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin User</span>
                            </Space>
                        </Dropdown>
                    </div>
                </Header>
                <Content className="p-4 sm:p-6">
                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 h-full border border-gray-100">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout; 