import axios from 'axios';
import type { BlogAuthor, Blog, CreateBlogData, CreateAuthorData } from './blogTypes';

const API_BASE_URL = 'http://localhost:3000/blogs';

// Service functions
export const getBlogs = async (): Promise<Blog[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const getBlog = async (id: number): Promise<Blog> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createBlog = async (data: CreateBlogData): Promise<Blog> => {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
};

export const updateBlog = async (id: number, data: Partial<CreateBlogData>): Promise<Blog> => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
};

export const deleteBlog = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

// Author CRUD
export const getAuthors = async (): Promise<BlogAuthor[]> => {
    const response = await axios.get(`${API_BASE_URL}/authors`);
    return response.data;
};

export const createAuthor = async (data: CreateAuthorData): Promise<BlogAuthor> => {
    const response = await axios.post(`${API_BASE_URL}/authors`, data);
    return response.data;
};

export const updateAuthor = async (id: number, data: Partial<CreateAuthorData>): Promise<BlogAuthor> => {
    const response = await axios.put(`${API_BASE_URL}/authors/${id}`, data);
    return response.data;
};

export const deleteAuthor = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/authors/${id}`);
};

// Blog Stats
export const getStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
};

// Default export with all functions
const blogService = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getStats
};

export default blogService; 