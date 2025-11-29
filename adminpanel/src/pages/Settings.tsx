import React, { useState, useEffect } from 'react';
import { Card, Tabs, Form, Input, Button, Avatar, Upload, message, Divider, Space, Table, Modal, Select } from 'antd';
import { UserOutlined, LockOutlined, TeamOutlined, EditOutlined, PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';

const { TabPane } = Tabs;
const { Option } = Select;

interface AdminUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export default function Settings() {
  const { user, refreshAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [adminsLoading, setAdminsLoading] = useState(false);
  const [addAdminModalVisible, setAddAdminModalVisible] = useState(false);
  
  // Forms
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [addAdminForm] = Form.useForm();

  useEffect(() => {
    if (user) {
      profileForm.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user, profileForm]);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setAdminsLoading(true);
      const response = await apiService.get('/auth/admins');
      setAdmins(response.admins || []);
    } catch (error) {
      console.error('Failed to load admins:', error);
      message.error('Failed to load admin users');
    } finally {
      setAdminsLoading(false);
    }
  };

  const handleProfileUpdate = async (values: any) => {
    try {
      setLoading(true);
      await apiService.put('/auth/profile', values);
      message.success('Profile updated successfully');
      await refreshAuth(); // Refresh user data
    } catch (error: any) {
      console.error('Profile update failed:', error);
      message.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values: any) => {
    try {
      setLoading(true);
      
      // Only send the fields expected by the ChangePasswordDto
      const passwordData = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        // Don't send confirmPassword - it's only for frontend validation
      };
      
      await apiService.post('/auth/change-password', passwordData);
      message.success('Password changed successfully');
      passwordForm.resetFields();
    } catch (error: any) {
      console.error('Password change failed:', error);
      message.error(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (values: any) => {
    try {
      setLoading(true);
      
      // Only send the fields expected by the SignupDto
      const adminData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        // Don't send confirmPassword - it's only for frontend validation
      };
      
      console.log('Sending admin data:', adminData);
      
      const response = await apiService.post('/auth/admin/create', adminData);
      console.log('Admin creation response:', response);
      
      message.success('Admin user created successfully');
      setAddAdminModalVisible(false);
      addAdminForm.resetFields();
      await loadAdmins(); // Refresh admin list
    } catch (error: any) {
      console.error('Add admin failed:', error);
      message.error(error.message || 'Failed to create admin user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId: number) => {
    if (adminId === user?.id) {
      message.error('You cannot delete your own account');
      return;
    }

    Modal.confirm({
      title: 'Delete Admin User',
      content: 'Are you sure you want to delete this admin user? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await apiService.delete(`/auth/admin/${adminId}`);
          message.success('Admin user deleted successfully');
          await loadAdmins();
        } catch (error: any) {
          console.error('Delete admin failed:', error);
          message.error(error.message || 'Failed to delete admin user');
        }
      },
    });
  };

  const adminColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (record: AdminUser) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.firstName} {record.lastName}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: AdminUser) => (
        <div>
          <div className={`inline-block px-2 py-1 rounded text-xs ${
            record.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {record.isEmailVerified ? 'Verified' : 'Unverified'}
          </div>
        </div>
      ),
    },
    {
      title: 'Last Login',
      key: 'lastLogin',
      render: (record: AdminUser) => (
        <div className="text-sm">
          {record.lastLoginAt 
            ? new Date(record.lastLoginAt).toLocaleDateString()
            : 'Never'
          }
        </div>
      ),
    },
    {
      title: 'Created',
      key: 'created',
      render: (record: AdminUser) => (
        <div className="text-sm">
          {new Date(record.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: AdminUser) => (
        <Space>
          {record.id !== user?.id && (
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteAdmin(record.id)}
              size="small"
            >
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your profile and admin settings</p>
      </div>

      <Tabs defaultActiveKey="profile" size="large">
        <TabPane tab={<span><UserOutlined />Profile</span>} key="profile">
          <div className="max-w-2xl">
            <Card title="Profile Information" className="mb-6">
              <div className="flex items-center mb-6">
                <Avatar size={80} icon={<UserOutlined />} src={user?.avatar} />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                  <p className="text-sm text-blue-600 capitalize">{user?.role}</p>
                </div>
              </div>

              <Form
                form={profileForm}
                layout="vertical"
                onFinish={handleProfileUpdate}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                  >
                    <Input placeholder="Enter first name" />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                  >
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </TabPane>

        <TabPane tab={<span><LockOutlined />Security</span>} key="security">
          <div className="max-w-2xl">
            <Card title="Change Password">
              <Form
                form={passwordForm}
                layout="vertical"
                onFinish={handlePasswordChange}
              >
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true, message: 'Please enter your current password' }]}
                >
                  <Input.Password placeholder="Enter current password" />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: 'Please enter a new password' },
                    { min: 8, message: 'Password must be at least 8 characters' }
                  ]}
                >
                  <Input.Password placeholder="Enter new password" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm New Password"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your new password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm new password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </TabPane>

        <TabPane tab={<span><TeamOutlined />Admin Users</span>} key="admins">
          <Card 
            title="Admin Users" 
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setAddAdminModalVisible(true)}
              >
                Add Admin
              </Button>
            }
          >
            <Table
              columns={adminColumns}
              dataSource={admins}
              rowKey="id"
              loading={adminsLoading}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Add Admin Modal */}
      <Modal
        title="Add New Admin User"
        open={addAdminModalVisible}
        onCancel={() => {
          setAddAdminModalVisible(false);
          addAdminForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={addAdminForm}
          layout="vertical"
          onFinish={handleAddAdmin}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter email address' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <div className="flex justify-end space-x-2">
            <Button onClick={() => {
              setAddAdminModalVisible(false);
              addAdminForm.resetFields();
            }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Admin
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
