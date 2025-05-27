import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // This would typically come from an API or database
    const blogPost = {
        id: 1,
        title: "The Future of Real Estate: Smart Homes and Sustainability",
        content: `
            <p>The real estate industry is undergoing a significant transformation, driven by technological innovation and a growing emphasis on sustainability. Smart homes, once considered a luxury, are becoming increasingly common in modern real estate developments.</p>

            <h2>The Rise of Smart Home Technology</h2>
            <p>Smart home technology has evolved from simple automated lighting to comprehensive home management systems. Today's smart homes can:</p>
            <ul>
                <li>Monitor and optimize energy usage</li>
                <li>Provide enhanced security through connected devices</li>
                <li>Offer remote control of home systems</li>
                <li>Integrate with voice assistants for hands-free operation</li>
            </ul>

            <h2>Sustainability in Modern Real Estate</h2>
            <p>Sustainable practices are no longer optional in real estate development. Green building certifications, such as LEED and BREEAM, have become industry standards. Key sustainable features include:</p>
            <ul>
                <li>Solar panel integration</li>
                <li>Energy-efficient appliances</li>
                <li>Smart water management systems</li>
                <li>Eco-friendly building materials</li>
            </ul>

            <h2>The Impact on Property Values</h2>
            <p>Properties with smart technology and sustainable features are commanding premium prices in the market. Studies show that homes with green certifications can sell for up to 10% more than comparable properties.</p>

            <h2>Future Trends</h2>
            <p>Looking ahead, we can expect to see:</p>
            <ul>
                <li>Greater integration of AI in home management</li>
                <li>More widespread adoption of renewable energy</li>
                <li>Advanced water conservation systems</li>
                <li>Smart community development</li>
            </ul>
        `,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        date: "March 15, 2024",
        category: "technology",
        readTime: "5 min read",
        author: {
            name: "John Smith",
            role: "Real Estate Technology Expert",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
    };

    return (
        <div className="min-h-screen bg-[#F4EBD0]">
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
                        <span className="bg-[#122620] text-white px-3 py-1 rounded-full text-sm">
                            {blogPost.category}
                        </span>
                        <span className="text-[#122620]/60">{blogPost.date}</span>
                        <span className="text-[#122620]/60">{blogPost.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#122620] mb-6 font-source-serif">
                        {blogPost.title}
                    </h1>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden"
                >
                    <img
                        src={blogPost.image}
                        alt={blogPost.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: blogPost.content }}
                        />
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
                                    src={blogPost.author.image}
                                    alt={blogPost.author.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-[#122620]">{blogPost.author.name}</h3>
                                    <p className="text-[#122620]/60 text-sm">{blogPost.author.role}</p>
                                </div>
                            </div>
                            <p className="text-[#122620]/80">
                                Expert in real estate technology and sustainable development with over 10 years of experience in the industry.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost; 