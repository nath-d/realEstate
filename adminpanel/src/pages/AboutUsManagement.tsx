import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Tabs, Space, Modal, Table, Popconfirm, Select, InputNumber, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import aboutUsService from '../services/aboutUsService';
import type { AboutUsInfo, AboutUsValue, AboutUsTeamMember } from '../types/aboutUs';
import config from '../../config';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

const AboutUsManagement: React.FC = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState<AboutUsInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [valueForm] = Form.useForm();
  const [teamForm] = Form.useForm();
  const [valueModalVisible, setValueModalVisible] = useState(false);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [editingValue, setEditingValue] = useState<AboutUsValue | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<AboutUsTeamMember | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const iconOptions = [
    { value: 'FaHome', label: 'Home' },
    { value: 'FaUsers', label: 'Users' },
    { value: 'FaHandshake', label: 'Handshake' },
    { value: 'FaChartLine', label: 'Chart Line' },
    { value: 'FaBuilding', label: 'Building' },
    { value: 'FaAward', label: 'Award' },
    { value: 'FaHeart', label: 'Heart' },
    { value: 'FaLightbulb', label: 'Lightbulb' }
  ];

  useEffect(() => {
    fetchAboutUsInfo();
  }, []);

  const fetchAboutUsInfo = async () => {
    try {
      setLoading(true);
      const data = await aboutUsService.getAboutUsInfo();
      setAboutUsInfo(data);
      form.setFieldsValue(data);
      return data; // Return the data for immediate use
    } catch (error) {
      console.error('Error fetching about us info:', error);
      message.error('Failed to fetch about us information');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAboutUsInfo = async (values: any) => {
    try {
      setLoading(true);
      if (aboutUsInfo && aboutUsInfo.id > 0) {
        // Update existing record
        await aboutUsService.updateAboutUsInfo(aboutUsInfo.id, values);
        message.success('About Us information updated successfully');
      } else {
        // This will either create a new record or update existing one (upsert behavior)
        await aboutUsService.createAboutUsInfo(values);
        message.success('About Us information saved successfully');
      }
      fetchAboutUsInfo();
    } catch (error) {
      console.error('Error saving about us info:', error);
      message.error('Failed to save about us information');
    } finally {
      setLoading(false);
    }
  };

  const handleAddValue = () => {
    setEditingValue(null);
    valueForm.resetFields();
    setValueModalVisible(true);
  };

  const handleEditValue = (value: AboutUsValue) => {
    setEditingValue(value);
    valueForm.setFieldsValue(value);
    setValueModalVisible(true);
  };

  const handleSaveValue = async (values: any) => {
    try {
      // Convert order to number and provide default if empty
      const processedValues = {
        ...values,
        order: values.order ? parseInt(values.order, 10) : 0
      };

      // Ensure we have the latest aboutUsInfo data
      let currentAboutUsInfo = aboutUsInfo;
      if (!currentAboutUsInfo || !currentAboutUsInfo.id) {
        console.log('No aboutUsInfo found, fetching latest data...');
        currentAboutUsInfo = await fetchAboutUsInfo();
        if (!currentAboutUsInfo || !currentAboutUsInfo.id) {
          throw new Error('Unable to get About Us information. Please refresh the page.');
        }
      }

      if (editingValue) {
        await aboutUsService.updateValue(editingValue.id, processedValues);
        message.success('Value updated successfully');
      } else {
        console.log('Creating value with aboutUsInfoId:', currentAboutUsInfo.id);
        await aboutUsService.createValue({
          ...processedValues,
          aboutUsInfoId: currentAboutUsInfo.id
        });
        message.success('Value added successfully');
      }
      setValueModalVisible(false);
      fetchAboutUsInfo();
    } catch (error) {
      console.error('Error saving value:', error);
      message.error('Failed to save value');
    }
  };

  const handleDeleteValue = async (id: number) => {
    try {
      await aboutUsService.deleteValue(id);
      message.success('Value deleted successfully');
      fetchAboutUsInfo();
    } catch (error) {
      console.error('Error deleting value:', error);
      message.error('Failed to delete value');
    }
  };

  const handleAddTeamMember = () => {
    setEditingTeamMember(null);
    teamForm.resetFields();
    setImageUrl('');
    setTeamModalVisible(true);
  };

  const handleEditTeamMember = (member: AboutUsTeamMember) => {
    setEditingTeamMember(member);
    teamForm.setFieldsValue(member);
    setImageUrl(member.imageUrl || '');
    setTeamModalVisible(true);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${config.api.baseUrl}/upload/image`, {
        method: 'POST',
        headers: {
          'x-admin-key': config.admin.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      if (result.success && result.data.url) {
        setImageUrl(result.data.url);
        teamForm.setFieldsValue({ imageUrl: result.data.url });
        message.success('Image uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
    
    return false; // Prevent default upload behavior
  };

  const handleSaveTeamMember = async (values: any) => {
    try {
      // Convert order to number and provide default if empty
      // Clean up URL fields - remove empty strings to make them undefined
      const processedValues = {
        ...values,
        order: values.order ? parseInt(values.order, 10) : 0,
        linkedinUrl: values.linkedinUrl && values.linkedinUrl.trim() !== '' ? values.linkedinUrl : undefined,
        twitterUrl: values.twitterUrl && values.twitterUrl.trim() !== '' ? values.twitterUrl : undefined
      };

      // Ensure we have the latest aboutUsInfo data
      let currentAboutUsInfo = aboutUsInfo;
      if (!currentAboutUsInfo || !currentAboutUsInfo.id) {
        console.log('No aboutUsInfo found, fetching latest data...');
        currentAboutUsInfo = await fetchAboutUsInfo();
        if (!currentAboutUsInfo || !currentAboutUsInfo.id) {
          throw new Error('Unable to get About Us information. Please refresh the page.');
        }
      }

      if (editingTeamMember) {
        await aboutUsService.updateTeamMember(editingTeamMember.id, processedValues);
        message.success('Team member updated successfully');
      } else {
        const createData = {
          ...processedValues,
          aboutUsInfoId: currentAboutUsInfo.id
        };
        await aboutUsService.createTeamMember(createData);
        message.success('Team member added successfully');
      }
      setTeamModalVisible(false);
      setImageUrl('');
      fetchAboutUsInfo();
    } catch (error) {
      console.error('Error saving team member:', error);
      message.error('Failed to save team member');
    }
  };

  const handleDeleteTeamMember = async (id: number) => {
    try {
      await aboutUsService.deleteTeamMember(id);
      message.success('Team member deleted successfully');
      fetchAboutUsInfo();
    } catch (error) {
      console.error('Error deleting team member:', error);
      message.error('Failed to delete team member');
    }
  };

  const valueColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: AboutUsValue) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditValue(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this value?"
            onConfirm={() => handleDeleteValue(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const teamColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: AboutUsTeamMember) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditTeamMember(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this team member?"
            onConfirm={() => handleDeleteTeamMember(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">About Us Management</h1>
      
      <Tabs defaultActiveKey="1">
        <TabPane tab="General Information" key="1">
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveAboutUsInfo}
              loading={loading}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="heroTitle"
                  label="Hero Title"
                  rules={[{ required: true, message: 'Please enter hero title' }]}
                >
                  <Input placeholder="About Us" />
                </Form.Item>

                <Form.Item
                  name="heroSubtitle"
                  label="Hero Subtitle"
                >
                  <Input placeholder="Building dreams into reality..." />
                </Form.Item>

                <Form.Item
                  name="heroBackgroundUrl"
                  label="Hero Background Image URL"
                >
                  <Input placeholder="https://..." />
                </Form.Item>

                <Form.Item
                  name="storyTitle"
                  label="Story Section Title"
                >
                  <Input placeholder="Our Story" />
                </Form.Item>
              </div>

              <Form.Item
                name="storyParagraph1"
                label="Story Paragraph 1"
              >
                <TextArea rows={4} placeholder="First paragraph of your story..." />
              </Form.Item>

              <Form.Item
                name="storyParagraph2"
                label="Story Paragraph 2"
              >
                <TextArea rows={4} placeholder="Second paragraph of your story..." />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="valuesTitle"
                  label="Values Section Title"
                >
                  <Input placeholder="Our Values" />
                </Form.Item>

                <Form.Item
                  name="valuesSubtitle"
                  label="Values Section Subtitle"
                >
                  <Input placeholder="The principles that guide our work" />
                </Form.Item>

                <Form.Item
                  name="teamTitle"
                  label="Team Section Title"
                >
                  <Input placeholder="Our Team" />
                </Form.Item>

                <Form.Item
                  name="ctaTitle"
                  label="Call to Action Title"
                >
                  <Input placeholder="Ready to Start Your Journey?" />
                </Form.Item>
              </div>

              <Form.Item
                name="teamDescription"
                label="Team Section Description"
              >
                <TextArea rows={3} placeholder="Description for team section..." />
              </Form.Item>

              <Form.Item
                name="ctaDescription"
                label="Call to Action Description"
              >
                <TextArea rows={3} placeholder="Call to action description..." />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="ctaButtonText"
                  label="CTA Button Text"
                >
                  <Input placeholder="Contact Us Today" />
                </Form.Item>

                <Form.Item
                  name="ctaButtonLink"
                  label="CTA Button Link"
                >
                  <Input placeholder="/contact" />
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="Values" key="2">
          <Card
            title="Company Values"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddValue}>
                Add Value
              </Button>
            }
          >
            <Table
              columns={valueColumns}
              dataSource={aboutUsInfo?.values || []}
              rowKey="id"
              loading={loading}
            />
          </Card>
        </TabPane>

        <TabPane tab="Team Members" key="3">
          <Card
            title="Team Members"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTeamMember}>
                Add Team Member
              </Button>
            }
          >
            <Table
              columns={teamColumns}
              dataSource={aboutUsInfo?.teamMembers || []}
              rowKey="id"
              loading={loading}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Value Modal */}
      <Modal
        title={editingValue ? 'Edit Value' : 'Add Value'}
        open={valueModalVisible}
        onCancel={() => setValueModalVisible(false)}
        footer={null}
      >
        <Form
          form={valueForm}
          layout="vertical"
          onFinish={handleSaveValue}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input placeholder="Excellence in Service" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Description of the value..." />
          </Form.Item>

          <Form.Item
            name="icon"
            label="Icon"
            rules={[{ required: true, message: 'Please select an icon' }]}
          >
            <Select placeholder="Select an icon">
              {iconOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="order"
            label="Order"
          >
            <InputNumber min={0} placeholder={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingValue ? 'Update' : 'Add'} Value
              </Button>
              <Button onClick={() => setValueModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Team Member Modal */}
      <Modal
        title={editingTeamMember ? 'Edit Team Member' : 'Add Team Member'}
        open={teamModalVisible}
        onCancel={() => {
          setTeamModalVisible(false);
          setImageUrl('');
        }}
        footer={null}
        width={600}
      >
        <Form
          form={teamForm}
          layout="vertical"
          onFinish={handleSaveTeamMember}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input placeholder="John Smith" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please enter role' }]}
            >
              <Input placeholder="Founder & CEO" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Brief description about the team member..." />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Team Member Image"
            rules={[
              { required: true, message: 'Please upload an image' }
            ]}
          >
            <div>
              <Upload
                beforeUpload={handleImageUpload}
                showUploadList={false}
                accept="image/*"
                disabled={uploading}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
              </Upload>
              {imageUrl && (
                <div style={{ marginTop: 8 }}>
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    style={{ 
                      width: 100, 
                      height: 100, 
                      objectFit: 'cover', 
                      borderRadius: 8,
                      border: '1px solid #d9d9d9'
                    }} 
                  />
                  <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                    Image uploaded successfully
                  </div>
                </div>
              )}
              <Input 
                value={imageUrl} 
                style={{ display: 'none' }} 
                onChange={() => {}} // Controlled by upload
              />
            </div>
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="linkedinUrl"
              label="LinkedIn URL (Optional)"
              rules={[
                { type: 'url', message: 'Please enter a valid URL' }
              ]}
            >
              <Input placeholder="https://linkedin.com/in/username (optional)" />
            </Form.Item>

            <Form.Item
              name="twitterUrl"
              label="Twitter URL (Optional)"
              rules={[
                { type: 'url', message: 'Please enter a valid URL' }
              ]}
            >
              <Input placeholder="https://twitter.com/username (optional)" />
            </Form.Item>
          </div>

          <Form.Item
            name="order"
            label="Order"
          >
            <InputNumber min={0} placeholder={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingTeamMember ? 'Update' : 'Add'} Team Member
              </Button>
              <Button onClick={() => setTeamModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AboutUsManagement;
