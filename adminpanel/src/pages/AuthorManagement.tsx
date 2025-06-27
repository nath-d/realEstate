import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal, Form, Input, message } from 'antd';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../services/blogService';
import type { BlogAuthor, CreateAuthorData } from '../services/blogTypes';

const AuthorManagement: React.FC = () => {
    const [authors, setAuthors] = useState<BlogAuthor[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<BlogAuthor | null>(null);

    const fetchAuthors = async () => {
        setLoading(true);
        try {
            const data = await getAuthors();
            setAuthors(data);
        } catch (e) {
            message.error('Failed to fetch authors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const handleAdd = () => {
        setEditingAuthor(null);
        setModalVisible(true);
    };

    const handleEdit = (author: BlogAuthor) => {
        setEditingAuthor(author);
        setModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAuthor(id);
            message.success('Author deleted');
            fetchAuthors();
        } catch {
            message.error('Failed to delete author');
        }
    };

    const handleFormSubmit = async (values: CreateAuthorData) => {
        try {
            if (editingAuthor) {
                await updateAuthor(editingAuthor.id, values);
                message.success('Author updated');
            } else {
                await createAuthor(values);
                message.success('Author created');
            }
            setModalVisible(false);
            fetchAuthors();
        } catch {
            message.error('Failed to save author');
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Bio', dataIndex: 'bio', key: 'bio' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BlogAuthor) => (
                <>
                    <Button onClick={() => handleEdit(record)} type="link">Edit</Button>
                    <Button onClick={() => handleDelete(record.id)} type="link" danger>Delete</Button>
                </>
            )
        },
    ];

    return (
        <Card title="Author Management" extra={<Button type="primary" onClick={handleAdd}>Add Author</Button>}>
            <Table columns={columns} dataSource={authors} rowKey="id" loading={loading} />
            <Modal open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} destroyOnClose>
                <Form initialValues={editingAuthor || {}} onFinish={handleFormSubmit} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="bio" label="Bio">
                        <Input.TextArea rows={2} />
                    </Form.Item>
                    <Form.Item name="avatar" label="Avatar URL">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default AuthorManagement; 