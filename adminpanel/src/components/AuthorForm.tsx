import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Avatar } from 'antd';
import { UploadOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { cloudinaryService } from '../services/cloudinaryService';
import type { BlogAuthor, CreateAuthorData } from '../services/blogTypes';
import type { UploadFile } from 'antd/es/upload/interface';

interface AuthorFormProps {
    initialValues?: BlogAuthor;
    onSubmit: (values: CreateAuthorData) => void;
    onCancel: () => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ initialValues, onSubmit, onCancel }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            // Set fileList if there's an existing avatar
            if (initialValues.avatar) {
                setFileList([{
                    uid: '-1',
                    name: 'avatar',
                    status: 'done',
                    url: initialValues.avatar,
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
                form.setFieldValue('avatar', file.response.data.url);
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
            setUploading(true);
            const response = await cloudinaryService.uploadImage(file);

            if (response.success) {
                file.status = 'done';
                file.response = { data: response.data };
                file.url = response.data.url;

                // Update the form field immediately
                form.setFieldValue('avatar', response.data.url);

                onSuccess({ data: response.data }, file);
            } else {
                onError(new Error('Upload failed'));
            }
        } catch (error) {
            onError(error);
        } finally {
            setUploading(false);
        }
    };

    const handleFinish = (values: CreateAuthorData) => {
        // Ensure the avatar URL is included
        if (fileList.length > 0 && fileList[0]?.url) {
            values.avatar = fileList[0].url;
        }

        onSubmit(values);
    };

    const uploadButton = (
        <div className="flex flex-col items-center justify-center p-4">
            {uploading ? <LoadingOutlined className="text-2xl text-blue-500" /> : <UploadOutlined className="text-2xl text-gray-400" />}
            <div className="mt-2 text-sm text-gray-500">
                {uploading ? 'Uploading...' : 'Upload Avatar'}
            </div>
        </div>
    );

    // Get current avatar URL for preview
    const currentAvatarUrl = fileList.length > 0 ? fileList[0]?.url : form.getFieldValue('avatar');

    return (
        <div className="author-form">
            <div className="mb-6 text-center">
                <Avatar 
                    size={80} 
                    src={currentAvatarUrl} 
                    icon={<UserOutlined />}
                    className="mb-2"
                />
                <div className="text-sm text-gray-500">Author Avatar Preview</div>
            </div>

            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter author name' }]}>
                    <Input size="large" placeholder="Enter author name" />
                </Form.Item>

                <Form.Item 
                    name="email" 
                    label="Email" 
                    rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                >
                    <Input size="large" placeholder="Enter email address" />
                </Form.Item>

                <Form.Item name="bio" label="Bio">
                    <Input.TextArea 
                        rows={3} 
                        placeholder="Enter author bio (optional)"
                        maxLength={500}
                        showCount
                    />
                </Form.Item>

                <Form.Item name="avatar" label="Avatar Image">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleImageUpload}
                        customRequest={customUpload}
                        accept="image/*"
                        maxCount={1}
                        className="avatar-upload"
                        onRemove={() => {
                            setFileList([]);
                            form.setFieldValue('avatar', undefined);
                            return true;
                        }}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <div className="text-xs text-gray-500 mt-2">
                        Upload a profile picture for the author. Recommended size: 200x200px
                    </div>
                </Form.Item>

                <div className="flex justify-end space-x-3 mt-6">
                    <Button onClick={onCancel} size="large">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" size="large" loading={uploading}>
                        {initialValues ? 'Update Author' : 'Create Author'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AuthorForm;
