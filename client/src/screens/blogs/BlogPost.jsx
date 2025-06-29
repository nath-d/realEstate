import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';
import blogService from '../../services/blogService';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                setLoading(true);
                const data = await blogService.getBlog(parseInt(id));
                setBlogPost(data);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlogPost();
        }
    }, [id]);

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
                        <p className="mt-4 text-[#122620]">Loading blog post...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !blogPost) {
        return (
            <div className="min-h-screen bg-[#F4EBD0]">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="text-center">
                        <p className="text-red-600">{error || 'Blog post not found'}</p>
                        <button
                            onClick={() => navigate('/blogs')}
                            className="mt-4 px-4 py-2 bg-[#122620] text-white rounded-lg hover:bg-[#122620]/80"
                        >
                            Back to Blogs
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
                {/* Back Button */}
                <button
                    onClick={() => navigate('/blogs')}
                    className="flex items-center text-[#122620] hover:text-[#122620]/80 transition-colors mb-8"
                >
                    ← Back to Blogs
                </button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-[#122620]/60">{formatDate(blogPost.createdAt)}</span>
                        <span className="text-[#122620]/60">By {blogPost.author?.name || 'Unknown'}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#122620] mb-6 font-source-serif">
                        {blogPost.title}
                    </h1>
                    {blogPost.excerpt && (
                        <p className="text-xl text-[#122620]/80 leading-relaxed">
                            {blogPost.excerpt}
                        </p>
                    )}
                </motion.div>

                {/* Featured Image */}
                {blogPost.featuredImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden"
                    >
                        <img
                            src={blogPost.featuredImage}
                            alt={blogPost.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-lg p-8 shadow-lg">
                            <div
                                className="prose prose-lg max-w-none text-[#122620]"
                                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                            />
                        </div>
                    </motion.div>

                    {/* Author Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={blogPost.author?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
                                    alt={blogPost.author?.name || 'Author'}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-[#122620]">{blogPost.author?.name || 'Unknown Author'}</h3>
                                    <p className="text-[#122620]/60 text-sm">Real Estate Expert</p>
                                </div>
                            </div>
                            <p className="text-[#122620]/80">
                                {blogPost.author?.bio || 'Expert in real estate with years of experience in the industry.'}
                            </p>
                        </div>

                        {/* Tags */}
                        {blogPost.tags && blogPost.tags.length > 0 && (
                            <div className="bg-white rounded-lg p-6 shadow-lg mt-6">
                                <h4 className="font-semibold text-[#122620] mb-3">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {blogPost.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-[#122620]/10 text-[#122620] px-3 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogPost; 