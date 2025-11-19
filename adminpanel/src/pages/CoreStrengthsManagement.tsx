import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Space, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import coreStrengthService from '../services/coreStrengthService';
import type { CoreStrengthDTO } from '../services/coreStrengthService';

const CoreStrengthsManagement: React.FC = () => {
    const [data, setData] = useState<CoreStrengthDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<CoreStrengthDTO | null>(null);
    const [form] = Form.useForm<CoreStrengthDTO>();

    const fetchAll = async () => {
        setLoading(true);
        try { setData(await coreStrengthService.list()); } finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, []);

    const openAdd = () => { setEditing(null); form.resetFields(); setModalOpen(true); };
    const openEdit = (r: CoreStrengthDTO) => { setEditing(r); form.setFieldsValue(r); setModalOpen(true); };

    const submit = async () => {
        const values = await form.validateFields();
        if (editing?.id) { await coreStrengthService.update(editing.id, values); message.success('Updated'); }
        else { await coreStrengthService.create(values); message.success('Created'); }
        setModalOpen(false); setEditing(null); form.resetFields(); fetchAll();
    };

    const remove = async (id: number) => { await coreStrengthService.remove(id); message.success('Deleted'); fetchAll(); };

    const columns = [
        { title: 'Title', dataIndex: 'title' },
        { title: 'Icon', dataIndex: 'icon', width: 140 },
        { title: 'Description', dataIndex: 'description', ellipsis: true },
        {
            title: 'Actions', width: 160, render: (_: any, r: CoreStrengthDTO) => (
                <Space>
                    <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(r)}>Edit</Button>
                    <Button size="small" danger icon={<DeleteOutlined />} onClick={() => remove(r.id!)}>Delete</Button>
                </Space>
            )
        },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                <Card title="Core Strengths" extra={<Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add</Button>}>
                    <Table rowKey={(r) => String(r.id)} loading={loading} columns={columns as any} dataSource={data} pagination={false} />
                </Card>

                <Modal open={modalOpen} onCancel={() => setModalOpen(false)} onOk={submit} destroyOnClose title={editing ? 'Edit Strength' : 'Add Strength'} okButtonProps={{ className: 'bg-blue-600' }}>
                    <Form form={form} layout="vertical" className="mt-4">
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                        <Form.Item name="icon" label="Icon">
                            <Select placeholder="Select an icon">
                                <Select.Option value="chart">Chart</Select.Option>
                                <Select.Option value="people">People</Select.Option>
                                <Select.Option value="monitor">Monitor</Select.Option>
                                <Select.Option value="eye">Eye</Select.Option>
                                <Select.Option value="bolt">Bolt</Select.Option>
                                <Select.Option value="check">Check</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default CoreStrengthsManagement;


