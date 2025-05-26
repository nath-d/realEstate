import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUsers, FaHandshake, FaChartLine, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';
import './styles/fonts.css';

const AboutUsPage = () => {
    const values = [
        {
            icon: <FaHome className="text-4xl" />,
            title: "Excellence in Service",
            description: "We are committed to providing exceptional service to our clients, ensuring their real estate journey is smooth and successful."
        },
        {
            icon: <FaUsers className="text-4xl" />,
            title: "Client-Centric Approach",
            description: "Our clients are at the heart of everything we do. We listen, understand, and deliver solutions tailored to their unique needs."
        },
        {
            icon: <FaHandshake className="text-4xl" />,
            title: "Integrity & Trust",
            description: "We conduct our business with the highest standards of integrity, building lasting relationships based on trust and transparency."
        },
        {
            icon: <FaChartLine className="text-4xl" />,
            title: "Market Expertise",
            description: "With years of experience and deep market knowledge, we provide valuable insights to help clients make informed decisions."
        }
    ];

    const teamMembers = [
        {
            name: "John Smith",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "With over 20 years of experience in real estate, John leads our company with vision and expertise.",
            linkedin: "#",
            twitter: "#"
        },
        {
            name: "Sarah Johnson",
            role: "Head of Sales",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Sarah's dedication to client satisfaction has made her one of the most successful agents in the region.",
            linkedin: "#",
            twitter: "#"
        },
        {
            name: "Michael Chen",
            role: "Property Specialist",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Michael's deep market knowledge and attention to detail ensure our clients find their perfect property.",
            linkedin: "#",
            twitter: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F4EBD0]">
            <Navbar />
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-[#122620] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
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
                            About Us
                        </h1>
                        <p className="accent-text text-2xl text-[#D6AD60] max-w-2xl mx-auto">
                            Building dreams into reality, one home at a time...
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
                            Our Story
                        </h2>
                        <p className="body-text text-lg text-[#122620]/80 leading-relaxed mb-8">
                            Founded with a vision to transform the real estate experience, we've grown from a small local agency to a trusted name in the industry. Our journey has been marked by countless success stories and satisfied clients who have found their perfect homes through our services.
                        </p>
                        <p className="body-text text-lg text-[#122620]/80 leading-relaxed">
                            Today, we continue to innovate and evolve, bringing cutting-edge technology and personalized service to every client interaction. Our commitment to excellence remains unwavering as we help people find their dream properties and make informed real estate decisions.
                        </p>
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
                            Our Values
                        </h2>
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                            <p className="text-[#D6AD60]">The principles that guide our work</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#1A332C] p-8 rounded-xl border border-[#D6AD60]/20 hover:border-[#D6AD60]/40 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-[#D6AD60]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D6AD60] group-hover:text-[#122620] transition-all duration-300">
                                    {value.icon}
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
                            Our Team
                        </h2>
                        <p className="text-[#122620]/80 max-w-2xl mx-auto">
                            Meet the dedicated professionals who make it all possible. Our team combines years of experience with a passion for real estate to deliver exceptional results.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="flex gap-4">
                                            <a href={member.linkedin} className="text-white hover:text-[#D6AD60] transition-colors">
                                                <FaLinkedin className="text-2xl" />
                                            </a>
                                            <a href={member.twitter} className="text-white hover:text-[#D6AD60] transition-colors">
                                                <FaTwitter className="text-2xl" />
                                            </a>
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
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-[#D6AD60] mb-8 max-w-2xl mx-auto">
                            Let us help you find your dream property or sell your current home. Our team is here to guide you every step of the way.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#D6AD60] text-[#122620] font-bold px-8 py-4 rounded-lg hover:bg-[#E5BE90] transition-all duration-300"
                        >
                            Contact Us Today
                        </motion.button>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutUsPage;
