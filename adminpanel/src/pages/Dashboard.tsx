import { Card, Row, Col, Statistic, Table, Progress, Tag } from 'antd';
import { UserOutlined, FileOutlined, DollarOutlined, ShoppingCartOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const Dashboard = () => {
    // Sample data for the recent activities table
    const recentActivities = [
        {
            key: '1',
            user: 'John Doe',
            action: 'Created new project',
            status: 'success',
            time: '2 hours ago',
        },
        {
            key: '2',
            user: 'Jane Smith',
            action: 'Updated profile',
            status: 'info',
            time: '3 hours ago',
        },
        {
            key: '3',
            user: 'Mike Johnson',
            action: 'Deleted file',
            status: 'error',
            time: '5 hours ago',
        },
    ];

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={
                    status === 'success' ? 'green' :
                        status === 'info' ? 'blue' :
                            'red'
                }>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-500">Dashboard Overview</h1>
                <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
            </div>

            <div className="flex-1 space-y-6">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover:shadow-md transition-shadow h-full">
                            <Statistic
                                title="Total Users"
                                value={1128}
                                prefix={<UserOutlined className="text-blue-500" />}
                                suffix={
                                    <span className="text-green-500 text-sm">
                                        <ArrowUpOutlined /> 12%
                                    </span>
                                }
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover:shadow-md transition-shadow h-full">
                            <Statistic
                                title="Total Files"
                                value={93}
                                prefix={<FileOutlined className="text-purple-500" />}
                                suffix={
                                    <span className="text-red-500 text-sm">
                                        <ArrowDownOutlined /> 3%
                                    </span>
                                }
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover:shadow-md transition-shadow h-full">
                            <Statistic
                                title="Revenue"
                                value={11280}
                                prefix={<DollarOutlined className="text-green-500" />}
                                precision={2}
                                suffix={
                                    <span className="text-green-500 text-sm">
                                        <ArrowUpOutlined /> 8%
                                    </span>
                                }
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover:shadow-md transition-shadow h-full">
                            <Statistic
                                title="Orders"
                                value={93}
                                prefix={<ShoppingCartOutlined className="text-orange-500" />}
                                suffix={
                                    <span className="text-green-500 text-sm">
                                        <ArrowUpOutlined /> 5%
                                    </span>
                                }
                            />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="flex-1">
                    <Col xs={24} lg={12}>
                        <Card title="Storage Usage" className="hover:shadow-md transition-shadow h-full">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Documents</span>
                                        <span>45%</span>
                                    </div>
                                    <Progress percent={45} strokeColor="#1890ff" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Images</span>
                                        <span>30%</span>
                                    </div>
                                    <Progress percent={30} strokeColor="#52c41a" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Videos</span>
                                        <span>15%</span>
                                    </div>
                                    <Progress percent={15} strokeColor="#722ed1" />
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card title="Recent Activities" className="hover:shadow-md transition-shadow h-full">
                            <Table
                                dataSource={recentActivities}
                                columns={columns}
                                pagination={false}
                                size="small"
                                className="h-full"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Dashboard; 