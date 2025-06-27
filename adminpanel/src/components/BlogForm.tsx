import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { getAuthors } from '../services/blogService';
import { getCategories } from '../services/blogService';
import { cloudinaryService } from '../services/cloudinaryService';
import type { BlogAuthor, CreateBlogData } from '../services/blogTypes';
import type { UploadFile } from 'antd/es/upload/interface';

const { Option } = Select;

interface BlogFormProps {
    initialValues?: Partial<CreateBlogData>;
    onSubmit: (values: CreateBlogData) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialValues, onSubmit }) => {
    const [form] = Form.useForm();
    const [authors, setAuthors] = React.useState<BlogAuthor[]>([]);
    const [categories, setCategories] = React.useState<any[]>([]);
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [uploading, setUploading] = React.useState(false);

    useEffect(() => {
        getAuthors().then(setAuthors);
        getCategories().then(setCategories);
    }, []);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            // Set fileList if there's an existing featured image
            if (initialValues.featuredImage) {
                setFileList([{
                    uid: '-1',
                    name: 'featured-image',
                    status: 'done',
                    url: initialValues.featuredImage,
                }]);
            } else {
                setFileList([]);
            }
        } else {
            form.resetFields();
            setFileList([]);
        }
    }, [initialValues, form]);

    const handleImageUpload = async (info: any) => {
        console.log('handleImageUpload called:', info);
        const { fileList: newFileList, file } = info;

        if (file.status === 'uploading') {
            setUploading(true);
            setFileList(newFileList);
            return;
        }

        if (file.status === 'done') {
            setUploading(false);
            message.success(`${file.name} uploaded successfully`);

            if (file.response && file.response.data && file.response.data.url) {
                file.url = file.response.data.url;
                // Update the form field with the uploaded image URL
                form.setFieldValue('featuredImage', file.response.data.url);
                console.log('Image URL set in form:', file.response.data.url);
            }
            setFileList(newFileList);
        }

        if (file.status === 'error') {
            setUploading(false);
            message.error(`${file.name} upload failed`);
            setFileList(newFileList);
            return;
        }

        // Always update fileList to maintain state
        setFileList(newFileList);
    };

    const customUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;

        try {
            console.log('Starting upload for file:', file.name);
            setUploading(true);
            const response = await cloudinaryService.uploadImage(file);

            console.log('Upload response:', response);

            if (response.success) {
                file.status = 'done';
                file.response = { data: response.data };
                file.url = response.data.url;

                // Update the form field immediately
                form.setFieldValue('featuredImage', response.data.url);
                console.log('Image URL set in form during upload:', response.data.url);

                onSuccess({ data: response.data }, file);
            } else {
                console.error('Upload failed - no success response');
                onError(new Error('Upload failed'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            onError(error);
        } finally {
            setUploading(false);
        }
    };

    const handleFinish = (values: CreateBlogData) => {
        console.log('Form submitted with values:', values);
        console.log('Current fileList:', fileList);

        // Ensure the featured image URL is included
        if (fileList.length > 0 && fileList[0]?.url) {
            values.featuredImage = fileList[0].url;
        }

        console.log('Final values to submit:', values);
        onSubmit(values);
    };

    const uploadButton = (
        <div className="flex flex-col items-center justify-center p-4">
            {uploading ? <LoadingOutlined className="text-2xl text-blue-500" /> : <UploadOutlined className="text-2xl text-gray-400" />}
            <div className="mt-2 text-sm text-gray-500">
                {uploading ? 'Uploading...' : 'Upload Featured Image'}
            </div>
        </div>
    );

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="content" label="Content" rules={[{ required: true }]}>
                <Input.TextArea rows={6} />
            </Form.Item>
            <Form.Item name="excerpt" label="Excerpt">
                <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="featuredImage" label="Featured Image">
                <Upload
                    name="featuredImage"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleImageUpload}
                    customRequest={customUpload}
                    accept="image/*"
                    maxCount={1}
                    className="featured-image-upload"
                    onRemove={() => {
                        setFileList([]);
                        form.setFieldValue('featuredImage', undefined);
                        return true;
                    }}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                <Select>
                    <Option value="draft">Draft</Option>
                    <Option value="published">Published</Option>
                </Select>
            </Form.Item>
            <Form.Item name="categoryId" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
                <Select placeholder="Select category" loading={categories.length === 0}>
                    {categories.map((cat: any) => (
                        <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="authorId" label="Author" rules={[{ required: true }]}>
                <Select>
                    {authors.map(a => <Option key={a.id} value={a.id}>{a.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item name="tags" label="Tags">
                <Select mode="tags" />
            </Form.Item>
            <Form.Item name="metaTitle" label="Meta Title">
                <Input />
            </Form.Item>
            <Form.Item name="metaDescription" label="Meta Description">
                <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
        </Form>
    );
};

export default BlogForm; 