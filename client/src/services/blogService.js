import axios from 'axios';

const API = 'http://localhost:3000/blogs';

const blogService = {
    getBlogs: async () => (await axios.get(API)).data,
    getBlog: async (id) => (await axios.get(`${API}/${id}`)).data,
    createBlog: async (data) => (await axios.post(API, data)).data,
    updateBlog: async (id, data) => (await axios.put(`${API}/${id}`, data)).data,
    deleteBlog: async (id) => (await axios.delete(`${API}/${id}`)).data,

    getCategories: async () => (await axios.get(`${API}/categories`)).data,
    createCategory: async (data) => (await axios.post(`${API}/categories`, data)).data,
    updateCategory: async (id, data) => (await axios.put(`${API}/categories/${id}`, data)).data,
    deleteCategory: async (id) => (await axios.delete(`${API}/categories/${id}`)).data,

    getAuthors: async () => (await axios.get(`${API}/authors`)).data,
    createAuthor: async (data) => (await axios.post(`${API}/authors`, data)).data,
    updateAuthor: async (id, data) => (await axios.put(`${API}/authors/${id}`, data)).data,
    deleteAuthor: async (id) => (await axios.delete(`${API}/authors/${id}`)).data,
};

export default blogService; 