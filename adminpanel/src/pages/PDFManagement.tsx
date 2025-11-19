import React, { useState, useEffect } from 'react';
import config from '../../config';
import { Card, Button, Table, Modal, Form, Input, Select, Upload, message, Popconfirm, Tag, Progress } from 'antd';
import { UploadOutlined, DeleteOutlined, DownloadOutlined, FilePdfOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

interface PDF {
    id: number;
    name: string;
    filename: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    description?: string | null;
    category: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const categoryOptions = [
    { value: 'welcome-guide', label: 'Welcome Guide' },
    { value: 'property-guide', label: 'Property Guide' },
    { value: 'investment-tips', label: 'Investment Tips' },
    { value: 'other', label: 'Other' },
];

const PDFManagement: React.FC = () => {
    const [pdfs, setPDFs] = useState<PDF[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [form] = Form.useForm();

    const fetchPDFs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${config.api.baseUrl}/pdfs/list`);
            setPDFs(res.data.pdfs);
        } catch (e) {
            message.error('Failed to fetch PDFs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPDFs();
    }, []);

    const handleUpload = async (values: any) => {
        console.log('Form values:', values); // Debug log

        if (!values.name || !values.category || !values.file) {
            message.error('Please fill in all required fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('category', values.category);
        if (values.description) {
            formData.append('description', values.description);
        }

        // Handle file upload properly
        const file = values.file?.fileList?.[0]?.originFileObj || values.file?.originFileObj;
        if (!file) {
            message.error('Please select a PDF file');
            return;
        }

        formData.append('file', file);

        setUploading(true);
        setUploadProgress(0);

        try {
            const response = await axios.post(`${config.api.baseUrl}/pdfs/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                    }
                },
            });

            console.log('Upload response:', response.data); // Debug log
            message.success('PDF uploaded successfully');
            setModalVisible(false);
            form.resetFields();
            fetchPDFs();
        } catch (e: any) {
            console.error('Upload error:', e); // Debug log
            const errorMessage = e?.response?.data?.message || e?.message || 'Upload failed';
            message.error(errorMessage);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${config.api.baseUrl}/pdfs/${id}`);
            message.success('PDF deleted');
            fetchPDFs();
        } catch {
            message.error('Failed to delete PDF');
        }
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: PDF) => (
                <span><FilePdfOutlined className="text-red-500 mr-2" />{text}</span>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (cat: string) => {
                const found = categoryOptions.find(c => c.value === cat);
                return <Tag color="blue">{found?.label || cat}</Tag>;
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (desc: string | null) => desc || <span className="text-gray-400">No description</span>,
        },
        {
            title: 'Uploaded',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: PDF) => (
                <>
                    <Button
                        icon={<DownloadOutlined />}
                        type="link"
                        href={`${config.api.baseUrl}/pdfs/download/${record.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download
                    </Button>
                    <Popconfirm
                        title="Delete PDF"
                        description="Are you sure you want to delete this PDF? This action cannot be undone."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        okType="danger"
                    >
                        <Button icon={<DeleteOutlined />} type="link" danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <Card title="PDF Management" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>Upload PDF</Button>}>
            <Table columns={columns} dataSource={pdfs} rowKey="id" loading={loading} />
            <Modal
                open={modalVisible}
                onCancel={handleModalCancel}
                footer={null}
                destroyOnClose
                title="Upload PDF"
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpload}
                    initialValues={{
                        name: '',
                        category: undefined,
                        description: '',
                        file: undefined
                    }}
                >
                    <Form.Item
                        name="name"
                        label="PDF Name"
                        rules={[{ required: true, message: 'Please enter a name for the PDF' }]}
                    >
                        <Input placeholder="Enter PDF name" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select placeholder="Select a category" options={categoryOptions} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea rows={3} placeholder="Enter description (optional)" />
                    </Form.Item>

                    <Form.Item
                        name="file"
                        label="PDF File"
                        rules={[{ required: true, message: 'Please select a PDF file' }]}
                        extra="Only PDF files are allowed. Max size 10MB."
                    >
                        <Upload
                            beforeUpload={() => false}
                            accept=".pdf,application/pdf"
                            maxCount={1}
                            showUploadList={true}
                            listType="text"
                        >
                            <Button icon={<UploadOutlined />}>Select PDF</Button>
                        </Upload>
                    </Form.Item>

                    {uploading && (
                        <div className="mb-4">
                            <Progress percent={uploadProgress} status="active" />
                            <div className="text-center text-sm text-gray-500 mt-2">
                                Uploading... {uploadProgress}%
                            </div>
                        </div>
                    )}

                    <Form.Item className="mb-0">
                        <div className="flex justify-end space-x-2">
                            <Button onClick={handleModalCancel}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload PDF'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default PDFManagement; 