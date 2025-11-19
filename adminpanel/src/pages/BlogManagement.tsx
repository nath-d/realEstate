import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal, message, Tag, Popconfirm } from 'antd';
import BlogForm from '../components/BlogForm';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../services/blogService';
import type { Blog, CreateBlogData } from '../services/blogTypes';

const BlogManagement: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const data = await getBlogs();
            setBlogs(data);
        } catch (e) {
            message.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleAdd = () => {
        setEditingBlog(null);
        setModalVisible(true);
    };

    const handleEdit = (blog: Blog) => {
        setEditingBlog(blog);
        setModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteBlog(id);
            message.success('Blog deleted successfully');
            fetchBlogs();
        } catch {
            message.error('Failed to delete blog');
        }
    };

    const handleFormSubmit = async (values: CreateBlogData) => {
        try {
            if (editingBlog) {
                await updateBlog(editingBlog.id, values);
                message.success('Blog updated');
            } else {
                await createBlog(values);
                message.success('Blog created');
            }
            setModalVisible(false);
            fetchBlogs();
        } catch {
            message.error('Failed to save blog');
        }
    };

    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <Tag color={status === 'published' ? 'green' : 'orange'}>{status}</Tag>
        },
        { title: 'Author', dataIndex: ['author', 'name'], key: 'author' },
        {
            title: 'Views',
            key: 'views',
            render: (_: any, record: Blog) => (
                <Tag color="blue">
                    {record._count?.views || 0} views
                </Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Blog) => (
                <>
                    <Button onClick={() => handleEdit(record)} type="link">Edit</Button>
                    <Popconfirm
                        title="Delete Blog"
                        description={
                            (record._count?.views || 0) > 0
                                ? `This blog has ${record._count?.views || 0} view(s). Deleting the blog will also delete all associated views. Are you sure?`
                                : "Are you sure you want to delete this blog? This action cannot be undone."
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
        <Card title="Blog Management" extra={<Button type="primary" onClick={handleAdd}>Add Blog</Button>}>
            <Table columns={columns} dataSource={blogs} rowKey="id" loading={loading} />
            <Modal
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                destroyOnClose
                width={1600}
                style={{ top: 20, bottom: 20 }}
                bodyStyle={{ height: 'calc(100vh - 80px)', padding: '24px' }}
            >
                <BlogForm initialValues={editingBlog || undefined} onSubmit={handleFormSubmit} />
            </Modal>
        </Card>
    );
};

export default BlogManagement; 