import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';
import blogService from '../../services/blogService';

const BlogsPage = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const blogsData = await blogService.getBlogs();

                // Filter only published blogs
                const publishedBlogs = blogsData.filter(blog => blog.status === 'published');
                setBlogs(publishedBlogs);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to load blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleBlogClick = (postId) => {
        navigate(`/blogs/${postId}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4EBD0]">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#122620] mx-auto"></div>
                        <p className="mt-4 text-[#122620]">Loading blogs...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F4EBD0]">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="text-center">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-[#122620] text-white rounded-lg hover:bg-[#122620]/80"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4EBD0]">
            <Navbar />
            <div className="container mx-auto px-4 py-20">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">Our Blogs</h1>
                    <div className="flex justify-center items-center gap-4">
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#D6AD60]"
                        ></motion.span>
                        <p className="text-gray-500">Insights and analysis from our experts</p>
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            transition={{ duration: 0.8 }}
                            className="h-0.5 bg-[#D6AD60]"
                        ></motion.span>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-[#122620]/60 text-lg">No blogs found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
                                onClick={() => handleBlogClick(post.id)}
                            >
                                <div className="relative h-64">
                                    <img
                                        src={post.featuredImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm text-[#122620]/60">{formatDate(post.createdAt)}</span>
                                        <span className="text-sm text-[#122620]/60">By {post.author?.name || 'Unknown'}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#122620] mb-3">
                                        {post.title}
                                    </h3>
                                    <p className="text-[#122620]/80 mb-4 line-clamp-3">
                                        {post.excerpt || post.content.substring(0, 150) + '...'}
                                    </p>
                                    <button
                                        className="text-[#122620] font-medium hover:text-[#122620]/80 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBlogClick(post.id);
                                        }}
                                    >
                                        Read More →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default BlogsPage; 