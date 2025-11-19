import axios from 'axios';
import config from '../../config.js';

const API = `${config.api.baseUrl}/blogs`;

const blogService = {
    getBlogs: async () => (await axios.get(API)).data,
    getBlog: async (id) => (await axios.get(`${API}/${id}`)).data,
    createBlog: async (data) => (await axios.post(API, data)).data,
    updateBlog: async (id, data) => (await axios.put(`${API}/${id}`, data)).data,
    deleteBlog: async (id) => (await axios.delete(`${API}/${id}`)).data,

    getAuthors: async () => (await axios.get(`${API}/authors`)).data,
    createAuthor: async (data) => (await axios.post(`${API}/authors`, data)).data,
    updateAuthor: async (id, data) => (await axios.put(`${API}/authors/${id}`, data)).data,
    deleteAuthor: async (id) => (await axios.delete(`${API}/authors/${id}`)).data,
};

export default blogService; 