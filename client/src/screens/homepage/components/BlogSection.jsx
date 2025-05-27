import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const BlogSection = () => {
    const navigate = useNavigate();
    const blogPosts = [
        {
            id: 1,
            title: "The Future of Real Estate: Smart Homes and Sustainability",
            excerpt: "Discover how smart technology and sustainable practices are shaping the future of real estate...",
            image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            date: "March 15, 2024"
        },
        {
            id: 2,
            title: "Investment Strategies for Real Estate in 2024",
            excerpt: "Learn about the most promising real estate investment opportunities and market trends...",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
            date: "March 10, 2024"
        },
        {
            id: 3,
            title: "Luxury Living: Design Trends for Modern Homes",
            excerpt: "Explore the latest interior design trends that are transforming luxury homes...",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
            date: "March 5, 2024"
        }
    ];

    const handleBlogClick = (postId) => {
        navigate(`/blogs/${postId}`);
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => handleBlogClick(post.id)}
                        >
                            <div className="relative h-48">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#122620]/60">{post.date}</span>
                                <h3 className="text-xl font-semibold text-[#122620] mt-2 mb-3">
                                    {post.title}
                                </h3>
                                <p className="text-[#122620]/80 mb-4">
                                    {post.excerpt}
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