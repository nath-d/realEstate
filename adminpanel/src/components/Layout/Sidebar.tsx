import { Menu, Button, Typography } from 'antd';
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
    BookOutlined,
    TagsOutlined,
    UserAddOutlined,
    CalendarOutlined,
    FilePdfOutlined,
    MailOutlined,
    TrophyOutlined,
    PhoneOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { FaTrophy } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

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
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: 'properties', icon: <HomeOutlined />, label: 'Properties' },
        {
            key: 'forms',
            icon: <PhoneOutlined />,
            label: 'Contact & Schedule Visits',
            children: [
                { key: 'contact-forms', icon: <MessageOutlined />, label: 'Contact Forms' },
                { key: 'schedule-visits', icon: <CalendarOutlined />, label: 'Scheduled Visits' },
            ]
        },
        {
            key: 'blog',
            icon: <BookOutlined />,
            label: 'Blog Management',
            children: [
                { key: 'blogs', icon: <BookOutlined />, label: 'Blog Posts' },
                { key: 'authors', icon: <UserAddOutlined />, label: 'Authors' },
            ]
        },
        { key: 'pdfs', icon: <FileOutlined />, label: 'PDF Management' },
        { key: 'about', icon: <BookOutlined />, label: 'Our Story Section' },
        { key: 'achievements', icon: <TrophyOutlined />, label: 'Certifications' },
        { key: 'why-choose-us', icon: <TagsOutlined />, label: 'Why Choose Us' },
        { key: 'core-strengths', icon: <BarChartOutlined />, label: 'Core Strengths' },
        { key: 'future-vision', icon: <EyeOutlined />, label: 'Future Vision' },
        { key: 'newsletter', icon: <MailOutlined />, label: 'Newsletter' },
        // {
        //     key: 'forms',
        //     icon: <FileOutlined />,
        //     label: 'Form Submissions',
        //     children: [
        //         { key: 'contact-forms', icon: <MessageOutlined />, label: 'Contact Forms' },
        //         { key: 'schedule-visits', icon: <CalendarOutlined />, label: 'Schedule Visits' },
        //     ]
        // },
        // { key: 'users', icon: <UserOutlined />, label: 'Users' },
        // { key: 'team', icon: <TeamOutlined />, label: 'Team' },
        // { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics' },
        // { key: 'orders', icon: <ShoppingOutlined />, label: 'Orders' },
        // { key: 'messages', icon: <MessageOutlined />, label: 'Messages' },
        // { key: 'files', icon: <FileOutlined />, label: 'Files' },
        // { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    ];

    const currentPath = location.pathname.split('/')[1] || 'dashboard';

    return (
        <aside
            className={`
                flex flex-col bg-white border-r border-[#e2e8f0] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] transition-all duration-300
                ${isMobile ? 'fixed z-50 left-0 top-0' : 'sticky top-0 z-40'}
                ${collapsed ? 'w-[80px] min-w-[80px]' : 'w-[280px] min-w-[80px]'}
                h-screen
            `}
            style={{ minWidth: collapsed ? 80 : 300, width: collapsed ? 80 : 300 }}
        >
            {/* Logo/Brand Section */}
            <div className={`h-16 flex items-center justify-between border-b border-[#e2e8f0] flex-shrink-0 ${collapsed ? 'px-2' : 'px-6'}`}>
                {!collapsed ? (
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <EnvironmentOutlined className="text-white text-lg" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MG Constructions</span>
                            <span className="text-xs text-gray-500">Admin Panel</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto">
                        <EnvironmentOutlined className="text-white text-lg" />
                    </div>
                )}
                {!collapsed && (
                    <Button
                        type="text"
                        icon={<MenuFoldOutlined />}
                        onClick={() => onCollapse(true)}
                        className="text-gray-500 hover:text-blue-500 transition-colors"
                        size="small"
                    />
                )}
            </div>
            {/* Navigation Menu */}
            <div className="flex-1 py-4">
                <div className={`${collapsed ? 'px-2' : 'px-3'} mb-4`}>
                    {!collapsed && (
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</span>
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
                    className="border-0 text-gray-600 bg-transparent"
                    style={{ backgroundColor: 'transparent' }}
                    inlineCollapsed={collapsed}
                />
            </div>
            {/* Footer Section */}
            {!collapsed && (
                <div className="p-4 border-t border-[#e2e8f0] flex-shrink-0 bg-[#f8fafc]">
                    <div className="text-center">
                        <span className="text-xs text-gray-500 block">Version 1.0.0</span>
                        <span className="text-xs text-gray-400 block mt-1">© MG Constructions</span>
                    </div>
                </div>
            )}
            {/* Collapsed State Toggle Button */}
            {collapsed && (
                <div className="p-2 border-t border-[#e2e8f0] flex-shrink-0">
                    <Button
                        type="text"
                        icon={<MenuUnfoldOutlined />}
                        onClick={() => onCollapse(false)}
                        className="w-full text-gray-500 hover:text-blue-500 transition-colors"
                        size="small"
                    />
                </div>
            )}
        </aside>
    );
};

export default Sidebar; 