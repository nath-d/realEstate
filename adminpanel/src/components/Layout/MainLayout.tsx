import { Avatar, Dropdown, Space, Badge, Button, Typography, Spin } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined, LogoutOutlined, MenuOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import { useState, useEffect, useMemo } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { markContactAsRead } from '../../services/notificationService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Text } = Typography;

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const { counts, items, loading, refresh } = useNotifications();
    const { user, logout } = useAuth();

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

    const onUserMenuClick = ({ key }: { key: string }) => {
        if (key === 'logout') {
            logout();
            navigate('/login');
        } else if (key === 'profile') {
            // Handle profile navigation
            console.log('Profile clicked');
        } else if (key === 'settings') {
            // Handle settings navigation
            console.log('Settings clicked');
        }
    };

    const notificationMenuItems = useMemo(() => {
        const header = {
            key: 'header',
            disabled: true,
            label: (
                <div className="flex items-center justify-between px-1">
                    <span className="font-semibold">Notifications</span>
                    <Badge count={counts.total} size="small" />
                </div>
            ),
        } as const

        if (loading) {
            return [
                header,
                { type: 'divider' as const },
                {
                    key: 'loading',
                    disabled: true,
                    label: (
                        <div className="flex items-center justify-center py-2">
                            <Spin size="small" />
                            <span className="ml-2 text-gray-500">Loading…</span>
                        </div>
                    ),
                },
            ]
        }

        const list = items.map((n) => ({
            key: `${n.type}-${n.id}`,
            icon: n.type === 'contact' ? <MailOutlined className="text-blue-500" /> : <CalendarOutlined className="text-orange-500" />,
            label: (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-sm">{n.title}</span>
                    {n.description && (
                        <span className="text-xs text-gray-500 line-clamp-1">{n.description}</span>
                    )}
                </div>
            ),
        }))

        const footer = [
            { type: 'divider' as const },
            {
                key: 'mark-all-read',
                label: 'Mark all contacts as read',
                icon: <MailOutlined />,
            },
            { type: 'divider' as const },
            {
                key: 'view-contact',
                label: (
                    <div className="flex items-center justify-between">
                        <span>Contact Forms</span>
                        <Badge count={counts.contactNew} size="small" />
                    </div>
                ),
                icon: <MailOutlined />,
            },
            {
                key: 'view-visit',
                label: (
                    <div className="flex items-center justify-between">
                        <span>Schedule Visits</span>
                        <Badge count={counts.visitPending} size="small" />
                    </div>
                ),
                icon: <CalendarOutlined />,
            },
            {
                type: 'divider' as const,
            },
            {
                key: 'refresh',
                label: 'Refresh',
            },
        ]

        return [header, { type: 'divider' as const }, ...list, ...footer]
    }, [counts.contactNew, counts.total, counts.visitPending, items, loading])

    const onNotificationMenuClick = async ({ key }: { key: string }) => {
        if (key === 'refresh') {
            await refresh()
            return
        }
        if (key === 'mark-all-read') {
            // mark all contact notifications as read
            const contactIds = items.filter(i => i.type === 'contact').map(i => i.id)
            await Promise.all(contactIds.map(id => markContactAsRead(id)))
            await refresh()
            return
        }
        if (key === 'view-contact') {
            navigate('/contact-forms')
            return
        }
        if (key === 'view-visit') {
            navigate('/schedule-visits')
            return
        }
        if (key.startsWith('contact-')) {
            const id = Number(key.split('-')[1])
            if (!Number.isNaN(id)) {
                // Navigate with highlight state
                navigate('/contact-forms', { state: { highlight: { type: 'contact', id } } })
                await markContactAsRead(id)
                await refresh()
            } else {
                navigate('/contact-forms')
            }
            return
        }
        if (key.startsWith('visit-')) {
            const id = Number(key.split('-')[1])
            if (!Number.isNaN(id)) {
                navigate('/schedule-visits', { state: { highlight: { type: 'visit', id } } })
            } else {
                navigate('/schedule-visits')
            }
            return
        }
    }

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
                            <span className="text-lg font-semibold text-gray-800">MG Constructions Admin</span>
                            <span className="text-sm text-gray-500">Property Management Dashboard</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Dropdown
                            trigger={['click']}
                            placement="bottomRight"
                            menu={{ items: notificationMenuItems as any, onClick: onNotificationMenuClick }}
                            overlayClassName="notification-dropdown"
                            onOpenChange={(open) => { if (open) { refresh() } }}
                        >
                            <Badge count={counts.total} size="small" className="cursor-pointer">
                                <Button
                                    type="text"
                                    icon={<BellOutlined />}
                                    className="text-gray-600 hover:text-blue-500 transition-colors"
                                    size="large"
                                />
                            </Badge>
                        </Dropdown>
                        <Dropdown
                            menu={{ items: userMenuItems, onClick: onUserMenuClick }}
                            placement="bottomRight"
                            trigger={['click']}
                            overlayClassName="user-dropdown"
                        >
                            <Space className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <Avatar
                                    src={user?.avatar}
                                    icon={<UserOutlined />}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600"
                                    size="default"
                                />
                                <div className="hidden sm:flex flex-col items-start">
                                    <span className="text-sm font-medium text-gray-700">
                                        {user ? `${user.firstName} ${user.lastName}` : 'Admin User'}
                                    </span>
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