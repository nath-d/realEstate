import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Upload, message, Space, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import whyChooseUsService from '../services/whyChooseUsService';
import type { WhyReasonDTO } from '../services/whyChooseUsService';
import { cloudinaryService } from '../services/cloudinaryService';

const WhyChooseUsManagement: React.FC = () => {
    const [data, setData] = useState<WhyReasonDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<WhyReasonDTO | null>(null);
    const [form] = Form.useForm<WhyReasonDTO>();
    const [fileList, setFileList] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const res = await whyChooseUsService.listAll();
            setData(res);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []);

    const openAdd = () => {
        setEditing(null);
        form.resetFields();
        // No default fields needed
        setFileList([]);
        setModalOpen(true);
    };

    const openEdit = (record: WhyReasonDTO) => {
        setEditing(record);
        form.setFieldsValue(record);
        setFileList(record.bgImageUrl ? [{ uid: '-1', name: 'bg', status: 'done', url: record.bgImageUrl }] : []);
        setModalOpen(true);
    };

    const handleUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;
        try {
            setUploading(true);
            const res = await cloudinaryService.uploadImage(file);
            const url = res.data.url;
            file.status = 'done';
            file.response = { data: res.data };
            file.url = url;
            onSuccess({ data: res.data }, file);
            setFileList([file]);
            form.setFieldValue('bgImageUrl', url);
            message.success('Image uploaded');
        } catch (e) {
            onError(e);
            message.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const onUploadChange = (info: any) => {
        const { fileList: fl, file } = info;
        setFileList(fl);
        if (file.status === 'done') {
            const url = file.url || file.response?.data?.url;
            if (url) form.setFieldValue('bgImageUrl', url);
        }
        if (file.status === 'removed') {
            form.setFieldValue('bgImageUrl', undefined);
        }
    };

    const submit = async () => {
        const values = await form.validateFields();
        if (editing?.id) {
            await whyChooseUsService.update(editing.id, values);
            message.success('Updated');
        } else {
            await whyChooseUsService.create(values);
            message.success('Created');
        }
        setModalOpen(false);
        setEditing(null);
        form.resetFields();
        fetchAll();
    };

    const remove = async (id: number) => {
        await whyChooseUsService.remove(id);
        message.success('Deleted');
        fetchAll();
    };

    const columns = [
        { title: 'Title', dataIndex: 'title' },
        { title: 'Stat', dataIndex: 'stat', width: 120 },
        { title: 'Stat Text', dataIndex: 'statText', width: 160 },
        { title: 'Icon', dataIndex: 'icon', width: 140 },
        {
            title: 'Actions', width: 160, render: (_: any, record: WhyReasonDTO) => (
                <Space>
                    <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)}>Edit</Button>
                    <Button size="small" danger icon={<DeleteOutlined />} onClick={() => remove(record.id!)}>Delete</Button>
                </Space>
            )
        },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                <Card title="Why Choose Us" extra={<Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add</Button>}>
                    <Table rowKey={(r) => String(r.id)} loading={loading} columns={columns as any} dataSource={data} pagination={false} />
                </Card>

                <Modal open={modalOpen} onCancel={() => setModalOpen(false)} onOk={submit} destroyOnClose title={editing ? 'Edit Reason' : 'Add Reason'} okButtonProps={{ className: 'bg-blue-600' }}>
                    <Form form={form} layout="vertical" className="mt-4">
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                        <Form.Item name="stat" label="Stat">
                            <Input placeholder="e.g., 20+" />
                        </Form.Item>
                        <Form.Item name="statText" label="Stat Text">
                            <Input placeholder="e.g., Years of Excellence" />
                        </Form.Item>
                        <Form.Item name="icon" label="Icon">
                            <Select placeholder="Select an icon">
                                <Select.Option value="shield">Shield</Select.Option>
                                <Select.Option value="star">Star</Select.Option>
                                <Select.Option value="award">Award</Select.Option>
                                <Select.Option value="building">Building</Select.Option>
                                <Select.Option value="graph">Graph</Select.Option>
                                <Select.Option value="support">Support</Select.Option>
                                <Select.Option value="innovation">Innovation</Select.Option>
                                <Select.Option value="trust">Trust</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="bgImageUrl" label="Background Image URL">
                            <Input placeholder="https://..." />
                        </Form.Item>
                        <Form.Item label="Upload Background Image">
                            <Upload
                                name="bg"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onUploadChange}
                                customRequest={handleUpload}
                                accept="image/*"
                                maxCount={1}
                            >
                                {fileList.length >= 1 ? null : (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <UploadOutlined className="text-gray-400 text-lg mb-1" />
                                        <div className="text-xs text-gray-500">{uploading ? 'Uploading...' : 'Upload'}</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default WhyChooseUsManagement;


