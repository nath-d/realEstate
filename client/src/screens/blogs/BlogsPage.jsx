import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';

const BlogsPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        'all',
        'market trends',
        'investment',
        'design',
        'sustainability',
        'technology'
    ];

    const blogPosts = [
        {
            id: 1,
            title: "The Future of Real Estate: Smart Homes and Sustainability",
            excerpt: "Discover how smart technology and sustainable practices are shaping the future of real estate. From energy-efficient designs to automated home systems, learn how these innovations are transforming the way we live and invest in properties.",
            image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            date: "March 15, 2024",
            category: "technology",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Investment Strategies for Real Estate in 2024",
            excerpt: "Learn about the most promising real estate investment opportunities and market trends. Our experts analyze current market conditions and provide insights into emerging opportunities for both residential and commercial properties.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
            date: "March 10, 2024",
            category: "investment",
            readTime: "7 min read"
        },
        {
            id: 3,
            title: "Luxury Living: Design Trends for Modern Homes",
            excerpt: "Explore the latest interior design trends that are transforming luxury homes. From minimalist aesthetics to sustainable materials, discover how modern design is redefining luxury living spaces.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
            date: "March 5, 2024",
            category: "design",
            readTime: "4 min read"
        },
        {
            id: 4,
            title: "Sustainable Real Estate: Building for the Future",
            excerpt: "How sustainable practices are becoming the new standard in real estate development. Learn about green building certifications, eco-friendly materials, and energy-efficient designs.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            date: "March 1, 2024",
            category: "sustainability",
            readTime: "6 min read"
        }
    ];

    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const handleBlogClick = (postId) => {
        navigate(`/blogs/${postId}`);
    };

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

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full transition-colors ${selectedCategory === category
                                ? 'bg-[#122620] text-white'
                                : 'bg-white text-[#122620] hover:bg-[#122620]/10'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
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
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-[#122620] text-white px-3 py-1 rounded-full text-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm text-[#122620]/60">{post.date}</span>
                                    <span className="text-sm text-[#122620]/60">{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-[#122620] mb-3">
                                    {post.title}
                                </h3>
                                <p className="text-[#122620]/80 mb-4 line-clamp-3">
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
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {/* <div className="flex justify-center mt-12 gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white text-[#122620] hover:bg-[#122620]/10">
                        Previous
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-[#122620] text-white">
                        1
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white text-[#122620] hover:bg-[#122620]/10">
                        2
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white text-[#122620] hover:bg-[#122620]/10">
                        3
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white text-[#122620] hover:bg-[#122620]/10">
                        Next
                    </button>
                </div> */}
            </div>
            <Footer />
        </div>
    );
};

export default BlogsPage; 