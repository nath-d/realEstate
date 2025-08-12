import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Table, Modal, Space, Select, message } from 'antd';
import futureVisionService from '../services/futureVisionService';
import type { FutureVisionContentDTO, FutureVisionGoalDTO, FutureVisionTimelineDTO } from '../services/futureVisionService';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

const FutureVisionManagement: React.FC = () => {
    const [contentForm] = Form.useForm<FutureVisionContentDTO>();
    const [goals, setGoals] = useState<FutureVisionGoalDTO[]>([]);
    const [timeline, setTimeline] = useState<FutureVisionTimelineDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [goalModalOpen, setGoalModalOpen] = useState(false);
    const [timelineModalOpen, setTimelineModalOpen] = useState(false);
    const [goalForm] = Form.useForm<FutureVisionGoalDTO>();
    const [timelineForm] = Form.useForm<FutureVisionTimelineDTO>();
    const [editingGoal, setEditingGoal] = useState<FutureVisionGoalDTO | null>(null);
    const [editingTimeline, setEditingTimeline] = useState<FutureVisionTimelineDTO | null>(null);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const content = await futureVisionService.getContent();
            contentForm.setFieldsValue(content);
            setGoals(await futureVisionService.listGoals());
            setTimeline(await futureVisionService.listTimeline());
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, []);

    const saveContent = async () => {
        const values = await contentForm.validateFields();
        await futureVisionService.upsertContent(values);
        message.success('Vision content saved');
    };

    const openAddGoal = () => { setEditingGoal(null); goalForm.resetFields(); setGoalModalOpen(true); };
    const openEditGoal = (g: FutureVisionGoalDTO) => { setEditingGoal(g); goalForm.setFieldsValue(g); setGoalModalOpen(true); };
    const submitGoal = async () => {
        const values = await goalForm.validateFields();
        if (editingGoal?.id) await futureVisionService.updateGoal(editingGoal.id, values); else await futureVisionService.createGoal(values);
        setGoalModalOpen(false); setEditingGoal(null); goalForm.resetFields(); setGoals(await futureVisionService.listGoals());
    };
    const deleteGoal = async (id: number) => { await futureVisionService.removeGoal(id); setGoals(await futureVisionService.listGoals()); };

    const openAddTimeline = () => { setEditingTimeline(null); timelineForm.resetFields(); setTimelineModalOpen(true); };
    const openEditTimeline = (t: FutureVisionTimelineDTO) => { setEditingTimeline(t); timelineForm.setFieldsValue(t); setTimelineModalOpen(true); };
    const submitTimeline = async () => {
        const values = await timelineForm.validateFields();
        if (editingTimeline?.id) await futureVisionService.updateTimeline(editingTimeline.id, values); else await futureVisionService.createTimeline(values);
        setTimelineModalOpen(false); setEditingTimeline(null); timelineForm.resetFields(); setTimeline(await futureVisionService.listTimeline());
    };
    const deleteTimeline = async (id: number) => { await futureVisionService.removeTimeline(id); setTimeline(await futureVisionService.listTimeline()); };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                <Card title="Future Vision" loading={loading} extra={<Button type="primary" icon={<SaveOutlined />} onClick={saveContent}>Save</Button>}>
                    <Form layout="vertical" form={contentForm}>
                        <Form.Item name="visionText" label="Vision Statement">
                            <Input.TextArea rows={5} placeholder="Enter your vision statement..." />
                        </Form.Item>
                    </Form>
                </Card>

                <Card title="Strategic Goals" extra={<Button type="primary" icon={<PlusOutlined />} onClick={openAddGoal}>Add Goal</Button>}>
                    <Table rowKey={(r) => String(r.id)} dataSource={goals} pagination={false} columns={[
                        { title: 'Title', dataIndex: 'title', width: 220 },
                        { title: 'Icon', dataIndex: 'icon', width: 140 },
                        { title: 'Description', dataIndex: 'description' },
                        {
                            title: 'Actions', width: 160, render: (_: any, r: FutureVisionGoalDTO) => (
                                <Space>
                                    <Button size="small" icon={<EditOutlined />} onClick={() => openEditGoal(r)}>Edit</Button>
                                    <Button size="small" danger icon={<DeleteOutlined />} onClick={() => deleteGoal(r.id!)}>Delete</Button>
                                </Space>
                            )
                        },
                    ] as any} />
                </Card>

                <Card title="Growth Timeline" extra={<Button type="primary" icon={<PlusOutlined />} onClick={openAddTimeline}>Add Item</Button>}>
                    <Table rowKey={(r) => String(r.id)} dataSource={timeline} pagination={false} columns={[
                        { title: 'Year', dataIndex: 'year', width: 120 },
                        { title: 'Description', dataIndex: 'description' },
                        {
                            title: 'Actions', width: 160, render: (_: any, r: FutureVisionTimelineDTO) => (
                                <Space>
                                    <Button size="small" icon={<EditOutlined />} onClick={() => openEditTimeline(r)}>Edit</Button>
                                    <Button size="small" danger icon={<DeleteOutlined />} onClick={() => deleteTimeline(r.id!)}>Delete</Button>
                                </Space>
                            )
                        },
                    ] as any} />
                </Card>

                <Modal open={goalModalOpen} onCancel={() => setGoalModalOpen(false)} onOk={submitGoal} destroyOnClose title={editingGoal ? 'Edit Goal' : 'Add Goal'} okButtonProps={{ className: 'bg-blue-600' }}>
                    <Form layout="vertical" form={goalForm} className="mt-4">
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                        <Form.Item name="icon" label="Icon">
                            <Select placeholder="Select an icon">
                                <Select.Option value="globe">Globe</Select.Option>
                                <Select.Option value="monitor">Monitor</Select.Option>
                                <Select.Option value="leaf">Leaf</Select.Option>
                                <Select.Option value="people">People</Select.Option>
                                <Select.Option value="book">Book</Select.Option>
                                <Select.Option value="star">Star</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal open={timelineModalOpen} onCancel={() => setTimelineModalOpen(false)} onOk={submitTimeline} destroyOnClose title={editingTimeline ? 'Edit Timeline Item' : 'Add Timeline Item'} okButtonProps={{ className: 'bg-blue-600' }}>
                    <Form layout="vertical" form={timelineForm} className="mt-4">
                        <Form.Item name="year" label="Year" rules={[{ required: true }]}>
                            <Input placeholder="2025" />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default FutureVisionManagement;


