import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import blogService from '../../../services/blogService';

const BlogSection = () => {
    const navigate = useNavigate();
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const blogs = await blogService.getBlogs();
                // Filter only published blogs and take the latest 3
                const publishedBlogs = blogs
                    .filter(blog => blog.status === 'published')
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3);
                setBlogPosts(publishedBlogs);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                // Fallback to empty array if API fails
                setBlogPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
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

    return (
        <section className="py-20 bg-[#F4EBD0]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    {/* <h2 className="text-4xl font-bold text-[#122620] mb-4">Latest Insights</h2>
                    <p className="text-lg text-[#122620]/80 max-w-2xl mx-auto">
                        Stay informed with our expert analysis and insights on real estate trends, investment strategies, and market updates.
                    </p> */}
                    <h2 className="text-6xl font-bold mb-4 text-[#122620] font-source-serif">Latest Insights</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                            <p className="text-gray-500">Stay informed with our expert analysis</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#122620] mx-auto"></div>
                        <p className="mt-4 text-[#122620]">Loading latest insights...</p>
                    </div>
                ) : blogPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-[#122620]/60 text-lg">No blog posts available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                                onClick={() => handleBlogClick(post.id)}
                            >
                                <div className="relative h-48">
                                    <img
                                        src={post.featuredImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-sm text-[#122620]/60">{formatDate(post.createdAt)}</span>
                                    <h3 className="text-xl font-semibold text-[#122620] mt-2 mb-3">
                                        {post.title}
                                    </h3>
                                    <p className="text-[#122620]/80 mb-4">
                                        {post.excerpt || post.content.substring(0, 100) + '...'}
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
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        to="/blogs"
                        className="inline-block bg-transparent border-2 border-[#122620] text-[#122620] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase"
                    >
                        View All Articles
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;