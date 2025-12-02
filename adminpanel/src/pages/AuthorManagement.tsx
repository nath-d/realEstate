import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal, message, Popconfirm, Tag, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../services/blogService';
import AuthorForm from '../components/AuthorForm';
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
            message.success('Author deleted successfully');
            fetchAuthors();
        } catch (error: any) {
            if (error.response?.status === 400) {
                message.error('Cannot delete author with associated blogs');
            } else {
                message.error('Failed to delete author');
            }
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
        {
            title: 'Avatar',
            key: 'avatar',
            render: (_: any, record: BlogAuthor) => (
                <Avatar 
                    size={40} 
                    src={record.avatar} 
                    icon={<UserOutlined />}
                />
            )
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { 
            title: 'Bio', 
            dataIndex: 'bio', 
            key: 'bio',
            render: (bio: string) => bio ? (bio.length > 50 ? `${bio.substring(0, 50)}...` : bio) : '-'
        },
        {
            title: 'Blogs',
            key: 'blogs',
            render: (_: any, record: BlogAuthor) => (
                <Tag color={(record._count?.blogs || 0) > 0 ? 'blue' : 'default'}>
                    {record._count?.blogs || 0} blogs
                </Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BlogAuthor) => (
                <>
                    <Button onClick={() => handleEdit(record)} type="link">Edit</Button>
                    <Popconfirm
                        title="Delete Author"
                        description={
                            (record._count?.blogs || 0) > 0
                                ? `This author has ${record._count?.blogs || 0} associated blog(s). Deleting the author will also delete all associated blogs. Are you sure?`
                                : "Are you sure you want to delete this author?"
                        }
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        okType="danger"
                    >
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </>
            )
        },
    ];

    return (
        <Card title="Author Management" extra={<Button type="primary" onClick={handleAdd}>Add Author</Button>}>
            <Table columns={columns} dataSource={authors} rowKey="id" loading={loading} />
            <Modal 
                open={modalVisible} 
                onCancel={() => setModalVisible(false)} 
                footer={null} 
                destroyOnClose
                title={editingAuthor ? 'Edit Author' : 'Add New Author'}
                width={600}
            >
                <AuthorForm
                    initialValues={editingAuthor || undefined}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setModalVisible(false)}
                />
            </Modal>
        </Card>
    );
};

export default AuthorManagement; 