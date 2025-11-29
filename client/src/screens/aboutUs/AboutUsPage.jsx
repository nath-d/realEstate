import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUsers, FaHandshake, FaChartLine, FaLinkedin, FaTwitter, FaBuilding, FaAward, FaHeart, FaLightbulb } from 'react-icons/fa';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';
import aboutUsService from '../../services/aboutUsService';
import './styles/fonts.css';

const AboutUsPage = () => {
    const [aboutUsData, setAboutUsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Icon mapping for dynamic icons
    const iconMap = {
        'FaHome': <FaHome className="text-4xl" />,
        'FaUsers': <FaUsers className="text-4xl" />,
        'FaHandshake': <FaHandshake className="text-4xl" />,
        'FaChartLine': <FaChartLine className="text-4xl" />,
        'FaBuilding': <FaBuilding className="text-4xl" />,
        'FaAward': <FaAward className="text-4xl" />,
        'FaHeart': <FaHeart className="text-4xl" />,
        'FaLightbulb': <FaLightbulb className="text-4xl" />
    };

    // Default fallback data
    const defaultData = {
        heroTitle: "About Us",
        heroSubtitle: "Building dreams into reality, one home at a time...",
        heroBackgroundUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        storyTitle: "Our Story",
        storyParagraph1: "Founded with a vision to transform the real estate experience, we've grown from a small local agency to a trusted name in the industry. Our journey has been marked by countless success stories and satisfied clients who have found their perfect homes through our services.",
        storyParagraph2: "Today, we continue to innovate and evolve, bringing cutting-edge technology and personalized service to every client interaction. Our commitment to excellence remains unwavering as we help people find their dream properties and make informed real estate decisions.",
        valuesTitle: "Our Values",
        valuesSubtitle: "The principles that guide our work",
        teamTitle: "Our Team",
        teamDescription: "Meet the dedicated professionals who make it all possible. Our team combines years of experience with a passion for real estate to deliver exceptional results.",
        ctaTitle: "Ready to Start Your Journey?",
        ctaDescription: "Let us help you find your dream property or sell your current home. Our team is here to guide you every step of the way.",
        ctaButtonText: "Contact Us Today",
        ctaButtonLink: "/contact",
        values: [
            {
                icon: "FaHome",
                title: "Excellence in Service",
                description: "We are committed to providing exceptional service to our clients, ensuring their real estate journey is smooth and successful."
            },
            {
                icon: "FaUsers",
                title: "Client-Centric Approach",
                description: "Our clients are at the heart of everything we do. We listen, understand, and deliver solutions tailored to their unique needs."
            },
            {
                icon: "FaHandshake",
                title: "Integrity & Trust",
                description: "We conduct our business with the highest standards of integrity, building lasting relationships based on trust and transparency."
            },
            {
                icon: "FaChartLine",
                title: "Market Expertise",
                description: "With years of experience and deep market knowledge, we provide valuable insights to help clients make informed decisions."
            }
        ],
        teamMembers: [
            {
                name: "John Smith",
                role: "Founder & CEO",
                imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "With over 20 years of experience in real estate, John leads our company with vision and expertise.",
                linkedinUrl: "#",
                twitterUrl: "#"
            },
            {
                name: "Sarah Johnson",
                role: "Head of Sales",
                imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Sarah's dedication to client satisfaction has made her one of the most successful agents in the region.",
                linkedinUrl: "#",
                twitterUrl: "#"
            },
            {
                name: "Michael Chen",
                role: "Property Specialist",
                imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Michael's deep market knowledge and attention to detail ensure our clients find their perfect property.",
                linkedinUrl: "#",
                twitterUrl: "#"
            }
        ]
    };

    useEffect(() => {
        const fetchAboutUsData = async () => {
            try {
                setLoading(true);
                const data = await aboutUsService.getAboutUsInfo();
                setAboutUsData(data);
            } catch (err) {
                console.error('Error fetching about us data:', err);
                setError(err);
                // Use default data if API fails
                setAboutUsData(defaultData);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutUsData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4EBD0] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#122620]"></div>
                    <p className="mt-4 text-[#122620]">Loading...</p>
                </div>
            </div>
        );
    }

    const data = aboutUsData || defaultData;

    return (
        <div className="min-h-screen bg-[#F4EBD0]">
            <Navbar />
            {/* Hero Section */}
            <section className="relative h-[70vh] bg-[#122620] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${data.heroBackgroundUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}')`,
                        filter: "brightness(0.3)"
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
                <div className="container mx-auto px-4 h-full flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center relative z-10"
                    >
                        <h1 className="heading-primary text-6xl font-bold text-white mb-6">
                            {data.heroTitle}
                        </h1>
                        <p className="accent-text text-2xl text-[#D6AD60] max-w-2xl mx-auto">
                            {data.heroSubtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="heading-primary text-4xl font-bold text-[#122620] mb-8">
                            {data.storyTitle}
                        </h2>
                        {data.storyParagraph1 && (
                            <p className="body-text text-lg text-[#122620]/80 leading-relaxed mb-8">
                                {data.storyParagraph1}
                            </p>
                        )}
                        {data.storyParagraph2 && (
                            <p className="body-text text-lg text-[#122620]/80 leading-relaxed">
                                {data.storyParagraph2}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-20 bg-[#122620]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="heading-primary text-4xl font-bold text-white mb-4">
                            {data.valuesTitle}
                        </h2>
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                            <p className="text-[#D6AD60]">{data.valuesSubtitle}</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.values.map((value, index) => (
                            <motion.div
                                key={value.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#1A332C] p-8 rounded-xl border border-[#D6AD60]/20 hover:border-[#D6AD60]/40 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-[#D6AD60]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D6AD60] group-hover:text-[#122620] transition-all duration-300">
                                    {iconMap[value.icon] || iconMap['FaHome']}
                                </div>
                                <h3 className="text-xl font-bold text-[#D6AD60] mb-4">{value.title}</h3>
                                <p className="text-gray-300">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="heading-primary text-4xl font-bold text-[#122620] mb-4">
                            {data.teamTitle}
                        </h2>
                        {data.teamDescription && (
                            <p className="text-[#122620]/80 max-w-2xl mx-auto">
                                {data.teamDescription}
                            </p>
                        )}
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="flex gap-4">
                                            {member.linkedinUrl && (
                                                <a href={member.linkedinUrl} className="text-white hover:text-[#D6AD60] transition-colors">
                                                    <FaLinkedin className="text-2xl" />
                                                </a>
                                            )}
                                            {member.twitterUrl && (
                                                <a href={member.twitterUrl} className="text-white hover:text-[#D6AD60] transition-colors">
                                                    <FaTwitter className="text-2xl" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#122620] mb-2">{member.name}</h3>
                                    <p className="text-[#D6AD60] mb-4">{member.role}</p>
                                    <p className="text-[#122620]/70">{member.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-[#122620]">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-primary text-4xl font-bold text-white mb-6">
                            {data.ctaTitle}
                        </h2>
                        {data.ctaDescription && (
                            <p className="text-[#D6AD60] mb-8 max-w-2xl mx-auto">
                                {data.ctaDescription}
                            </p>
                        )}
                        <motion.a
                            href={data.ctaButtonLink}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block bg-[#D6AD60] text-[#122620] font-bold px-8 py-4 rounded-lg hover:bg-[#E5BE90] transition-all duration-300"
                        >
                            {data.ctaButtonText}
                        </motion.a>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutUsPage;
